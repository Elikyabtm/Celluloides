import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// Years between major milestones for Black women at the Oscars
const waitingData = [
  { 
    from: "Hattie McDaniel",
    fromYear: 1940,
    to: "Dorothy Dandridge",
    toYear: 1954,
    milestone: "Nomination Meilleure Actrice",
    years: 14,
  },
  { 
    from: "Dorothy Dandridge",
    fromYear: 1954,
    to: "Cicely Tyson",
    toYear: 1973,
    milestone: "Nomination Meilleure Actrice",
    years: 19,
  },
  { 
    from: "Hattie McDaniel",
    fromYear: 1940,
    to: "Whoopi Goldberg",
    toYear: 1991,
    milestone: "Oscar (Second Rôle)",
    years: 51,
  },
  { 
    from: "Hattie McDaniel",
    fromYear: 1940,
    to: "Halle Berry",
    toYear: 2002,
    milestone: "Oscar Meilleure Actrice",
    years: 62,
  },
  { 
    from: "Halle Berry",
    fromYear: 2002,
    to: "Aujourd'hui",
    toYear: 2024,
    milestone: "Attente 2e Oscar Meilleure Actrice",
    years: 22,
  },
];

export function WaitingYears() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const maxYears = 65;
  const scale = (years: number) => (years / maxYears) * 100;

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Le Prix de l'Attente
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            Combien d'années entre chaque victoire ?
          </h3>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            Visualisation du temps écoulé entre les grandes premières pour les femmes noires aux Oscars.
          </p>
        </motion.div>

        {/* Waiting bars */}
        <div className="space-y-6">
          {waitingData.map((item, index) => {
            const isHovered = hoveredItem === index;
            const isLongWait = item.years > 50;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Labels row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono">{item.fromYear}</span>
                    <span className={`text-sm transition-colors ${isHovered ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.from}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm transition-colors ${isHovered ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.to}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{item.toYear}</span>
                  </div>
                </div>

                {/* Bar visualization */}
                <div className="relative h-10">
                  {/* Background */}
                  <div className="absolute inset-0 bg-muted/30 rounded-sm" />
                  
                  {/* Years bar */}
                  <motion.div
                    className={`absolute left-0 top-0 bottom-0 rounded-sm flex items-center transition-all ${
                      isLongWait ? "bg-destructive/80" : "bg-primary/80"
                    } ${isHovered ? "brightness-110" : ""}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${scale(item.years)}%` } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                  >
                    {/* Years count inside bar */}
                    <motion.span
                      className="absolute right-3 text-sm font-medium text-background"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
                    >
                      {item.years} ans
                    </motion.span>
                  </motion.div>

                  {/* Milestone label */}
                  <motion.div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 text-xs transition-opacity ${
                      isHovered ? "opacity-100" : "opacity-60"
                    }`}
                    style={{ right: `${100 - scale(item.years) + 2}%` }}
                  >
                    <span className="text-muted-foreground whitespace-nowrap">
                      {item.milestone}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scale */}
        <div className="flex justify-between mt-8 text-xs text-muted-foreground font-mono border-t border-border pt-4">
          <span>0 ans</span>
          <span>20 ans</span>
          <span>40 ans</span>
          <span>60+ ans</span>
        </div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 relative"
        >
          <div className="bg-destructive/10 border border-destructive/30 p-8 rounded-sm">
            <p className="font-serif text-5xl md:text-7xl text-destructive mb-4">62</p>
            <p className="text-foreground text-lg mb-2">années d'attente</p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
              Entre l'Oscar d'Hattie McDaniel en 1940 (meilleur second rôle) et celui d'Halle Berry en 2002 
              (meilleure actrice), il a fallu attendre plus d'un demi-siècle. Et depuis Halle Berry, 
              <span className="text-destructive font-medium"> aucune autre femme noire</span> n'a remporté 
              l'Oscar de la meilleure actrice.
            </p>
          </div>

          {/* Decorative element */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border border-destructive/20 rounded-sm" />
        </motion.div>
      </div>
    </section>
  );
}
