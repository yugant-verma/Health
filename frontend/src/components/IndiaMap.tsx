import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useState } from "react";

const INDIA_TOPO_URL = "https://cdn.jsdelivr.net/npm/india-topojson@1.0.0/india.json";

export interface HotspotMarker {
  name: string;
  coordinates: [number, number];
  risk: "high" | "moderate" | "low";
  disease: string;
  cases: number;
  riskScore: number;
  symptoms: string[];
  news: string[];
  prediction7d: number[];
}

export const markers: HotspotMarker[] = [
  { name: "Delhi", coordinates: [77.1025, 28.7041], risk: "high", disease: "Dengue", cases: 1247, riskScore: 87, symptoms: ["Fever", "Joint pain", "Rash", "Headache"], news: ["200+ new dengue cases reported", "Fogging drives intensified"], prediction7d: [180, 210, 230, 260, 280, 250, 240] },
  { name: "Mumbai", coordinates: [72.8777, 19.076], risk: "high", disease: "TB", cases: 892, riskScore: 72, symptoms: ["Cough", "Weight loss", "Night sweats"], news: ["TB cases rise post-monsoon", "New treatment center opens"], prediction7d: [120, 130, 145, 155, 160, 150, 148] },
  { name: "Kolkata", coordinates: [88.3639, 22.5726], risk: "moderate", disease: "Dengue", cases: 654, riskScore: 58, symptoms: ["Fever", "Fatigue", "Muscle pain"], news: ["Dengue surge near Howrah area", "Hospital beds filling up"], prediction7d: [80, 95, 105, 115, 110, 100, 95] },
  { name: "Chennai", coordinates: [80.2707, 13.0827], risk: "moderate", disease: "Dengue", cases: 523, riskScore: 45, symptoms: ["Fever", "Nausea", "Skin rash"], news: ["Seasonal dengue uptick reported"], prediction7d: [60, 70, 80, 85, 90, 82, 78] },
  { name: "Bangalore", coordinates: [77.5946, 12.9716], risk: "low", disease: "Flu", cases: 312, riskScore: 32, symptoms: ["Cough", "Cold", "Sore throat"], news: ["Mild flu season in Karnataka"], prediction7d: [40, 42, 38, 35, 33, 30, 28] },
  { name: "Lucknow", coordinates: [80.9462, 26.8467], risk: "moderate", disease: "Flu", cases: 478, riskScore: 63, symptoms: ["Fever", "Cough", "Body aches"], news: ["Flu outbreak in UP schools", "Vaccination drives planned"], prediction7d: [70, 85, 95, 100, 105, 98, 90] },
  { name: "Hyderabad", coordinates: [78.4867, 17.385], risk: "low", disease: "Dengue", cases: 289, riskScore: 28, symptoms: ["Mild fever", "Headache"], news: ["Cases below seasonal average"], prediction7d: [30, 32, 28, 25, 22, 20, 18] },
  { name: "Jaipur", coordinates: [75.7873, 26.9124], risk: "moderate", disease: "Flu", cases: 367, riskScore: 52, symptoms: ["Fever", "Congestion", "Fatigue"], news: ["Flu cases rising in Rajasthan"], prediction7d: [50, 58, 65, 70, 68, 62, 55] },
  { name: "Ahmedabad", coordinates: [72.5714, 23.0225], risk: "low", disease: "Dengue", cases: 198, riskScore: 22, symptoms: ["Fever", "Headache"], news: ["Stable outbreak levels"], prediction7d: [20, 22, 25, 23, 21, 19, 18] },
  { name: "Pune", coordinates: [73.8567, 18.5204], risk: "moderate", disease: "TB", cases: 445, riskScore: 55, symptoms: ["Persistent cough", "Fatigue", "Weight loss"], news: ["TB screening camps organized", "New drug-resistant strain reported"], prediction7d: [55, 62, 68, 72, 75, 70, 65] },
];

const riskColors: Record<string, string> = {
  high: "#ff4422",
  moderate: "#ff8800",
  low: "#66ff44",
};

const riskGlowOuter: Record<string, string> = {
  high: "#ff2200",
  moderate: "#ffaa00",
  low: "#44ff22",
};

interface IndiaMapProps {
  onMarkerClick?: (marker: HotspotMarker) => void;
  selectedCity?: string | null;
  filteredCities?: string[];
}

export function IndiaMap({ onMarkerClick, selectedCity, filteredCities }: IndiaMapProps) {
  const [tooltip, setTooltip] = useState<HotspotMarker | null>(null);

  const visibleMarkers = filteredCities
    ? markers.filter((m) => filteredCities.includes(m.name))
    : markers;

  const getRadius = (m: HotspotMarker) => {
    const base = Math.max(7, m.riskScore / 5);
    return selectedCity === m.name ? base + 3 : base;
  };

  return (
    <div className="relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1000, center: [82, 22] }}
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          {visibleMarkers.map((m) => (
            <radialGradient key={`heat-${m.name}`} id={`heat-${m.name}`}>
              <stop offset="0%" stopColor={riskColors[m.risk]} stopOpacity={0.7} />
              <stop offset="30%" stopColor={riskColors[m.risk]} stopOpacity={0.35} />
              <stop offset="70%" stopColor={riskColors[m.risk]} stopOpacity={0.1} />
              <stop offset="100%" stopColor={riskColors[m.risk]} stopOpacity={0} />
            </radialGradient>
          ))}
          {visibleMarkers.map((m) => (
            <radialGradient key={`orb-${m.name}`} id={`orb-${m.name}`} cx="40%" cy="35%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
              <stop offset="30%" stopColor={riskColors[m.risk]} stopOpacity={0.8} />
              <stop offset="100%" stopColor={riskGlowOuter[m.risk]} stopOpacity={0.6} />
            </radialGradient>
          ))}
          <filter id="hugeGlow">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="orbGlow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="mapShadow">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="hsl(200,80%,40%)" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Dark ocean background */}
        <rect x="-50" y="-50" width="900" height="700" fill="hsl(215, 35%, 7%)" />

        <Geographies geography={INDIA_TOPO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="hsl(220, 20%, 16%)"
                stroke="hsl(220, 25%, 25%)"
                strokeWidth={0.5}
                filter="url(#mapShadow)"
                style={{
                  default: { outline: "none" },
                  hover: { fill: "hsl(220, 20%, 20%)", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Wide area heatmap glow */}
        {visibleMarkers.map((marker) => {
          const heatSize = Math.max(35, marker.riskScore / 1.2);
          return (
            <Marker key={`area-${marker.name}`} coordinates={marker.coordinates}>
              <circle
                r={heatSize}
                fill={`url(#heat-${marker.name})`}
                filter="url(#hugeGlow)"
                style={{ pointerEvents: "none" }}
              />
            </Marker>
          );
        })}

        {/* Secondary glow layer */}
        {visibleMarkers.map((marker) => {
          const size = Math.max(18, marker.riskScore / 3);
          return (
            <Marker key={`glow2-${marker.name}`} coordinates={marker.coordinates}>
              <circle
                r={size}
                fill={riskColors[marker.risk]}
                fillOpacity={0.2}
                filter="url(#orbGlow)"
                style={{ pointerEvents: "none" }}
              />
            </Marker>
          );
        })}

        {/* Orb markers with ring */}
        {visibleMarkers.map((marker) => {
          const r = getRadius(marker);
          const isSelected = selectedCity === marker.name;

          return (
            <Marker
              key={marker.name}
              coordinates={marker.coordinates}
              onMouseEnter={() => setTooltip(marker)}
              onMouseLeave={() => setTooltip(null)}
              onClick={() => onMarkerClick?.(marker)}
            >
              <circle
                r={r + 6}
                fill="none"
                stroke={riskColors[marker.risk]}
                strokeWidth={1.5}
                strokeOpacity={isSelected ? 0.9 : 0.5}
                filter="url(#orbGlow)"
              />
              <circle
                r={r}
                fill={`url(#orb-${marker.name})`}
                filter="url(#orbGlow)"
                className="cursor-pointer"
              />
              <circle
                r={r * 0.35}
                fill="#ffffff"
                fillOpacity={0.7}
                style={{ pointerEvents: "none" }}
              />
              {isSelected && (
                <circle
                  r={r + 14}
                  fill="none"
                  stroke={riskColors[marker.risk]}
                  strokeWidth={1.5}
                  strokeOpacity={0.4}
                  className="animate-pulse"
                />
              )}
              <text
                textAnchor="middle"
                y={-r - 12}
                style={{
                  fontSize: "9px",
                  fill: "hsl(210, 40%, 85%)",
                  fontWeight: 700,
                  textShadow: "0 0 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)",
                }}
              >
                {marker.name}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>

      {tooltip && (
        <div className="absolute top-4 right-4 glass-card p-3 min-w-[180px] z-10">
          <p className="text-sm font-bold text-foreground">{tooltip.name}</p>
          <p className="text-xs text-muted-foreground">
            {tooltip.disease} · {tooltip.cases} mentions
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                tooltip.risk === "high"
                  ? "bg-danger/20 text-danger"
                  : tooltip.risk === "moderate"
                  ? "bg-warning/20 text-warning"
                  : "bg-success/20 text-success"
              }`}
            >
              {tooltip.risk.charAt(0).toUpperCase() + tooltip.risk.slice(1)} Risk
            </span>
            <span className="text-xs text-muted-foreground">Score: {tooltip.riskScore}/100</span>
          </div>
          <p className="text-[10px] text-primary mt-1.5">Click for details →</p>
        </div>
      )}
    </div>
  );
}
