import React from 'react';

/**
 * Componente de Card Reutilizável (para a tela de Ajuda).
 */
function HelpCard({ icon, color, title, text }) {
    const IconComponent = icon;
    
    return (
        <div className="help-card" style={{ '--card-color': color }}>
            <div className="help-card-icon-wrapper">
                <IconComponent />
            </div>
            <div className="help-card-header">
                {/* O header está vazio no design, só tem cor */}
            </div>
            <div className="help-card-body">
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default HelpCard;
