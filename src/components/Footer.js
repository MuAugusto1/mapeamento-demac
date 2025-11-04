import React from 'react';
import './Footer.css'

/**
 * Componente de rodapé reutilizável.
 * Exibe informações sobre os desenvolvedores.
 */
function Footer() {
    return (
        <footer className="footer">
            <img
                src="/unesp-seeklogo.png"
                alt="Logo Unesp"
                className="footer-logo"
            />
            <span
                className='footer-text'
            >
                Desenvolvido por Jordan Moura, Luiz Henrique, Murilo Augusto e Rafael Teixeira
            </span>
        </footer>
    );
}

export default Footer;
