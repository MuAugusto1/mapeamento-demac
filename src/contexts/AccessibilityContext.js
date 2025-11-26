import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility deve ser usado dentro de um AccessibilityProvider');
    }
    return context;
};

export const AccessibilityProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(100); // Porcentagem (100 = normal)
    const [highContrast, setHighContrast] = useState(false);
    const [darkMode, setDarkMode] = useState(true); // Modo escuro como padrão

    // Carregar preferências do localStorage
    useEffect(() => {
        const savedFontSize = localStorage.getItem('accessibility-fontSize');
        const savedHighContrast = localStorage.getItem('accessibility-highContrast');
        const savedDarkMode = localStorage.getItem('accessibility-darkMode');

        if (savedFontSize) setFontSize(Number(savedFontSize));
        if (savedHighContrast) setHighContrast(savedHighContrast === 'true');
        if (savedDarkMode !== null) setDarkMode(savedDarkMode === 'true');
    }, []);

    // Aplicar mudanças no documento
    useEffect(() => {
        const root = document.documentElement;
        
        // Aplicar tamanho de fonte
        root.style.fontSize = `${fontSize}%`;

        // Aplicar alto contraste
        if (highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }

        // Aplicar modo escuro
        if (darkMode) {
            root.classList.add('dark-mode');
        } else {
            root.classList.remove('dark-mode');
        }

        // Salvar preferências
        localStorage.setItem('accessibility-fontSize', fontSize.toString());
        localStorage.setItem('accessibility-highContrast', highContrast.toString());
        localStorage.setItem('accessibility-darkMode', darkMode.toString());
    }, [fontSize, highContrast, darkMode]);

    const increaseFontSize = () => {
        setFontSize(prev => Math.min(prev + 10, 150)); // Máximo 150%
    };

    const decreaseFontSize = () => {
        setFontSize(prev => Math.max(prev - 10, 80)); // Mínimo 80%
    };

    const resetFontSize = () => {
        setFontSize(100);
    };

    const toggleHighContrast = () => {
        setHighContrast(prev => !prev);
    };

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const resetAll = () => {
        setFontSize(100);
        setHighContrast(false);
        setDarkMode(true); // Volta para modo escuro (padrão)
    };

    const value = {
        fontSize,
        highContrast,
        darkMode,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        toggleHighContrast,
        toggleDarkMode,
        resetAll
    };

    return (
        <AccessibilityContext.Provider value={value}>
            {children}
        </AccessibilityContext.Provider>
    );
};
