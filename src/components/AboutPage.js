import React from 'react';

/**
 * Componente para a tela "Sobre".
 * Não possui header nem menu lateral.
 */
function AboutPage({ navegarPara }) {
    return (
        <div className="full-page-screen about-page">
            <h1 className="about-title">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Sobre
            </h1>
            
            <div className="about-timeline">
                <div className="timeline-item item-objetivo">
                    <div className="timeline-circle"></div>
                    <div className="timeline-content">Nosso Objetivo</div>
                </div>
                <div className="timeline-item item-devs">
                    <div className="timeline-circle"></div>
                    <div className="timeline-content">Desenvolvedores</div>
                </div>
                <div className="timeline-item item-tech">
                    <div className="timeline-circle"></div>
                    <div className="timeline-content">Tecnologias</div>
                </div>
                <div className="timeline-item item-agradecimentos">
                    <div className="timeline-circle"></div>
                    <div className="timeline-content">Agradecimentos</div>
                </div>
                <div className="timeline-item item-contato">
                    <div className="timeline-circle"></div>
                    <div className="timeline-content">Contato e Feedback</div>
                </div>
            </div>

            <button className="back-button" onClick={() => navegarPara('home')}>
                Voltar
            </button>
        </div>
    );
}

export default AboutPage;
