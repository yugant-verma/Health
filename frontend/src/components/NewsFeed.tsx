import { Newspaper, ExternalLink } from "lucide-react";

const newsItems = [
  {
    title: "Delhi reports 200+ new dengue cases in single day",
    source: "Times of India",
    time: "2h ago",
    keywords: ["dengue", "Delhi"],
    url: "#",
  },
  {
    title: "Mumbai hospitals prepare for monsoon disease surge",
    source: "NDTV",
    time: "4h ago",
    keywords: ["monsoon", "disease", "Mumbai"],
    url: "#",
  },
  {
    title: "Flu outbreak reported in schools across Uttar Pradesh",
    source: "Hindustan Times",
    time: "5h ago",
    keywords: ["flu", "outbreak", "Uttar Pradesh"],
    url: "#",
  },
  {
    title: "WHO commends India's TB surveillance digital infrastructure",
    source: "The Hindu",
    time: "8h ago",
    keywords: ["TB", "surveillance"],
    url: "#",
  },
  {
    title: "Kolkata sees rising dengue cases near Howrah bridge area",
    source: "Indian Express",
    time: "10h ago",
    keywords: ["dengue", "Kolkata", "Howrah"],
    url: "#",
  },
  {
    title: "Government launches new mobile app for symptom reporting",
    source: "Economic Times",
    time: "12h ago",
    keywords: ["symptoms", "reporting"],
    url: "#",
  },
];

function highlightKeywords(title: string, keywords: string[]) {
  let result = title;
  keywords.forEach((kw) => {
    const regex = new RegExp(`(${kw})`, "gi");
    result = result.replace(regex, `<mark class="bg-primary/20 text-primary rounded px-0.5">$1</mark>`);
  });
  return result;
}

export function NewsFeed() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Outbreak News Feed</h3>
        <span className="text-xs text-muted-foreground ml-auto">NLP-scanned sources</span>
      </div>
      <div className="space-y-2">
        {newsItems.map((item, i) => (
          <a
            key={i}
            href={item.url}
            className="flex items-start gap-3 p-3 rounded-xl border border-border/50 hover:border-primary/20 hover:bg-secondary/30 transition-all group"
          >
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug"
                dangerouslySetInnerHTML={{ __html: highlightKeywords(item.title, item.keywords) }}
              />
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-muted-foreground">{item.source}</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
}
