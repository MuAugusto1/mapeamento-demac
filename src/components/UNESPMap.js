import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";

function UNESPMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [geoError, setGeoError] = useState(false);

  // --- Função que estiliza as features --- //
  const styleFeature = (feature) => {
    const tipo = feature.properties?.Tipo;

    const styles = {
      Caminho: {
        color: "#FF6B00",
        weight: 4,
        opacity: 0.9,
      },
      Planta: {
        color: "#1E3A8A",
        weight: 2,
        opacity: 1,
        fillColor: "#3B82F6",
        fillOpacity: 0.3,
      },
      default: {
        color: "#FF0000",
        weight: 1,
      },
    };

    return styles[tipo] || styles.default;
  };

  useEffect(() => {
    const initMap = async () => {
      if (mapInstanceRef.current || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [-22.3928, -47.5436],
        zoom: 18,
        minZoom: 10,
        maxZoom: 23,
        preferCanvas: true,
      });

      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxNativeZoom: 19,
        maxZoom: 23,
      }).addTo(map);

      try {
        const response = await fetch("/mapa.geojson");
        if (!response.ok) throw new Error("Falha ao carregar GeoJSON");

        const data = await response.json();

        const geoJsonLayer = L.geoJSON(data, {
          style: styleFeature,
        }).addTo(map);

        map.fitBounds(geoJsonLayer.getBounds(), { padding: [50, 50] });

        // garantir renderização correta
        setTimeout(() => map.invalidateSize(), 100);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setGeoError(true);
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "66vw",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        position: "relative",
        zIndex: 50,
      }}
    >
      {/* LOADING */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
            zIndex: 100,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              border: "5px solid rgba(29, 173, 238, 0.3)",
              borderTop: "5px solid #1DADEE",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ color: "white", marginTop: 16 }}>Carregando mapa...</p>
        </div>
      )}

      {/* ERRO AO CARREGAR */}
      {geoError && !isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1e1e1e",
            color: "white",
            zIndex: 100,
          }}
        >
          Erro ao carregar o mapa.
        </div>
      )}

      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default UNESPMap;
