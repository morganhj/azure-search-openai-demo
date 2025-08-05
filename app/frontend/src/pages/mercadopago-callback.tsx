import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const MercadoPagoCallback: React.FC = () => {
    const [status, setStatus] = useState<string>("Procesando suscripción...");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        const preapprovalId = searchParams.get("preapproval_id");
        if (!preapprovalId) {
            setStatus("Falta el parámetro preapproval_id en la URL.");
            return;
        }
        if (!isAuthenticated || !user?.sub) {
            setStatus("Debes iniciar sesión para completar la suscripción.");
            return;
        }
        const processSubscription = async () => {
            try {
                const soldigToken = import.meta.env.VITE_SOLDIG_TOKEN;
                const res = await fetch("/mercadopago/confirm-subscription", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${soldigToken}`
                    },
                    body: JSON.stringify({ preapproval_id: preapprovalId, user_id: user.sub })
                });
                const data = await res.json();
                if (res.ok) {
                    setStatus("¡Suscripción confirmada! Ya tienes acceso como suscriptor.");
                    setTimeout(() => navigate("/chat"), 3000);
                } else {
                    setStatus(data.error || "Error al confirmar la suscripción.");
                }
            } catch (e) {
                setStatus("Error de red o autenticación. Intenta de nuevo.");
            }
        };
        processSubscription();
    }, [searchParams, isAuthenticated, user, navigate]);

    return (
        <div style={{ padding: 40, textAlign: "center" }}>
            <h2>Suscripción Mercado Pago</h2>
            <p>{status}</p>
        </div>
    );
};

export default MercadoPagoCallback;
