import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// Data representing 100 leading roles in Hollywood films
// Each figure represents 1% of leading roles
const roleDistribution = {
  totalFigures: 100,
  blackWomen: 4, // 4% of leading roles
  whiteWomen: 32,
  blackMen: 6,
  whiteMen: 48,
  other: 10,
};

interface FigureProps {
  type: "blackWomen" | "whiteWomen" | "blackMen" | "whiteMen" | "other";
  index: number;
  isHighlighted: boolean;
  isInView: boolean;
}

function Figure({ type, index, isHighlighted, isInView }: FigureProps) {
  const colors = {
    blackWomen: "text-primary",
    whiteWomen: "text-muted-foreground/40",
    blackMen: "text-muted-foreground/30",
    whiteMen: "text-muted-foreground/20",
    other: "text-muted-foreground/15",
  };

  const scale = type === "blackWomen" ? 1.1 : 1;

  return (
    <motion.svg
      viewBox="0 0 24 40"
      className={`w-4 h-7 ${colors[type]} ${isHighlighted && type === "blackWomen" ? "drop-shadow-[0_0_8px_oklch(0.72_0.12_85/0.6)]" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0, scale } : {}}
      transition={{ duration: 0.3, delay: index * 0.01 }}
    >
      {/* Head */}
      <circle cx="12" cy="6" r="5" fill="currentColor" />
      {/* Body */}
      <path
        d="M12 12 L12 28 M12 16 L6 22 M12 16 L18 22 M12 28 L7 38 M12 28 L17 38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  );
}

export function PictogramChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Generate array of figures in order
  const figures: Array<{ type: FigureProps["type"]; index: number }> = [];
  let index = 0;
  
  // Add figures in mixed order for visual interest
  for (let i = 0; i < roleDistribution.totalFigures; i++) {
    let type: FigureProps["type"];
    
    // Distribute figures across rows to create visual pattern
    if (i < roleDistribution.blackWomen) {
      type = "blackWomen";
    } else if (i < roleDistribution.blackWomen + roleDistribution.blackMen) {
      type = "blackMen";
    } else if (i < roleDistribution.blackWomen + roleDistribution.blackMen + roleDistribution.whiteWomen) {
      type = "whiteWomen";
    } else if (i < roleDistribution.blackWomen + roleDistribution.blackMen + roleDistribution.whiteWomen + roleDistribution.whiteMen) {
      type = "whiteMen";
    } else {
      type = "other";
    }
    
    figures.push({ type, index: index++ });
  }

  // Shuffle to create more realistic distribution
  const shuffledFigures = [...figures].sort(() => Math.random() - 0.5);

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Rôles Principaux
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            Sur 100 premiers rôles à Hollywood...
          </h3>
        </motion.div>

        {/* Pictogram grid */}
        <div 
          className="relative mb-12"
          onMouseEnter={() => setIsHighlighted(true)}
          onMouseLeave={() => setIsHighlighted(false)}
        >
          <div className="flex flex-wrap gap-1 justify-start max-w-2xl">
            {shuffledFigures.map((figure, i) => (
              <Figure
                key={i}
                type={figure.type}
                index={i}
                isHighlighted={isHighlighted}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Highlight annotation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute right-0 top-0 max-w-xs"
          >
            <div className="border-l-2 border-primary pl-4 py-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Seules <span className="text-primary font-serif text-2xl">{roleDistribution.blackWomen}</span> figures 
                représentent les <span className="text-primary font-medium">femmes noires</span>.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {roleDistribution.blackWomen}% des rôles principaux, 
                contre {roleDistribution.whiteMen}% pour les hommes blancs.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-wrap gap-6 text-xs border-t border-border pt-6"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-foreground">Femmes noires ({roleDistribution.blackWomen}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
            <span className="text-muted-foreground">Hommes noirs ({roleDistribution.blackMen}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
            <span className="text-muted-foreground">Femmes blanches ({roleDistribution.whiteWomen}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
            <span className="text-muted-foreground">Hommes blancs ({roleDistribution.whiteMen}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/15" />
            <span className="text-muted-foreground">Autres ({roleDistribution.other}%)</span>
          </div>
        </motion.div>

        {/* Additional insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-12 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-card/50 border border-border p-6">
            <p className="font-serif text-3xl text-primary mb-2">12x</p>
            <p className="text-sm text-muted-foreground">
              Un homme blanc a 12 fois plus de chances d'obtenir un premier rôle qu'une femme noire.
            </p>
          </div>
          <div className="bg-card/50 border border-border p-6">
            <p className="font-serif text-3xl text-primary mb-2">2010</p>
            <p className="text-sm text-muted-foreground">
              Première année où les femmes noires ont dépassé 5% des rôles principaux dans les blockbusters.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
