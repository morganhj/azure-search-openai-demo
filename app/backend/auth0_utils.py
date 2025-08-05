import os
import aiohttp

# Utility function to update Auth0 user app_metadata
async def update_auth0_user_app_metadata(user_id, mgmt_token, app_metadata: dict):
    auth0_domain = os.getenv("AUTH0_DOMAIN")
    user_url = f"https://{auth0_domain}/api/v2/users/{user_id}"
    headers = {
        "Authorization": f"Bearer {mgmt_token}",
        "Content-Type": "application/json"
    }
    payload = {"app_metadata": app_metadata}
    async with aiohttp.ClientSession() as session:
        async with session.patch(user_url, headers=headers, json=payload) as resp:
            if resp.status not in [200, 204]:
                return None, {"error": "Failed to update Auth0 user app_metadata", "status": resp.status}, 502
            result = await resp.json()
    return result, None, None

# Utility function to fetch Auth0 user information
async def get_auth0_user(user_id, mgmt_token):
    auth0_domain = os.getenv("AUTH0_DOMAIN")
    user_url = f"https://{auth0_domain}/api/v2/users/{user_id}"
    headers = {"Authorization": f"Bearer {mgmt_token}"}
    async with aiohttp.ClientSession() as session:
        async with session.get(user_url, headers=headers) as resp:
            if resp.status != 200:
                return None, {"error": "Failed to fetch Auth0 user", "status": resp.status}, 502
            user_info = await resp.json()
    return user_info, None, 200

# Utility function to fetch Auth0 user roles
async def get_auth0_user_roles(user_id, mgmt_token):
    auth0_domain = os.getenv("AUTH0_DOMAIN")
    user_url = f"https://{auth0_domain}/api/v2/users/{user_id}/roles"
    headers = {"Authorization": f"Bearer {mgmt_token}"}
    async with aiohttp.ClientSession() as session:
        async with session.get(user_url, headers=headers) as resp:
            if resp.status != 200:
                return None, {"error": "Failed to fetch Auth0 user", "status": resp.status}, 502
            user_info = await resp.json()
    return user_info, None, None


# Assign only the subscriber role to an Auth0 user
async def assign_subscriber_role_to_user(user_id, mgmt_token):
    auth0_domain = os.getenv("AUTH0_DOMAIN")
    role_id = os.getenv("AUTH0_SUBSCRIBER_ROLE_ID")
    user_url = f"https://{auth0_domain}/api/v2/users/{user_id}/roles"
    headers = {
        "Authorization": f"Bearer {mgmt_token}",
        "Content-Type": "application/json"
    }
    payload = {"roles": [role_id]}
    async with aiohttp.ClientSession() as session:
        async with session.post(user_url, headers=headers, json=payload) as resp:
            if resp.status not in [200, 204]:
                return None, {"error": "Failed to assign subscriber role to Auth0 user", "status": resp.status}, 502
    return {"success": True}, None, None


# Remove the subscriber role from an Auth0 user
async def remove_subscriber_role_from_user(user_id, mgmt_token):
    auth0_domain = os.getenv("AUTH0_DOMAIN")
    role_id = os.getenv("AUTH0_SUBSCRIBER_ROLE_ID")
    if not role_id:
        return None, {"error": "Missing AUTH0_SUBSCRIBER_ROLE_ID in env"}, 500
    user_url = f"https://{auth0_domain}/api/v2/users/{user_id}/roles"
    headers = {
        "Authorization": f"Bearer {mgmt_token}",
        "Content-Type": "application/json"
    }
    payload = {"roles": [role_id]}
    async with aiohttp.ClientSession() as session:
        async with session.delete(user_url, headers=headers, json=payload) as resp:
            if resp.status not in [200, 204]:
                return None, {"error": "Failed to remove subscriber role from Auth0 user", "status": resp.status}, 502
    return {"success": True}, None, None

# Add a preapproval_id to cancelled_subscriptions in app_metadata
async def add_cancelled_subscription(user_id, mgmt_token, preapproval_id):
    user_info, err, code = await get_auth0_user(user_id, mgmt_token)
    if err:
        return None, err, code
    app_metadata = user_info.get("app_metadata", {})
    cancelled = app_metadata.get("cancelled_subscriptions", [])
    if preapproval_id and preapproval_id not in cancelled:
        cancelled.append(preapproval_id)
        app_metadata["cancelled_subscriptions"] = cancelled
        updated, err, code = await update_auth0_user_app_metadata(user_id, mgmt_token, app_metadata)
        if err:
            return None, err, code
    return {"success": True}, None, None

# Utility function to fetch Auth0 Management API token
async def get_auth0_mgmt_token():
    auth0_domain = os.getenv("AUTH0_DOMAIN")
    auth0_client_id = os.getenv("AUTH0_CLIENT_ID")
    auth0_client_secret = os.getenv("AUTH0_CLIENT_SECRET")
    auth0_audience = os.getenv("AUTH0_AUDIENCE", f"https://{auth0_domain}/api/v2/")
    if not all([auth0_domain, auth0_client_id, auth0_client_secret]):
        return None, {"error": "Missing Auth0 configuration in backend config"}, 500

    token_url = f"https://{auth0_domain}/oauth/token"
    token_payload = {
        "grant_type": "client_credentials",
        "client_id": auth0_client_id,
        "client_secret": auth0_client_secret,
        "audience": auth0_audience,
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(token_url, json=token_payload) as resp:
            if resp.status != 200:
                return None, {"error": "Failed to get Auth0 token", "status": resp.status}, 502
            token_data = await resp.json()
    mgmt_token = token_data.get("access_token")
    if not mgmt_token:
        return None, {"error": "No access_token in Auth0 response"}, 502
    return mgmt_token, None, None
