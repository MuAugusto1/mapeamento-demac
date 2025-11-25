import React from 'react';
import HelpCard from './HelpCard';
import Footer from './Footer';

/**
 * Componente para a tela "Ajuda".
 * Não possui header nem menu lateral.
 */
function HelpPage({ navegarPara }) {
    // Ícones como componentes
    const ChecklistIcon = () => (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 6h10M8 12h10M8 18h10M4.5 6l-1.5 1.5L2 6M4.5 12l-1.5 1.5L2 12M4.5 18l-1.5 1.5L2 18" />
        </svg>
    );

    const StrategyIcon = () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 9.5l4 4M14 9.5l-4 4" />
            <path d="M18.5 12.5V14a1 1 0 0 1-1 1h-1.5" />
            <path d="M16 12.5h2.5" />
            <path d="M16 15h2.5" />
            <circle cx="12" cy="12" r="10" />
        </svg>
    );

    const IdeaIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6v-2.25c0-1.242.4-2.36 1.077-3.266C17.02 11.4 17.8 10.01 17.8 8.5 17.8 5.462 15.338 3 12.3 3c-3.038 0-5.5 2.462-5.5 5.5 0 1.51.78 2.9 1.723 3.984C9.6 13.39 10 14.508 10 15.75V18zM12 21v-3" />
        </svg>
    );

    return (
        <div className="full-page-screen about-page help-page">
            <h1 className="about-title" style={{ marginLeft: '0rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Ajuda
            </h1>

            <div className="help-card-container">
                <HelpCard
                    icon={ChecklistIcon}
                    color="#1DADEE"
                    title="Como Navegar pelo Mapa"
                    text="Use o mapa interativo para localizar laboratórios, banheiros  e outros espaços do Demac.
                    Você pode aproximar e afastar o mapa usando os botões de zoom, e clicar nos marcadores para ver nome de cada local.
                    O sistema foi projetado para ser simples, rápido e fácil de usar em qualquer dispositivo."
                />
                <HelpCard
                    icon={StrategyIcon}
                    color="#9C27B0"
                    title="Pesquisa e Filtros"
                    text="A ferramenta de busca permite localizar rapidamente qualquer área do DEMAC.
                    Use os filtros para visualizar apenas categorias específicas, como banheiros, laboratórios, bebedouros ou estacionamento.
                    Isso ajuda você a encontrar exatamente o que precisa sem perder tempo navegando pelo mapa inteiro."
                />
            </div>

            <button className="back-button" onClick={() => navegarPara('home')}>
                Voltar
            </button>

            <Footer />
        </div>
    );
}

export default HelpPage;
