import React from 'react';
import ArcGISMap from './ArcGISMap';
import Footer from './Footer';

/**
 * MapPage - Página que integra o ArcGISMap com o layout do projeto
 * 
 * Esta página:
 * - Envolve o ArcGISMap
 * - Adiciona botão de voltar
 * - Mantém o footer do projeto
 */
function MapPage({ navegarPara }) {
    return (
        <div style={{ 
            position: 'relative',
            width: '100vw', 
            height: '100vh',
            backgroundColor: '#000'
        }}>
            {/* Botão de voltar */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 1000
            }}>
                <button 
                    onClick={() => navegarPara('home')}
                    style={{
                        backgroundColor: 'var(--cor-primaria)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#1a9bcc';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#1DADEE';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Voltar
                </button>
            </div>

            {/* Componente do Mapa */}
            <ArcGISMap />

            {/* Footer do projeto */}
            <Footer />
        </div>
    );
}

export default MapPage;
