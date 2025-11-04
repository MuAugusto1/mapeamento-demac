import React, { useState } from "react";

function UNESPMap() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            style={{
                width: "100%",
                height: "66vw",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                marginTop: "-51px",
                position: "relative",
                zIndex: 50,
            }}
        >
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#000000",
                        zIndex: 100,
                    }}
                >
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            border: "5px solid rgba(29, 173, 238, 0.3)",
                            borderTop: "5px solid #1DADEE",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                        }}
                    />
                    <p style={{ color: "white", marginTop: "1rem", fontSize: "1rem" }}>
                        Carregando mapa...
                    </p>
                </div>
            )}
            <iframe
                src="https://unesp-edu.maps.arcgis.com/apps/instant/exhibit/index.html?appid=dedc7d721d49451985f1312cc60171bb"
                style={{
                    width: "calc(100% + 4px)",
                    height: "102%",
                    border: "none",
                    marginLeft: "-2px",
                }}
                title="Mapa UNESP"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}

export default UNESPMap;
