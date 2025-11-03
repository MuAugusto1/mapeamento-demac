import React from 'react';

/**
 * Componente de rodapé reutilizável.
 * Exibe informações sobre os desenvolvedores.
 */
function Footer() {
    return (
        <footer className="footer">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L23.5113 6.90983L30.9017 10.3647L30.9017 18.0902L37.0623 23.0902L34.1309 30.3647L27.0623 33.0902L23.5113 39.0902L16.4887 39.0902L12.9377 33.0902L5.86909 30.3647L2.93774 23.0902L9.09834 18.0902L9.09834 10.3647L16.4887 6.90983L20 0Z" fill="#1DADEE"/>
                <path d="M20 12L21.7321 15L25.1962 16.5L25.1962 20.5L28.1962 23.5L26.7962 26.5L23.1962 27.5L21.7321 30L18.2679 30L16.8038 27.5L13.2038 26.5L11.8038 23.5L14.8038 20.5L14.8038 16.5L18.2679 15L20 12Z" fill="black"/>
            </svg>
            <span>
                Desenvolvido por Jordan Moura, Luiz Henrique, Murilo Augusto e Rafael Teixeira
            </span>
        </footer>
    );
}

export default Footer;
