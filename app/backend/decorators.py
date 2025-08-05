import logging
from functools import wraps
from typing import Any, Callable, TypeVar, cast

from quart import abort, current_app, request, Response

from config import CONFIG_AUTH_CLIENT, CONFIG_SEARCH_CLIENT
from core.authentication import AuthError
from error import error_response


def authenticated_path(route_fn: Callable[[str, dict[str, Any]], Any]):
    """
    Decorator for routes that request a specific file that might require access control enforcement
    """

    @wraps(route_fn)
    async def auth_handler(path=""):
        # If authentication is enabled, validate the user can access the file
        auth_helper = current_app.config[CONFIG_AUTH_CLIENT]
        search_client = current_app.config[CONFIG_SEARCH_CLIENT]
        authorized = False
        try:
            auth_claims = await auth_helper.get_auth_claims_if_enabled(request)
            authorized = await auth_helper.check_path_auth(path, auth_claims, search_client)
        except AuthError:
            abort(403)
        except Exception as error:
            logging.exception("Problem checking path auth %s", error)
            return error_response(error, route="/content")

        if not authorized:
            abort(403)

        return await route_fn(path, auth_claims)

    return auth_handler


_C = TypeVar("_C", bound=Callable[..., Any])


def authenticated(route_fn: _C) -> _C:
    """
    Decorator for routes that might require access control. Unpacks Authorization header information into an auth_claims dictionary
    """

    @wraps(route_fn)
    async def auth_handler(*args, **kwargs):
        auth_helper = current_app.config[CONFIG_AUTH_CLIENT]
        try:
            auth_claims, response = await auth_helper.get_auth_claims_if_enabled(request)
        except AuthError:
            abort(403)

        # Forward both the auth_claims and the response (which contains the set-cookie header)
        # Call the original route function
        route_response = await route_fn(auth_claims, *args, **kwargs)

        # Add the set-cookie header from the auth_response to the final response
        if isinstance(route_response, Response):
            for cookie in response.headers.getlist('Set-Cookie'):
                route_response.headers.add('Set-Cookie', cookie)

        return route_response

    return cast(_C, auth_handler)
