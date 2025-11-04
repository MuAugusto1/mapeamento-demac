import React from "react";

function UNESPMap() {
    return (
        <div
            style={{
                width: "100%",
                height: "600px",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                marginTop: "1rem",
            }}
        >
            <iframe
                src="https://unesp-edu.maps.arcgis.com/apps/instant/exhibit/index.html?appid=dedc7d721d49451985f1312cc60171bb"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                }}
                title="Mapa UNESP"
                allowFullScreen
            />
        </div>
    );
}

export default UNESPMap;
