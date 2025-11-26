import React from 'react';
import Footer from './Footer';

/**
 * Componente da Tela Inicial (Splash Screen).
 */
function InicioPage({ aoContinuar }) {
    return (
        <div className="inicio-page-root" role="main">
            <main className="main-content" role="region" aria-label="Tela de boas-vindas">
                <h1 role="heading" aria-level="1">Protótipo Mapeamento</h1>
                <button 
                    className="continue-button" 
                    onClick={aoContinuar}
                    aria-label="Continuar para o aplicativo"
                >
                    Continuar
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: '8px' }}
                        aria-hidden="true"
                    >
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </main>
            
            <Footer />
        </div>
    );
}

export default InicioPage;
