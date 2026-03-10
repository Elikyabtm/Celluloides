import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// Types of roles over decades
const rolesData = [
  { 
    decade: "1930s",
    roles: { servant: 89, secondary: 8, lead: 2, villain: 1 }
  },
  { 
    decade: "1940s",
    roles: { servant: 82, secondary: 12, lead: 4, villain: 2 }
  },
  { 
    decade: "1950s",
    roles: { servant: 67, secondary: 22, lead: 8, villain: 3 }
  },
  { 
    decade: "1960s",
    roles: { servant: 45, secondary: 35, lead: 15, villain: 5 }
  },
  { 
    decade: "1970s",
    roles: { servant: 20, secondary: 40, lead: 30, villain: 10 }
  },
  { 
    decade: "1980s",
    roles: { servant: 15, secondary: 42, lead: 35, villain: 8 }
  },
  { 
    decade: "1990s",
    roles: { servant: 10, secondary: 38, lead: 45, villain: 7 }
  },
  { 
    decade: "2000s",
    roles: { servant: 8, secondary: 32, lead: 52, villain: 8 }
  },
  { 
    decade: "2010s",
    roles: { servant: 5, secondary: 28, lead: 58, villain: 9 }
  },
  { 
    decade: "2020s",
    roles: { servant: 3, secondary: 25, lead: 62, villain: 10 }
  },
];

const roleColors = {
  servant: { label: "Domestiques/Serviles", color: "bg-destructive/70" },
  secondary: { label: "Rôles secondaires", color: "bg-muted-foreground/40" },
  lead: { label: "Rôles principaux", color: "bg-primary" },
  villain: { label: "Antagonistes", color: "bg-accent/60" },
};

export function RolesEvolution() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredDecade, setHoveredDecade] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<keyof typeof roleColors | null>(null);

  return (
    <section className="py-24 px-6 bg-card/20" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Évolution des Types de Rôles
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
            De la servitude aux premiers rôles
          </h3>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            Répartition des types de rôles attribués aux femmes noires à Hollywood par décennie.
            Cliquez sur une catégorie pour la mettre en évidence.
          </p>
        </motion.div>

        {/* Legend - clickable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {(Object.entries(roleColors) as [keyof typeof roleColors, typeof roleColors.servant][]).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedRole(selectedRole === key ? null : key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-all ${
                selectedRole === key 
                  ? "border-foreground bg-foreground/10" 
                  : selectedRole === null 
                    ? "border-border hover:border-foreground/50" 
                    : "border-border/50 opacity-50"
              }`}
            >
              <div className={`w-3 h-3 rounded-sm ${value.color}`} />
              <span className="text-xs text-foreground">{value.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Stacked bar chart */}
        <div className="space-y-2">
          {rolesData.map((decade, index) => {
            const isHovered = hoveredDecade === decade.decade;
            
            return (
              <motion.div
                key={decade.decade}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-4"
                onMouseEnter={() => setHoveredDecade(decade.decade)}
                onMouseLeave={() => setHoveredDecade(null)}
              >
                {/* Decade label */}
                <div className={`w-14 text-xs font-mono shrink-0 transition-colors ${isHovered ? "text-foreground" : "text-muted-foreground"}`}>
                  {decade.decade}
                </div>

                {/* Stacked bar */}
                <div className="flex-1 flex h-8 relative">
                  {(Object.entries(decade.roles) as [keyof typeof roleColors, number][]).map(([role, value], roleIndex) => {
                    const isSelected = selectedRole === role;
                    const shouldDim = selectedRole !== null && !isSelected;
                    
                    return (
                      <motion.div
                        key={role}
                        className={`h-full ${roleColors[role].color} first:rounded-l-sm last:rounded-r-sm relative transition-opacity ${
                          shouldDim ? "opacity-20" : ""
                        }`}
                        style={{ width: `${value}%` }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.05 + roleIndex * 0.05 }}
                      >
                        {/* Value label on hover */}
                        {isHovered && value > 10 && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center text-xs font-medium text-background"
                          >
                            {value}%
                          </motion.span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Annotation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid md:grid-cols-2 gap-8"
        >
          <div className="border-l-2 border-destructive/50 pl-4">
            <p className="font-serif text-4xl text-destructive mb-2">-96%</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Réduction des rôles domestiques/serviles entre les années 1930 et 2020.
              De <span className="text-foreground">89%</span> à <span className="text-foreground">3%</span> des rôles.
            </p>
          </div>
          <div className="border-l-2 border-primary pl-4">
            <p className="font-serif text-4xl text-primary mb-2">+3100%</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Augmentation des rôles principaux sur la même période.
              De <span className="text-foreground">2%</span> à <span className="text-foreground">62%</span> des rôles.
            </p>
          </div>
        </motion.div>

        {/* Timeline markers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 flex flex-wrap gap-4 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary" />
            <span>1940: Premier Oscar (Hattie McDaniel)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary" />
            <span>1971: Blaxploitation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary" />
            <span>2002: Oscar Halle Berry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary" />
            <span>2018: Black Panther</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
