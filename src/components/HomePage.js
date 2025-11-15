import React, { useState } from 'react';
import Footer from './Footer';
import UNESPMap from "./UNESPMap";
import './HomePage.css';

/**
 * Componente da Tela Home.
 * Fundo preto com header azul e menu lateral.
 */
function HomePage({ navegarPara }) {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
    const [sidebarMode, setSidebarMode] = useState('main'); // 'main', 'search', 'categories'

    const defaultCategoryOptions = [
        'Todos',
        'Laboratórios',
        'Banheiro',
        'Estacionamento',        
        'Bebedouro',
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [availablePoints, setAvailablePoints] = useState([]); // Pontos carregados do mapa
    const [selectedPoint, setSelectedPoint] = useState(null); // Ponto selecionado na busca
    const [selectedCategories, setSelectedCategories] = useState(['Todos']);

    const handlePointsLoaded = (points) => {
        // Contar ocorrências de cada ponto
        const pointCounts = {};
        points.forEach(point => {
            const normalizedPoint = point.trim();
            pointCounts[normalizedPoint] = (pointCounts[normalizedPoint] || 0) + 1;
        });
        
        // Criar array com pontos únicos e contagem
        const uniquePointsWithCount = Object.keys(pointCounts).sort().map(point => ({
            name: point,
            count: pointCounts[point]
        }));
        
        setAvailablePoints(uniquePointsWithCount);
    };

    const togglePoint = (point) => {
        setSelectedPoint(prev => {
            // Se clicar no mesmo ponto, desseleciona
            if (prev === point) {
                return null;
            }
            // Caso contrário, seleciona o novo ponto
            return point;
        });
    };

    const toggleCategory = (category) => {
        setSelectedCategories(prev => {
            // Se clicar em "Todos"
            if (category === 'Todos') {
                return ['Todos'];
            }
            
            // Se clicar em outra categoria
            const newCategories = prev.filter(cat => cat !== 'Todos'); // Remove "Todos"
            
            if (newCategories.includes(category)) {
                // Desmarcando uma categoria
                const filtered = newCategories.filter(cat => cat !== category);
                // Se não sobrar nenhuma, volta para "Todos"
                return filtered.length === 0 ? ['Todos'] : filtered;
            } else {
                // Marcando uma categoria
                return [...newCategories, category];
            }
        });
    };

    const handleMenuItemClick = (item) => {
        setActiveMenuItem(item);
        setSidebarExpanded(true);

        switch (item) {
            case 'buscar':
                setSidebarMode('search');
                break;
            case 'categorias':
                setSidebarMode('categories');
                break;
            case 'sobre':
                navegarPara('about');
                break;
            case 'ajuda':
                navegarPara('help');
                break;
            default:
                setSidebarMode('main');
                break;
        }
    };

    const handleReturnFromMode = () => {
        setSidebarMode('main');
        setSidebarExpanded(true);
        // Limpar ponto selecionado e termo de busca ao sair do modo de busca
        if (sidebarMode === 'search') {
            setSelectedPoint(null);
        }
        // Limpar termo de busca ao sair de qualquer modo
        setSearchTerm('');
    };

    const handleLogout = () => {
        setSidebarExpanded(false);
    };

    return (
        <div className="home-page-root">
            <header className="home-header">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: '0.64rem' }}
                >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home</span>

                <img
                    src="/unesp-logo-11.png"
                    alt="Logo Unesp"
                    className="header-logo"
                />
            </header>

            <div className="home-body">
                {/* MENU LATERAL */}
                <aside
                    className={`sidebar ${sidebarExpanded ? 'expanded' : ''} ${sidebarMode === 'search' ? 'search-mode' : ''} ${sidebarMode === 'categories' ? 'categories-mode' : ''}`}
                    onClick={() => {
                        if (!sidebarExpanded) {
                            setSidebarExpanded(true);
                        }
                    }}
                >
                    {sidebarMode === 'main' && (
                        <nav>
                            <ul>
                                {/* 1. Ícone UNESP */}
                                <li
                                    className="sidebar-item sidebar-item-logo"
                                    onClick={(e) => { e.stopPropagation(); setSidebarExpanded(true); }}
                                >
                                <img
                                    src="/unesp-logo-preto.png"
                                    alt="Logo Unesp"                                  
                                />
                                </li>

                                {/* 2. Dashboard */}
                                <li
                                    className={`sidebar-item ${activeMenuItem === 'dashboard' ? 'active' : ''}`}
                                    style={{ marginTop: '2rem' }}
                                    onClick={(e) => { e.stopPropagation(); handleMenuItemClick('dashboard'); }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10 3H3v7h7V3zM21 3h-7v7h7V3zM21 14h-7v7h7v-7zM10 14H3v7h7v-7z"></path>
                                    </svg>
                                    <span className="sidebar-text">Dashboard</span>
                                </li>

                                {/* 3. Buscar */}
                                <li
                                    className={`sidebar-item ${activeMenuItem === 'buscar' ? 'active' : ''}`}
                                    style={{ marginTop: '2rem' }}
                                    onClick={(e) => { e.stopPropagation(); handleMenuItemClick('buscar'); }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                    <span className="sidebar-text">Buscar</span>
                                </li>

                                {/* 4. Categorias */}
                                <li
                                    className={`sidebar-item ${activeMenuItem === 'categorias' ? 'active' : ''}`}
                                    style={{ marginTop: '1rem' }}
                                    onClick={(e) => { e.stopPropagation(); handleMenuItemClick('categorias'); }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="4" y1="8" x2="20" y2="8"></line>
                                        <line x1="6" y1="12" x2="18" y2="12"></line>
                                        <line x1="8" y1="16" x2="16" y2="16"></line>
                                    </svg>
                                    <span className="sidebar-text">Categorias</span>
                                </li>

                                {/* 5. Sobre */}
                                <li
                                    className={`sidebar-item ${activeMenuItem === 'sobre' ? 'active' : ''}`}
                                    style={{ marginTop: '1rem' }}
                                    onClick={(e) => { e.stopPropagation(); handleMenuItemClick('sobre'); }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                    <span className="sidebar-text">Sobre</span>
                                </li>

                                {/* 6. Ajuda */}
                                <li
                                    className={`sidebar-item ${activeMenuItem === 'ajuda' ? 'active' : ''}`}
                                    style={{ marginTop: '1rem' }}
                                    onClick={(e) => { e.stopPropagation(); handleMenuItemClick('ajuda'); }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg>
                                    <span className="sidebar-text">Ajuda</span>
                                </li>

                                {/* 7. Sair */}
                                <li
                                    className="sidebar-item sidebar-item-sair"
                                    style={{ marginTop: '2.5rem' }}
                                    onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 8 8 12 12 16"></polyline>
                                        <line x1="16" y1="12" x2="8" y2="12"></line>
                                    </svg>
                                    <span className="sidebar-text">Sair</span>
                                </li>
                            </ul>
                        </nav>
                    )}

                    {sidebarMode === 'search' && (
                        <div className="sidebar-search-content">
                            <div className="sidebar-search-header">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                            <ul>
                                {availablePoints.length === 0 ? (
                                    <li className="sidebar-item" style={{ opacity: 0.6, cursor: 'default', pointerEvents: 'none' }}>
                                        <span className="sidebar-text">Carregando pontos...</span>
                                    </li>
                                ) : (
                                    availablePoints
                                        .filter(point => point.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((point, index) => (
                                            <li
                                                key={index}
                                                className={`sidebar-item ${selectedPoint === point.name ? 'active' : ''}`}
                                                onClick={(e) => { e.stopPropagation(); togglePoint(point.name); }}
                                            >
                                                <span className="sidebar-text">{point.name}</span>
                                            </li>
                                        ))
                                )}
                            </ul>
                            <div className="sidebar-search-footer">
                                <div className="sidebar-return-btn" onClick={(e) => { e.stopPropagation(); handleReturnFromMode(); }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}

                    {sidebarMode === 'categories' && (
                        <div className="sidebar-search-content">
                            <div className="sidebar-search-header">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="4" y1="8" x2="20" y2="8"></line>
                                    <line x1="6" y1="12" x2="18" y2="12"></line>
                                    <line x1="8" y1="16" x2="16" y2="16"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Buscar Categoria..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                            <ul>
                                {defaultCategoryOptions
                                    .filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((option, index) => (
                                        <li
                                            key={index}
                                            className={`sidebar-item sidebar-item-category ${selectedCategories.includes(option) ? 'selected' : ''}`}
                                            onClick={(e) => { e.stopPropagation(); toggleCategory(option); }}
                                        >
                                            <div className="category-checkbox">
                                                {selectedCategories.includes(option) && (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="sidebar-text">{option}</span>
                                        </li>
                                    ))}
                            </ul>
                            <div className="sidebar-search-footer">
                                <div className="sidebar-return-btn" onClick={(e) => { e.stopPropagation(); handleReturnFromMode(); }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </aside>

                {/* Conteúdo principal */}
                <main className="content-area">            
                    <UNESPMap 
                        selectedCategories={selectedCategories} 
                        selectedPoint={selectedPoint}
                        onPointsLoaded={handlePointsLoaded}
                    />                                        
                </main>
            </div>



            <Footer />
        </div>
    );
}

export default HomePage;
