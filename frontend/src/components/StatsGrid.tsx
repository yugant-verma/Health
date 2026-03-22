import { Area, AreaChart, ResponsiveContainer } from "recharts";

const allData: Record<string, Record<string, { value: string; subtitle: string; trend: "up" | "down"; spark: { v: number }[] }>> = {
  "All Diseases": {
    "Last 24h": { value: "347", subtitle: "↑ 8% today", trend: "up", spark: [{ v: 30 }, { v: 35 }, { v: 42 }, { v: 50 }, { v: 55 }, { v: 60 }, { v: 72 }] },
    "Last 7 days": { value: "1,247", subtitle: "↑ 23% this week", trend: "up", spark: [{ v: 30 }, { v: 45 }, { v: 38 }, { v: 52 }, { v: 48 }, { v: 60 }, { v: 72 }] },
    "Last 30 days": { value: "4,892", subtitle: "↑ 15% this month", trend: "up", spark: [{ v: 20 }, { v: 30 }, { v: 45 }, { v: 42 }, { v: 55 }, { v: 60 }, { v: 65 }] },
    "Last 90 days": { value: "12,340", subtitle: "↑ 5% this quarter", trend: "up", spark: [{ v: 15 }, { v: 22 }, { v: 35 }, { v: 40 }, { v: 48 }, { v: 52 }, { v: 58 }] },
  },
  Dengue: {
    "Last 24h": { value: "182", subtitle: "↑ 12% today", trend: "up", spark: [{ v: 20 }, { v: 28 }, { v: 35 }, { v: 42 }, { v: 50 }, { v: 55 }, { v: 62 }] },
    "Last 7 days": { value: "723", subtitle: "↑ 28% this week", trend: "up", spark: [{ v: 25 }, { v: 35 }, { v: 45 }, { v: 55 }, { v: 60 }, { v: 65 }, { v: 72 }] },
    "Last 30 days": { value: "2,456", subtitle: "↑ 20% this month", trend: "up", spark: [{ v: 18 }, { v: 28 }, { v: 38 }, { v: 48 }, { v: 55 }, { v: 62 }, { v: 68 }] },
    "Last 90 days": { value: "6,120", subtitle: "↑ 8% this quarter", trend: "up", spark: [{ v: 12 }, { v: 20 }, { v: 30 }, { v: 38 }, { v: 45 }, { v: 50 }, { v: 55 }] },
  },
  Flu: {
    "Last 24h": { value: "95", subtitle: "↑ 5% today", trend: "up", spark: [{ v: 10 }, { v: 15 }, { v: 18 }, { v: 22 }, { v: 28 }, { v: 32 }, { v: 38 }] },
    "Last 7 days": { value: "312", subtitle: "↑ 12% this week", trend: "up", spark: [{ v: 10 }, { v: 18 }, { v: 25 }, { v: 32 }, { v: 28 }, { v: 45 }, { v: 52 }] },
    "Last 30 days": { value: "1,280", subtitle: "↑ 10% this month", trend: "up", spark: [{ v: 8 }, { v: 15 }, { v: 22 }, { v: 28 }, { v: 35 }, { v: 40 }, { v: 45 }] },
    "Last 90 days": { value: "3,450", subtitle: "↓ 3% this quarter", trend: "down", spark: [{ v: 50 }, { v: 45 }, { v: 42 }, { v: 38 }, { v: 35 }, { v: 32 }, { v: 30 }] },
  },
  TB: {
    "Last 24h": { value: "42", subtitle: "↑ 2% today", trend: "up", spark: [{ v: 5 }, { v: 6 }, { v: 8 }, { v: 7 }, { v: 9 }, { v: 10 }, { v: 12 }] },
    "Last 7 days": { value: "156", subtitle: "↑ 6% this week", trend: "up", spark: [{ v: 5 }, { v: 8 }, { v: 12 }, { v: 15 }, { v: 18 }, { v: 20 }, { v: 22 }] },
    "Last 30 days": { value: "623", subtitle: "↑ 4% this month", trend: "up", spark: [{ v: 4 }, { v: 7 }, { v: 10 }, { v: 13 }, { v: 16 }, { v: 18 }, { v: 20 }] },
    "Last 90 days": { value: "1,890", subtitle: "↓ 5% this quarter", trend: "down", spark: [{ v: 30 }, { v: 28 }, { v: 25 }, { v: 22 }, { v: 20 }, { v: 18 }, { v: 16 }] },
  },
  "COVID-like": {
    "Last 24h": { value: "18", subtitle: "↓ 10% today", trend: "down", spark: [{ v: 25 }, { v: 22 }, { v: 20 }, { v: 18 }, { v: 16 }, { v: 15 }, { v: 14 }] },
    "Last 7 days": { value: "45", subtitle: "↓ 15% this week", trend: "down", spark: [{ v: 20 }, { v: 18 }, { v: 16 }, { v: 14 }, { v: 12 }, { v: 10 }, { v: 8 }] },
    "Last 30 days": { value: "312", subtitle: "↓ 20% this month", trend: "down", spark: [{ v: 30 }, { v: 25 }, { v: 22 }, { v: 18 }, { v: 15 }, { v: 12 }, { v: 10 }] },
    "Last 90 days": { value: "580", subtitle: "↓ 30% this quarter", trend: "down", spark: [{ v: 40 }, { v: 35 }, { v: 28 }, { v: 22 }, { v: 18 }, { v: 14 }, { v: 10 }] },
  },
  Malaria: {
    "Last 24h": { value: "10", subtitle: "— Stable", trend: "down", spark: [{ v: 10 }, { v: 10 }, { v: 11 }, { v: 10 }, { v: 9 }, { v: 10 }, { v: 10 }] },
    "Last 7 days": { value: "56", subtitle: "↓ 8% this week", trend: "down", spark: [{ v: 15 }, { v: 13 }, { v: 12 }, { v: 11 }, { v: 10 }, { v: 9 }, { v: 8 }] },
    "Last 30 days": { value: "221", subtitle: "↓ 12% this month", trend: "down", spark: [{ v: 25 }, { v: 22 }, { v: 18 }, { v: 15 }, { v: 12 }, { v: 10 }, { v: 8 }] },
    "Last 90 days": { value: "300", subtitle: "↓ 25% this quarter", trend: "down", spark: [{ v: 35 }, { v: 30 }, { v: 25 }, { v: 20 }, { v: 15 }, { v: 12 }, { v: 10 }] },
  },
};

const alertsData: Record<string, Record<string, { value: string; subtitle: string; trend: "up" | "down" }>> = {
  "All Diseases": {
    "Last 24h": { value: "1", subtitle: "Active now", trend: "up" },
    "Last 7 days": { value: "3", subtitle: "Filterable queue", trend: "up" },
    "Last 30 days": { value: "8", subtitle: "↓ 2 resolved", trend: "down" },
    "Last 90 days": { value: "14", subtitle: "5 resolved", trend: "down" },
  },
};

const directionData: Record<string, Record<string, { value: string; subtitle: string; trend: "up" | "down" }>> = {
  "All Diseases": {
    "Last 24h": { value: "-5%", subtitle: "Short-term dip", trend: "down" },
    "Last 7 days": { value: "-18%", subtitle: "Improving trend", trend: "down" },
    "Last 30 days": { value: "-12%", subtitle: "Monthly decline", trend: "down" },
    "Last 90 days": { value: "+3%", subtitle: "Slight uptick", trend: "up" },
  },
};

interface StatCardProps {
  label: string;
  value: string;
  subtitle: string;
  trend?: "up" | "down";
  color: string;
  data: { v: number }[];
}

function StatCard({ label, value, subtitle, trend, color, data }: StatCardProps) {
  return (
    <div className="glass-card p-5 flex flex-col justify-between gap-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-4xl font-bold text-foreground">{value}</p>
      <p className={`text-sm ${trend === "down" ? "text-success" : "text-warning"}`}>
        {subtitle}
      </p>
      <div className="h-10 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#grad-${label})`} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface StatsGridProps {
  diseaseFilter?: string;
  dateFilter?: string;
}

export function StatsGrid({ diseaseFilter = "All Diseases", dateFilter = "Last 7 days" }: StatsGridProps) {
  const disease = allData[diseaseFilter] ? diseaseFilter : "All Diseases";
  const stats = allData[disease]?.[dateFilter] ?? allData["All Diseases"]["Last 7 days"];
  const alerts = alertsData["All Diseases"][dateFilter] ?? alertsData["All Diseases"]["Last 7 days"];
  const direction = directionData["All Diseases"][dateFilter] ?? directionData["All Diseases"]["Last 7 days"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label={`${disease === "All Diseases" ? "Total" : disease} Mentions`}
        value={stats.value}
        subtitle={stats.subtitle}
        trend={stats.trend}
        color="#4dd0b8"
        data={stats.spark}
      />
      <StatCard
        label="Clusters Detected"
        value={disease === "All Diseases" ? "89" : String(Math.floor(parseInt(stats.value.replace(/,/g, "")) / 14))}
        subtitle="Active clusters"
        trend="up"
        color="#38bdf8"
        data={stats.spark}
      />
      <StatCard
        label="Critical Alerts"
        value={alerts.value}
        subtitle={alerts.subtitle}
        trend={alerts.trend}
        color="#f59e0b"
        data={[{ v: 5 }, { v: 4 }, { v: 6 }, { v: 3 }, { v: 7 }, { v: 5 }, { v: 3 }]}
      />
      <StatCard
        label="7-Day Direction"
        value={direction.value}
        subtitle={direction.subtitle}
        trend={direction.trend}
        color="#22c55e"
        data={[{ v: 80 }, { v: 75 }, { v: 68 }, { v: 60 }, { v: 55 }, { v: 50 }, { v: 42 }]}
      />
    </div>
  );
}
