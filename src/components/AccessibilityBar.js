import React, { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import './AccessibilityBar.css';

/**
 * Barra de Acessibilidade - Controles para melhorar a experiência do usuário
 * Recursos: Ajuste de fonte, alto contraste, modo escuro
 */
function AccessibilityBar() {
    const {
        fontSize,
        highContrast,
        darkMode,
        increaseFontSize,
        decreaseFontSize,
        toggleHighContrast,
        toggleDarkMode,
        resetAll
    } = useAccessibility();

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <div className={`accessibility-bar ${isExpanded ? 'expanded' : ''}`}>
            <button
                className="accessibility-toggle"
                onClick={toggleExpand}
                aria-label={isExpanded ? 'Fechar barra de acessibilidade' : 'Abrir barra de acessibilidade'}
                aria-expanded={isExpanded}
                title="Acessibilidade"
            >
                {/* Ícone de acessibilidade (pessoa com círculo) */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="8" r="2"></circle>
                    <path d="M12 14v7"></path>
                    <path d="M8 14l4-4 4 4"></path>
                </svg>
            </button>

            {isExpanded && (
                <div className="accessibility-controls">
                    <div className="accessibility-section">
                        <span className="accessibility-label">Tamanho do Texto</span>
                        <div className="accessibility-buttons">
                            <button
                                onClick={decreaseFontSize}
                                aria-label="Diminuir tamanho do texto"
                                title="Diminuir texto (A-)"
                                disabled={fontSize <= 80}
                            >
                                <span className="font-size-icon">A-</span>
                            </button>
                            <span className="font-size-display" aria-live="polite">
                                {fontSize}%
                            </span>
                            <button
                                onClick={increaseFontSize}
                                aria-label="Aumentar tamanho do texto"
                                title="Aumentar texto (A+)"
                                disabled={fontSize >= 150}
                            >
                                <span className="font-size-icon">A+</span>
                            </button>
                        </div>
                    </div>

                    <div className="accessibility-section">
                        <button
                            className={`accessibility-feature-btn ${highContrast ? 'active' : ''}`}
                            onClick={toggleHighContrast}
                            aria-label={highContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
                            aria-pressed={highContrast}
                            title="Alto Contraste"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 2v20"></path>
                            </svg>
                            <span>Alto Contraste</span>
                        </button>
                    </div>

                    <div className="accessibility-section">
                        <button
                            className={`accessibility-feature-btn ${darkMode ? 'active' : ''}`}
                            onClick={toggleDarkMode}
                            aria-label={darkMode ? 'Desativar modo escuro' : 'Ativar modo escuro'}
                            aria-pressed={darkMode}
                            title="Modo Escuro"
                        >
                            {darkMode ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            )}
                            <span>Modo {darkMode ? 'Claro' : 'Escuro'}</span>
                        </button>
                    </div>

                    <div className="accessibility-section">
                        <button
                            className="accessibility-reset-btn"
                            onClick={resetAll}
                            aria-label="Resetar todas as configurações de acessibilidade"
                            title="Resetar"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="1 4 1 10 7 10"></polyline>
                                <polyline points="23 20 23 14 17 14"></polyline>
                                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                            </svg>
                            <span>Resetar</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccessibilityBar;
