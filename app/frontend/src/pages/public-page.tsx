import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getPublicResource } from "../services/message.service";
import { LoginButton } from "../components/buttons/login-button";
import { SignupButton } from "../components/buttons/signup-button";
import { useAuth0 } from "@auth0/auth0-react";

export function PublicPage(): JSX.Element {
    const [message, setMessage] = useState<string>("");
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const { data, error } = await getPublicResource();

            if (!isMounted) {
                return;
            }

            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }

            if (error) {
                setMessage(JSON.stringify(error, null, 2));
            }
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="content-layout">
            <h1 id="page-title" className="content__title">
                Hola! Soy Soldado Digital
            </h1>
            <div className="content__body">
                <p id="page-description">
                    <span>
                        Utilizo los reglamentos del <strong>Núcleo de Instrucción Básico (NIB)</strong> para contestar cualquier duda que tengas.
                    </span>
                    {!isAuthenticated && (
                        <>
                            <span>
                                Para poder utilizar mis servicios podés <SignupButton customClasses="button__auth-public" customLabel="Registráte" />
                            </span>
                            <span>
                                Ó si ya tenés una cuenta <LoginButton customClasses="button__auth-public" customLabel="Iniciá sesión" />
                            </span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
