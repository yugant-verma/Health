import { useState, useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const trendDataSets: Record<string, { day: string; dengue: number; flu: number; tb: number; covid: number; malaria: number }[]> = {
  "Last 24h": [
    { day: "00:00", dengue: 15, flu: 5, tb: 1, covid: 2, malaria: 1 },
    { day: "04:00", dengue: 20, flu: 8, tb: 2, covid: 1, malaria: 1 },
    { day: "08:00", dengue: 35, flu: 12, tb: 3, covid: 3, malaria: 2 },
    { day: "12:00", dengue: 50, flu: 18, tb: 4, covid: 2, malaria: 2 },
    { day: "16:00", dengue: 45, flu: 15, tb: 3, covid: 4, malaria: 3 },
    { day: "20:00", dengue: 60, flu: 22, tb: 5, covid: 3, malaria: 2 },
    { day: "Now", dengue: 72, flu: 25, tb: 4, covid: 2, malaria: 1 },
  ],
  "Last 7 days": [
    { day: "Mon", dengue: 120, flu: 45, tb: 12, covid: 8, malaria: 5 },
    { day: "Tue", dengue: 135, flu: 50, tb: 14, covid: 7, malaria: 6 },
    { day: "Wed", dengue: 115, flu: 62, tb: 11, covid: 9, malaria: 4 },
    { day: "Thu", dengue: 180, flu: 58, tb: 15, covid: 6, malaria: 7 },
    { day: "Fri", dengue: 210, flu: 72, tb: 13, covid: 10, malaria: 5 },
    { day: "Sat", dengue: 195, flu: 85, tb: 16, covid: 8, malaria: 6 },
    { day: "Sun", dengue: 230, flu: 78, tb: 12, covid: 5, malaria: 4 },
  ],
  "Last 30 days": [
    { day: "Wk1", dengue: 450, flu: 180, tb: 48, covid: 25, malaria: 18 },
    { day: "Wk2", dengue: 520, flu: 210, tb: 55, covid: 22, malaria: 20 },
    { day: "Wk3", dengue: 610, flu: 250, tb: 52, covid: 30, malaria: 22 },
    { day: "Wk4", dengue: 580, flu: 230, tb: 60, covid: 18, malaria: 15 },
  ],
  "Last 90 days": [
    { day: "Jan", dengue: 1200, flu: 600, tb: 180, covid: 80, malaria: 55 },
    { day: "Feb", dengue: 1500, flu: 550, tb: 200, covid: 60, malaria: 48 },
    { day: "Mar", dengue: 1800, flu: 480, tb: 190, covid: 45, malaria: 40 },
  ],
};

const riskRegions = [
  { rank: 1, name: "Rohini, Delhi", score: 252, disease: "Dengue" },
  { rank: 2, name: "Anand Vihar", score: 249, disease: "Flu" },
  { rank: 3, name: "Dharavi, Mumbai", score: 245, disease: "TB" },
  { rank: 4, name: "Howrah, Kolkata", score: 243, disease: "Dengue" },
  { rank: 5, name: "Whitefield, Bangalore", score: 240, disease: "Flu" },
  { rank: 6, name: "Triplicane, Chennai", score: 238, disease: "Dengue" },
];

const diseaseKeys: Record<string, string> = {
  "All Diseases": "",
  Dengue: "dengue",
  Flu: "flu",
  TB: "tb",
  "COVID-like": "covid",
  Malaria: "malaria",
};

const diseaseColors: Record<string, string> = {
  dengue: "#4dd0b8",
  flu: "#38bdf8",
  tb: "#f59e0b",
  covid: "#a78bfa",
  malaria: "#f472b6",
};

interface TrendSectionProps {
  diseaseFilter?: string;
  dateFilter?: string;
}

export function TrendSection({ diseaseFilter = "All Diseases", dateFilter = "Last 7 days" }: TrendSectionProps) {
  const data = trendDataSets[dateFilter] ?? trendDataSets["Last 7 days"];

  const visibleDiseases = useMemo(() => {
    if (diseaseFilter === "All Diseases") return ["dengue", "flu", "tb", "covid", "malaria"];
    const key = diseaseKeys[diseaseFilter];
    return key ? [key] : ["dengue", "flu", "tb", "covid", "malaria"];
  }, [diseaseFilter]);

  const filteredRegions = useMemo(() => {
    if (diseaseFilter === "All Diseases") return riskRegions;
    return riskRegions.filter((r) => r.disease === diseaseFilter);
  }, [diseaseFilter]);

  return (
    <div className="grid lg:grid-cols-5 gap-4">
      <div className="lg:col-span-3 glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Disease Mention Trends</h3>
          <span className="text-xs text-muted-foreground">{dateFilter}</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                {Object.entries(diseaseColors).map(([key, color]) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 96%)",
                }}
              />
              {visibleDiseases.map((key) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={diseaseColors[key]}
                  strokeWidth={2}
                  fill={`url(#grad-${key})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-4 flex-wrap">
          {visibleDiseases.map((key) => (
            <div key={key} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: diseaseColors[key] }} />
              <span className="text-sm text-muted-foreground capitalize">{key}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Top Risk Regions</h3>
        </div>
        <div className="space-y-3">
          {filteredRegions.length > 0 ? filteredRegions.map((region) => (
            <div key={region.rank} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-mono w-6">#{region.rank}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{region.name}</span>
                  <span className="text-xs text-muted-foreground">{region.disease}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-warning transition-all" style={{ width: `${(region.score / 260) * 100}%` }} />
                </div>
                <span className="text-xs font-mono text-warning mt-1 inline-block">{region.score}</span>
              </div>
            </div>
          )) : (
            <p className="text-sm text-muted-foreground">No regions for this filter</p>
          )}
        </div>
      </div>
    </div>
  );
}
