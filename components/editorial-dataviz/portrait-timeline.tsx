import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Actress {
  id: string;
  name: string;
  birth: number;
  death: number | null;
  milestone: string;
  stereotype: string | null;
}

interface PortraitTimelineProps {
  actresses: Actress[];
}

// Timeline data with milestones by decade
const timelineData = [
  { 
    decade: "1930-39", 
    milestones: [{ name: "Hattie McDaniel", year: 1939, type: "oscar", note: "Premier Oscar" }]
  },
  { 
    decade: "1940-49", 
    milestones: []
  },
  { 
    decade: "1950-59", 
    milestones: [{ name: "Dorothy Dandridge", year: 1954, type: "nomination", note: "Première nomination" }]
  },
  { 
    decade: "1960-69", 
    milestones: []
  },
  { 
    decade: "1970-79", 
    milestones: [{ name: "Cicely Tyson", year: 1973, type: "nomination", note: "Sounder" }]
  },
  { 
    decade: "1980-89", 
    milestones: [
      { name: "Whoopi Goldberg", year: 1986, type: "nomination", note: "La Couleur Pourpre" },
    ]
  },
  { 
    decade: "1990-99", 
    milestones: [
      { name: "Whoopi Goldberg", year: 1991, type: "oscar", note: "Ghost" },
      { name: "Angela Bassett", year: 1994, type: "nomination", note: "Tina" },
    ]
  },
  { 
    decade: "2000-09", 
    milestones: [
      { name: "Halle Berry", year: 2002, type: "oscar", note: "Monster's Ball" },
      { name: "Sophie Okonedo", year: 2005, type: "nomination", note: "Hotel Rwanda" },
      { name: "Jennifer Hudson", year: 2007, type: "oscar", note: "Dreamgirls" },
      { name: "Taraji P. Henson", year: 2009, type: "nomination", note: "Benjamin Button" },
    ]
  },
  { 
    decade: "2010-19", 
    milestones: [
      { name: "Viola Davis", year: 2012, type: "nomination", note: "The Help" },
      { name: "Quvenzhané Wallis", year: 2013, type: "nomination", note: "Beasts" },
      { name: "Lupita Nyong'o", year: 2014, type: "oscar", note: "12 Years" },
      { name: "Viola Davis", year: 2017, type: "oscar", note: "Fences" },
      { name: "Mary J. Blige", year: 2018, type: "nomination", note: "Mudbound" },
      { name: "Cynthia Erivo", year: 2020, type: "nomination", note: "Harriet" },
    ]
  },
  { 
    decade: "2020-24", 
    milestones: [
      { name: "Viola Davis", year: 2021, type: "nomination", note: "Ma Rainey" },
      { name: "Andra Day", year: 2021, type: "nomination", note: "Billie Holiday" },
      { name: "Danielle Deadwyler", year: 2023, type: "nomination", note: "Till" },
    ]
  },
];

export function PortraitTimeline({ actresses }: PortraitTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Nominations & Victoires aux Oscars
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            90 ans de reconnaissance
          </h3>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            Chaque cercle représente une nomination ou victoire aux Oscars pour une actrice noire.
            Les cercles dorés indiquent les victoires.
          </p>
        </motion.div>

        {/* Timeline visualization */}
        <div className="relative">
          {/* Legend */}
          <div className="flex items-center gap-6 mb-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary" />
              <span>Oscar remporté</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-muted-foreground/50" />
              <span>Nomination</span>
            </div>
          </div>

          {/* Grid */}
          <div className="space-y-1">
            {timelineData.map((row, rowIndex) => (
              <motion.div
                key={row.decade}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: rowIndex * 0.05 }}
                className="flex items-center gap-4"
              >
                {/* Decade label */}
                <div className="w-16 text-xs text-muted-foreground font-mono shrink-0">
                  {row.decade}
                </div>

                {/* Milestones row */}
                <div className="flex items-center gap-2 min-h-[32px] flex-wrap">
                  {row.milestones.length === 0 ? (
                    <div className="h-6 flex items-center">
                      <div className="w-16 h-px bg-border/30" />
                    </div>
                  ) : (
                    row.milestones.map((milestone, idx) => {
                      const itemId = `${row.decade}-${idx}`;
                      const isHovered = hoveredItem === itemId;
                      const isOscar = milestone.type === "oscar";
                      
                      return (
                        <div
                          key={idx}
                          className="relative"
                          onMouseEnter={() => setHoveredItem(itemId)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <motion.div
                            className={`
                              w-6 h-6 rounded-full cursor-pointer transition-all duration-200
                              ${isOscar 
                                ? "bg-primary shadow-[0_0_12px_oklch(0.72_0.12_85/0.4)]" 
                                : "border border-muted-foreground/40 hover:border-muted-foreground"
                              }
                              ${isHovered ? "scale-125" : ""}
                            `}
                            whileHover={{ scale: 1.25 }}
                          />
                          
                          {/* Tooltip */}
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50"
                            >
                              <div className="bg-card border border-border px-3 py-2 rounded-sm whitespace-nowrap shadow-xl">
                                <p className="text-xs font-medium text-foreground">{milestone.name}</p>
                                <p className="text-xs text-primary">{milestone.year} - {milestone.note}</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Highlight box for 2000s */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 border-l-2 border-primary pl-6"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-primary font-medium">2000-2024</span> marque une accélération significative : 
              plus de nominations en 24 ans que dans les 60 années précédentes combinées.
              Pourtant, seulement <span className="text-primary font-medium">4 Oscars</span> ont été remportés 
              sur cette période.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
