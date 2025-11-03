import React, { useState } from 'react';
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
        <div className="app-container">
            {telaAtual === 'inicio' && <InicioPage aoContinuar={() => navegarPara('home')} />}
            {telaAtual === 'home' && <HomePage navegarPara={navegarPara} />}
            {telaAtual === 'about' && <AboutPage navegarPara={navegarPara} />}
            {telaAtual === 'help' && <HelpPage navegarPara={navegarPara} />}
        </div>
    );
}

export default App;
