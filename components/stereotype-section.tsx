import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Stereotype {
  id: string;
  name: string;
  description: string;
  period: string;
  characteristics: string[];
}

interface StereotypeSectionProps {
  stereotypes: Stereotype[];
}

export function StereotypeSection({ stereotypes }: StereotypeSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="archetypes" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">
            Les archétypes
          </p>
          <h2 className="font-serif title-hollywood text-3xl md:text-5xl text-foreground mb-6">
            Déconstruire les Stéréotypes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hollywood a enfermé les femmes noires dans trois archétypes principaux.
            Comprendre leur construction est le premier pas vers leur déconstruction.
          </p>
        </motion.div>

        {/* Stereotypes grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stereotypes.map((stereotype, index) => (
            <StereotypeCard
              key={stereotype.id}
              stereotype={stereotype}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Visual fissure */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-1/2 origin-center"
          style={{
            background: "linear-gradient(to bottom, transparent, oklch(0.45 0.2 25 / 0.5), transparent)",
          }}
        />
      </div>
    </section>
  );
}

function StereotypeCard({
  stereotype,
  index,
  scrollProgress,
}: {
  stereotype: Stereotype;
  index: number;
  scrollProgress: ReturnType<typeof useTransform>;
}) {
  const rotate = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [index === 1 ? 0 : index === 0 ? -2 : 2, 0, index === 1 ? 0 : index === 0 ? 2 : -2]
  );

  const fragmentation = useTransform(scrollProgress, [0.3, 0.7], [0, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      style={{ rotate }}
      className="relative group"
    >
      <div className="relative bg-card border border-border p-8 h-full overflow-hidden">
        {/* Fragmentation overlay */}
        <motion.div
          style={{ opacity: fragmentation }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id={`crack-${stereotype.id}`} patternUnits="userSpaceOnUse" width="100" height="100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="oklch(0.45 0.2 25 / 0.3)" strokeWidth="0.5" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="oklch(0.45 0.2 25 / 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#crack-${stereotype.id})`} />
          </svg>
        </motion.div>

        {/* Period badge */}
        <div className="text-xs text-muted-foreground tracking-wider mb-4">
          {stereotype.period}
        </div>

        {/* Name */}
        <h3 className="font-serif text-3xl text-foreground mb-4 title-hollywood tracking-wider">
          {stereotype.name}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-6">
          {stereotype.description}
        </p>

        {/* Characteristics */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground tracking-wider uppercase mb-3">
            Caractéristiques imposées
          </p>
          <div className="flex flex-wrap gap-2">
            {stereotype.characteristics.map((char) => (
              <motion.span
                key={char}
                whileHover={{ scale: 1.05, backgroundColor: "oklch(0.45 0.2 25 / 0.2)" }}
                className="text-xs px-3 py-1.5 bg-muted text-muted-foreground rounded-sm border border-border/50 cursor-default transition-colors"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/30" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/30" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/30" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/30" />
      </div>
    </motion.div>
  );
}
