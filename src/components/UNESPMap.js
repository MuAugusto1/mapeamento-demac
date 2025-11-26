import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAccessibility } from '../contexts/AccessibilityContext';

function UNESPMap({ selectedCategories = [], selectedPoint = null, onPointsLoaded = null }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null); // Referência ao tile layer para poder trocá-lo
  const [isLoading, setIsLoading] = useState(true);
  const [geoError, setGeoError] = useState(false);
  const iconLayersRef = useRef([]); // Array para armazenar os markers para pesquisa futura
  const iconGroupRef = useRef(null); // Referência ao layer group dos ícones
  const { darkMode } = useAccessibility();

  // --- Função que determina a categoria de um ponto --- //
  const getCategoryFromName = (nome) => {
    if (nome.includes("Laboratório")) return "Laboratórios";
    if (nome.includes("Banheiro")) return "Banheiro";
    if (nome.includes("Estacionamento")) return "Estacionamento";
    if (nome.includes("Bebedouro")) return "Bebedouro";
    if (nome.includes("Secretaria")) return "Secretaria";
    if (nome.includes("Bicicletário")) return "Bicicletário";
    if (nome.includes("Projetos")) return "Projetos";
    if (nome.includes("Prisma")) return "Prisma";
    if (nome.includes("Rampa")) return "Rampa";
    if (nome.includes("Sala")) return "Salas";
    if (nome.includes("Anfiteatro")) return "Anfiteatro";
    return "Outros";
  };

  // --- Função que cria ícones personalizados baseados no tipo --- //
  const createCustomIcon = (nome) => {
    let iconHtml = "";
    let bgColor = "#1DADEE";

    if (nome.includes("Laboratório")) {
      iconHtml = "🔬";
      bgColor = "#9C27B0";
    } else if (nome.includes("Banheiro") && (nome.includes("PCD") || nome.includes("Acessível"))) {
      iconHtml = "♿";
      bgColor = "#2196F3";
    } else if (nome.includes("Banheiro")) {
      iconHtml = "🚻";
      bgColor = "#2196F3";
    } else if (nome.includes("Sala") || nome.includes("Anfiteatro")) {
      iconHtml = "🚪";
      bgColor = "#795548";
    } else if (nome.includes("Bicicletário")) {
      iconHtml = "🚲";
      bgColor = "#4CAF50";
    } else if (nome.includes("Estacionamento")) {
      iconHtml = "🅿️";
      bgColor = "#FF9800";
    } else if (nome.includes("Bebedouro")) {
      iconHtml = "💧";
      bgColor = "#00BCD4";
    } else if (nome.includes("Secretaria")) {
      iconHtml = "📋";
      bgColor = "#F44336";
    } else if (nome.includes("Projetos")) {
      iconHtml = "📐";
      bgColor = "#E91E63";
    } else if (nome.includes("Prisma")) {
      iconHtml = "🏛️";
      bgColor = "#673AB7";
    } else if (nome.includes("Rampa")) {
      iconHtml = "♿";
      bgColor = "#4CAF50";
    } else {
      iconHtml = "📍";
    }

    return L.divIcon({
      html: `<div style="
        background-color: ${bgColor};
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        font-size: 18px;
      ">${iconHtml}</div>`,
      className: "custom-div-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  // --- Função que estiliza as features --- //
  const styleFeature = (feature) => {
    const tipo = feature.properties?.Tipo;

    const styles = {
      Caminho: {
        color: "#BED2FF",
        weight: 4,
        opacity: 0.95,
      },
      Planta: {
        color: "#00D9FF",
        weight: 2,
        opacity: 1,
        fillColor: "#1E90FF",
        fillOpacity: 0.4,
      },
      default: {
        color: "#00D9FF",
        weight: 2,
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
        maxZoom: 20,
      });

      mapInstanceRef.current = map;

      // Adicionar tile layer inicial (modo claro por padrão)
      const initialTileUrl = darkMode 
        ? 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        : 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
      
      tileLayerRef.current = L.tileLayer(initialTileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
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
        setTimeout(() => {
          map.invalidateSize();
          
          // --- Carregar Pontos de Interesse (icones.geojson) após o mapa estar pronto ---
          fetch("/icones.geojson")
            .then(response => response.json())
            .then(iconesData => {
              // Filtrar pontos com coordenadas inválidas
              const validFeatures = iconesData.features.filter(f => 
                f.geometry && 
                f.geometry.coordinates && 
                f.geometry.coordinates.length === 2
              );

              const iconGroup = L.geoJSON({
                type: "FeatureCollection",
                features: validFeatures
              }, {
                pointToLayer: function (feature, latlng) {
                  const nome = feature.properties.Nome || "";
                  const marker = L.marker(latlng, { icon: createCustomIcon(nome) });
                  // Armazenar a categoria no marker para filtro posterior
                  marker.category = getCategoryFromName(nome);
                  marker.pointName = nome;
                  return marker;
                },
                onEachFeature: function (feature, layer) {
                  // Adiciona popup com o nome
                  if (feature.properties && feature.properties.Nome) {
                    layer.bindPopup(`<strong>${feature.properties.Nome}</strong>`);
                  }
                  // Adiciona ao array para pesquisa futura
                  iconLayersRef.current.push(layer);
                },
              });
              
              iconGroup.addTo(map);
              iconGroupRef.current = iconGroup; // Armazenar referência ao grupo
              
              // Notificar os pontos carregados para o componente pai
              if (onPointsLoaded) {
                const pointNames = validFeatures.map(f => f.properties.Nome).sort();
                onPointsLoaded(pointNames);
              }
            })
            .catch(iconErr => {
              console.error("Erro ao carregar ícones:", iconErr);
            });
        }, 300);

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

  // --- useEffect para trocar tile layer quando mudar o modo escuro/claro --- //
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    // Remover tile layer atual
    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    // Adicionar novo tile layer baseado no modo
    const newTileUrl = darkMode 
      ? 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
      : 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';

    tileLayerRef.current = L.tileLayer(newTileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(mapInstanceRef.current);
  }, [darkMode]);

  // --- useEffect para filtrar ícones por ponto específico (busca) --- //
  useEffect(() => {
    if (!iconGroupRef.current || !mapInstanceRef.current) return;

    // Se há um ponto específico selecionado (busca), mostrar apenas ele
    if (selectedPoint) {
      let firstMarker = null;
      let matchingMarkers = [];
      
      iconGroupRef.current.eachLayer((layer) => {
        const shouldShow = layer.pointName === selectedPoint || layer.pointName.trim() === selectedPoint.trim();
        
        if (shouldShow) {
          if (!mapInstanceRef.current.hasLayer(layer)) {
            layer.addTo(mapInstanceRef.current);
          }
          // Guardar o primeiro marker para centralizar e abrir popup
          if (!firstMarker) {
            firstMarker = layer;
          }
          matchingMarkers.push(layer);
        } else {
          if (mapInstanceRef.current.hasLayer(layer)) {
            mapInstanceRef.current.removeLayer(layer);
          }
        }
      });
      
      // Centralizar no primeiro ponto encontrado e abrir seu popup
      if (firstMarker) {
        mapInstanceRef.current.panTo(firstMarker.getLatLng());
        firstMarker.openPopup();
      }
      
      return;
    }

    // Se não há ponto selecionado, aplicar filtro de categorias

    // Se nenhuma categoria selecionada ou "Todos" está selecionado, mostrar todos
    if (selectedCategories.length === 0 || selectedCategories.includes('Todos')) {
      iconGroupRef.current.eachLayer((layer) => {
        if (!mapInstanceRef.current.hasLayer(layer)) {
          layer.addTo(mapInstanceRef.current);
        }
      });
      return;
    }

    // Filtrar ícones baseado nas categorias selecionadas
    iconGroupRef.current.eachLayer((layer) => {
      const shouldShow = selectedCategories.includes(layer.category);
      
      if (shouldShow) {
        // Mostrar o ícone
        if (!mapInstanceRef.current.hasLayer(layer)) {
          layer.addTo(mapInstanceRef.current);
        }
      } else {
        // Esconder o ícone
        if (mapInstanceRef.current.hasLayer(layer)) {
          mapInstanceRef.current.removeLayer(layer);
        }
      }
    });
  }, [selectedCategories, selectedPoint]);

  return (
    <>
      <style>
        {`
          .custom-div-icon {
            background: transparent !important;
            border: none !important;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
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
      

        <div ref={mapRef} style={{ width: "100%", height: "70%" }} />
      </div>
    </>
  );
}

export default UNESPMap;
