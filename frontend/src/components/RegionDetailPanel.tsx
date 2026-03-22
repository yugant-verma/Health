import { X, TrendingUp, AlertTriangle, Newspaper, Activity } from "lucide-react";

interface RegionDetail {
  name: string;
  disease: string;
  risk: "high" | "moderate" | "low";
  cases: number;
  riskScore: number;
  symptoms: string[];
  news: string[];
  prediction7d: number[];
}

interface RegionDetailPanelProps {
  region: RegionDetail | null;
  onClose: () => void;
}

const riskColors = {
  high: "text-danger",
  moderate: "text-warning",
  low: "text-success",
};

const riskBg = {
  high: "bg-danger/20 text-danger",
  moderate: "bg-warning/20 text-warning",
  low: "bg-success/20 text-success",
};

export function RegionDetailPanel({ region, onClose }: RegionDetailPanelProps) {
  if (!region) return null;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxPred = Math.max(...region.prediction7d);

  return (
    <div className="glass-card p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">{region.name}</h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${riskBg[region.risk]}`}>
            {region.risk.charAt(0).toUpperCase() + region.risk.slice(1)} Risk
          </span>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Risk Score */}
        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground mb-2">Risk Score</p>
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-bold ${riskColors[region.risk]}`}>{region.riskScore}</span>
            <span className="text-xs text-muted-foreground mb-1">/100</span>
          </div>
          <div className="h-2 rounded-full bg-secondary mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                region.risk === "high" ? "bg-danger" : region.risk === "moderate" ? "bg-warning" : "bg-success"
              }`}
              style={{ width: `${region.riskScore}%` }}
            />
          </div>
        </div>

        {/* Top Symptoms */}
        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground mb-2">Top Symptoms</p>
          <div className="flex flex-wrap gap-1.5">
            {region.symptoms.map((s) => (
              <span key={s} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Recent News */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Newspaper className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Recent News</p>
          </div>
          <div className="space-y-1.5">
            {region.news.map((n, i) => (
              <p key={i} className="text-xs text-foreground leading-relaxed line-clamp-2">{n}</p>
            ))}
          </div>
        </div>

        {/* 7-Day Prediction */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">7-Day Prediction</p>
          </div>
          <div className="flex items-end gap-1 h-12">
            {region.prediction7d.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm bg-primary/60 transition-all"
                  style={{ height: `${(val / maxPred) * 100}%` }}
                />
                <span className="text-[9px] text-muted-foreground">{days[i]?.slice(0, 1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
