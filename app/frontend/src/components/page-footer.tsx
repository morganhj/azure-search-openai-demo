import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

interface Resource {
    path: string;
    label: string;
}

export const PageFooter: React.FC = () => {
    return (
        <footer className="page-footer">
            <div className="page-footer-grid">
                <div className="page-footer-grid__info">
                    <div className="page-footer-info__message">
                        <div>
                            <p>
                                <strong>El Soldado Digital está diseñado para responder según los reglamentos del NIB.</strong> Cuanto más precisa sea tu
                                consulta, mejores respuestas recibirás.
                            </p>
                            <p>
                                Recordá que el chat se borra periódicamente. Si tenés conversaciones importantes, asegurate de exportar el texto y guardarlo
                                localmente.
                            </p>
                            <p>
                                <strong>Soldado Digital es un producto en desarrollo.</strong> Si querés que se incorporen nuevos documentos a la base de datos,
                                por favor, enviálos a <a href="mailto:copiascampodemayo@gmail.com">copiascampodemayo@gmail.com</a>.
                            </p>
                            <p>
                                Si necesitás una <strong>alocución</strong> o <strong>trabajo de gabinete</strong>, podés acceder a una versión del Soldado
                                Digital especialmente entrenado para ello escribiendo al WhatsApp <strong>1544179151</strong>. Este{" "}
                                <a href="https://api.whatsapp.com/send?phone=5491144179151">link</a> te lleva directamente.
                            </p>
                            <p>
                                Si hacés clic en la <strong>Fuente</strong>, se abrirá el PDF relevante. Este proceso puede tardar hasta un minuto; estamos
                                trabajando para hacerlo más rápido.
                            </p>
                            <p>
                                <strong>El Soldado Digital tiene más funcionalidades en la computadora que en el celular.</strong>
                            </p>
                            <p>
                                <strong>Tu opinión es importante para nosotros.</strong> Si tenés sugerencias o encontrás errores, por favor, envianos un correo
                                a <a href="mailto:copiascampodemayo@gmail.com">copiascampodemayo@gmail.com</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
