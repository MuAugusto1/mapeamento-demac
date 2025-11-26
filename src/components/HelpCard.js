import React from 'react';

/**
 * Componente de Card Reutilizável (para a tela de Ajuda).
 */
function HelpCard({ icon, color, title, text }) {
    const IconComponent = icon;
    
    return (
        <article className="help-card" style={{ '--card-color': color }} role="article" aria-labelledby={`help-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
            <div className="help-card-icon-wrapper" aria-hidden="true">
                <IconComponent />
            </div>
            <div className="help-card-header" aria-hidden="true">
                {/* O header está vazio no design, só tem cor */}
            </div>
            <div className="help-card-body">
                <h3 id={`help-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>{title}</h3>
                <p>{text}</p>
            </div>
        </article>
    );
}

export default HelpCard;
