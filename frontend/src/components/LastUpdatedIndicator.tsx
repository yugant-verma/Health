import { useState, useEffect } from "react";
import { RefreshCw, Clock } from "lucide-react";

export function LastUpdatedIndicator() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [minutesAgo, setMinutesAgo] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutesAgo(Math.floor((Date.now() - lastUpdated.getTime()) / 60000));
    }, 10000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setMinutesAgo(0);
      setRefreshing(false);
    }, 1200);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>
          Last updated: {minutesAgo === 0 ? "just now" : `${minutesAgo} min${minutesAgo > 1 ? "s" : ""} ago`}
        </span>
      </div>
      <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
      <span className="text-xs text-success font-medium">Live</span>
      <button
        onClick={handleRefresh}
        className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
        disabled={refreshing}
      >
        <RefreshCw className={`h-3.5 w-3.5 text-muted-foreground ${refreshing ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
}
