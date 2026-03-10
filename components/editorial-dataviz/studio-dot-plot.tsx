import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// Studios with their range of Black women leading roles (fictional but representative data)
const studiosData = [
  { name: "Warner Bros.", range: [2, 18], avg: 8, films: 156 },
  { name: "Disney", range: [1, 12], avg: 5, films: 89 },
  { name: "Universal", range: [3, 22], avg: 11, films: 134 },
  { name: "Paramount", range: [1, 14], avg: 6, films: 112 },
  { name: "Sony/Columbia", range: [2, 16], avg: 7, films: 98 },
  { name: "20th Century", range: [2, 19], avg: 9, films: 145 },
  { name: "MGM", range: [1, 8], avg: 4, films: 67 },
  { name: "Lionsgate", range: [4, 24], avg: 14, films: 78 },
  { name: "A24", range: [8, 28], avg: 18, films: 42 },
  { name: "Netflix", range: [12, 35], avg: 24, films: 89 },
  { name: "Amazon", range: [10, 30], avg: 20, films: 56 },
];

// Reference line (industry average)
const industryAverage = 12;

export function StudioDotPlot() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredStudio, setHoveredStudio] = useState<string | null>(null);

  const maxValue = 40;
  const scale = (value: number) => (value / maxValue) * 100;

  return (
    <section className="py-24 px-6 bg-card/30" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Distribution par Studio
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            Qui produit la diversité ?
          </h3>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            Pourcentage de films avec une femme noire en rôle principal, par studio majeur (1990-2024).
            La ligne pointillée représente la moyenne de l'industrie.
          </p>
        </motion.div>

        {/* Dot plot */}
        <div className="relative">
          {/* Reference line annotation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-0 -translate-y-full pb-2"
            style={{ left: `${scale(industryAverage)}%` }}
          >
            <div className="text-center">
              <p className="text-primary text-xs font-medium">Moyenne industrie</p>
              <p className="text-primary text-lg font-serif">{industryAverage}%</p>
            </div>
          </motion.div>

          {/* Studios list */}
          <div className="space-y-4 pt-8">
            {studiosData.map((studio, index) => {
              const isHovered = hoveredStudio === studio.name;
              const isBelowAverage = studio.avg < industryAverage;
              
              return (
                <motion.div
                  key={studio.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative"
                  onMouseEnter={() => setHoveredStudio(studio.name)}
                  onMouseLeave={() => setHoveredStudio(null)}
                >
                  {/* Studio name */}
                  <div className="flex items-center gap-4">
                    <div className={`w-32 text-sm shrink-0 transition-colors ${isHovered ? "text-foreground" : "text-muted-foreground"}`}>
                      {studio.name}
                    </div>

                    {/* Range visualization */}
                    <div className="flex-1 relative h-6">
                      {/* Axis line */}
                      <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                        <div className="w-full h-px bg-border/50" />
                      </div>

                      {/* Reference line */}
                      <div 
                        className="absolute top-0 bottom-0 w-px border-l border-dashed border-primary/50"
                        style={{ left: `${scale(industryAverage)}%` }}
                      />

                      {/* Range line */}
                      <motion.div
                        className={`absolute top-1/2 -translate-y-1/2 h-0.5 transition-colors ${
                          isBelowAverage ? "bg-destructive/60" : "bg-primary/60"
                        }`}
                        style={{ 
                          left: `${scale(studio.range[0])}%`,
                          width: `${scale(studio.range[1] - studio.range[0])}%`
                        }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.05 + 0.2 }}
                      />

                      {/* Range dots */}
                      <motion.div
                        className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                          isBelowAverage ? "bg-destructive/60" : "bg-primary/60"
                        }`}
                        style={{ left: `${scale(studio.range[0])}%`, marginLeft: "-4px" }}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.05 + 0.4 }}
                      />
                      <motion.div
                        className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                          isBelowAverage ? "bg-destructive/60" : "bg-primary/60"
                        }`}
                        style={{ left: `${scale(studio.range[1])}%`, marginLeft: "-4px" }}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.05 + 0.4 }}
                      />

                      {/* Average dot */}
                      <motion.div
                        className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-transform ${
                          isBelowAverage ? "bg-destructive" : "bg-primary"
                        } ${isHovered ? "scale-150" : ""}`}
                        style={{ left: `${scale(studio.avg)}%`, marginLeft: "-6px" }}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: isHovered ? 1.5 : 1 } : {}}
                        transition={{ duration: 0.3, delay: index * 0.05 + 0.5 }}
                      />

                      {/* Tooltip on hover */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-10"
                        >
                          <div className="bg-background border border-border px-3 py-2 rounded-sm shadow-xl whitespace-nowrap">
                            <p className="text-xs text-foreground font-medium">{studio.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Moyenne: <span className={isBelowAverage ? "text-destructive" : "text-primary"}>{studio.avg}%</span> sur {studio.films} films
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* X-axis */}
          <div className="flex justify-between mt-6 text-xs text-muted-foreground font-mono">
            <span>0%</span>
            <span>10%</span>
            <span>20%</span>
            <span>30%</span>
            <span>40%</span>
          </div>
        </div>

        {/* Insight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 flex gap-8"
        >
          <div className="flex-1 border-t border-primary/30 pt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Les <span className="text-foreground">plateformes de streaming</span> (Netflix, Amazon) 
              dépassent largement les studios traditionnels, avec une moyenne de{" "}
              <span className="text-primary font-medium">22%</span> contre{" "}
              <span className="text-destructive font-medium">7%</span> pour les majors historiques.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
