import React, { useState } from 'react';
import Footer from './Footer';

/**
 * Componente para a tela "Sobre".
 * Não possui header nem menu lateral.
 */
function AboutPage({ navegarPara }) {
    const [selectedItem, setSelectedItem] = useState("objetivo");

    const handleTimelineClick = (item) => {
        setSelectedItem(prev => prev === item ? null : item);
    };

    const renderPanelContent = () => {
        switch (selectedItem) {
            case 'objetivo':
                return (
                    <div className="about-panel-content objetivo-panel">
                        <h2 className="about-panel-title">Nosso Objetivo</h2>
                        <p>
                            O projeto Mapeamento DEMAC tem como objetivo principal facilitar o acesso à informação geográfica do Departamento. Queremos promover integração, transparência e colaboração entre alunos, professores e visitantes, tornando o ambiente mais acessível e interativo.
                        </p>
                        <ul>
                            <li>Visualização de mapas interativos</li>
                            <li>Localização de salas, laboratórios e setores</li>
                            <li>Facilidade de navegação pelo campus</li>
                            <li>Disponibilização de informações úteis</li>
                        </ul>
                    </div>
                );
            case 'devs':
                return (
                    <div className="about-panel-content devs-panel">
                        <h2 className="about-panel-title">Desenvolvedores</h2>
                        <p>
                            Este projeto foi desenvolvido por estudantes de Ciência da Computação da UNESP de Rio Claro com foco em inovação, acessibilidade e integração acadêmica.
                        </p>
                        <ul>
                            <li>Jordan Moura</li>
                            <li>Luiz Henrique</li>
                            <li>Murilo Augusto</li>
                            <li>Rafael Teixeira</li>
                        </ul>
                    </div>
                );
            case 'tech':
                return (
                    <div className="about-panel-content tech-panel">
                        <h2 className="about-panel-title">Tecnologias</h2>
                        <p>
                            O projeto utiliza tecnologias modernas para garantir eficiência, acessibilidade e interatividade.
                        </p>
                        <ul>
                            <li>React.js</li>
                            <li>Node.js</li>
                            <li>Arcgis</li>
                        </ul>
                    </div>
                );
            case 'agradecimentos':
                return (
                    <div className="about-panel-content agradecimentos-panel">
                        <h2 className="about-panel-title">Agradecimentos</h2>
                        <p>
                            Agradecemos a Hilda, nossa mentora, que contribuiu para tornar o Mapeamento DEMAC possível.
                        </p>
                    </div>
                );
            case 'contato':
                return (
                    <div className="about-panel-content contato-panel">
                        <h2 className="about-panel-title">Contato e Feedback</h2>
                        <p>
                            Para contato e feedback, utilize o e-mail: contato@demac.unesp.br ou os canais oficiais do departamento.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="full-page-screen about-page" role="main">
            <h1 className="about-title" role="heading" aria-level="1">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Sobre
            </h1>
            <div className="about-content-wrapper" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '32px' }}>
                <div className="about-timeline" style={{ minWidth: '220px' }} role="navigation" aria-label="Navegação da página Sobre">
                    <div 
                        className={`timeline-item item-objetivo${selectedItem === 'objetivo' ? ' active' : ''}`} 
                        onClick={() => handleTimelineClick('objetivo')}
                        role="button"
                        tabIndex="0"
                        aria-pressed={selectedItem === 'objetivo'}
                        aria-label="Ver informações sobre nosso objetivo"
                        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTimelineClick('objetivo'); }}}
                    >
                        <div className="timeline-circle" aria-hidden="true"></div>
                        <div className="timeline-content">Nosso Objetivo</div>
                    </div>
                    <div 
                        className={`timeline-item item-devs${selectedItem === 'devs' ? ' active' : ''}`} 
                        onClick={() => handleTimelineClick('devs')}
                        role="button"
                        tabIndex="0"
                        aria-pressed={selectedItem === 'devs'}
                        aria-label="Ver informações sobre os desenvolvedores"
                        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTimelineClick('devs'); }}}
                    >
                        <div className="timeline-circle" aria-hidden="true"></div>
                        <div className="timeline-content">Desenvolvedores</div>
                    </div>
                    <div 
                        className={`timeline-item item-tech${selectedItem === 'tech' ? ' active' : ''}`} 
                        onClick={() => handleTimelineClick('tech')}
                        role="button"
                        tabIndex="0"
                        aria-pressed={selectedItem === 'tech'}
                        aria-label="Ver informações sobre as tecnologias utilizadas"
                        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTimelineClick('tech'); }}}
                    >
                        <div className="timeline-circle" aria-hidden="true"></div>
                        <div className="timeline-content">Tecnologias</div>
                    </div>
                    <div 
                        className={`timeline-item item-agradecimentos${selectedItem === 'agradecimentos' ? ' active' : ''}`} 
                        onClick={() => handleTimelineClick('agradecimentos')}
                        role="button"
                        tabIndex="0"
                        aria-pressed={selectedItem === 'agradecimentos'}
                        aria-label="Ver agradecimentos"
                        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTimelineClick('agradecimentos'); }}}
                    >
                        <div className="timeline-circle" aria-hidden="true"></div>
                        <div className="timeline-content">Agradecimentos</div>
                    </div>
                    <div 
                        className={`timeline-item item-contato${selectedItem === 'contato' ? ' active' : ''}`} 
                        onClick={() => handleTimelineClick('contato')}
                        role="button"
                        tabIndex="0"
                        aria-pressed={selectedItem === 'contato'}
                        aria-label="Ver informações de contato e feedback"
                        onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTimelineClick('contato'); }}}
                    >
                        <div className="timeline-circle" aria-hidden="true"></div>
                        <div className="timeline-content">Contato e Feedback</div>
                    </div>
                </div>
                <div className="about-panel" style={{ flex: 1, maxWidth: selectedItem ? '100%' : '0', opacity: selectedItem ? 1 : 0, transition: 'max-width 0.5s ease, opacity 0.5s ease' }} role="region" aria-live="polite">
                    {renderPanelContent()}
                </div>
            </div>
            <button className="back-button" onClick={() => navegarPara('home')} aria-label="Voltar para a página inicial">
                Voltar
            </button>
            <Footer />
        </div>
    );
}

export default AboutPage;
