import React, { useState } from 'react';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import AccessibilityBar from './components/AccessibilityBar';
import InicioPage from './components/InicioPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import HelpPage from './components/HelpPage';
import './styles/App.css';

/**
 * O componente principal da aplicação.
 * Gerencia o estado da tela atual e a navegação.
 */
function App() {
    const [telaAtual, setTelaAtual] = useState('inicio'); // 'inicio', 'home', 'about', 'help'

    const navegarPara = (tela) => {
        setTelaAtual(tela);
    };

    return (
        <AccessibilityProvider>            
            <div className="app-container" id="main-content">
                <AccessibilityBar />
                {telaAtual === 'inicio' && <InicioPage aoContinuar={() => navegarPara('home')} />}
                {telaAtual === 'home' && <HomePage navegarPara={navegarPara} />}
                {telaAtual === 'about' && <AboutPage navegarPara={navegarPara} />}
                {telaAtual === 'help' && <HelpPage navegarPara={navegarPara} />}
            </div>
        </AccessibilityProvider>
    );
}

export default App;
