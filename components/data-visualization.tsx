import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PortraitTimeline } from "./editorial-dataviz/portrait-timeline";
import { StudioDotPlot } from "./editorial-dataviz/studio-dot-plot";
import { PictogramChart } from "./editorial-dataviz/pictogram-chart";
import { RolesEvolution } from "./editorial-dataviz/roles-evolution";
import { WaitingYears } from "./editorial-dataviz/waiting-years";

interface Actress {
  id: string;
  name: string;
  birth: number;
  death: number | null;
  milestone: string;
  stereotype: string | null;
}

interface Decade {
  period: string;
  statistics: {
    roles_principaux: number;
    roles_domestiques: number;
    nominations_oscars: number;
  };
}

interface DataVisualizationProps {
  decades: Decade[];
  actresses?: Actress[];
}

export function DataVisualization({ decades, actresses = [] }: DataVisualizationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="data" className="relative overflow-hidden" ref={ref}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(oklch(0.5_0_0)_1px,transparent_1px),linear-gradient(90deg,oklch(0.5_0_0)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Section header */}
      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
              Les Chiffres Révèlent
            </p>
            <h2 className="font-serif title-hollywood text-3xl md:text-5xl text-foreground mb-6">
              Visualiser l'Invisible
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Au-delà des récits, les données racontent leur propre histoire. 
              Ces visualisations révèlent les schémas systémiques de la représentation 
              des femmes noires à Hollywood.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Editorial Data Visualizations */}
      <div className="relative z-10 divide-y divide-border/30">
        {/* 1. Pictogram - Representation overview */}
        <PictogramChart />

        {/* 2. Portrait Timeline - Oscars milestones */}
        <PortraitTimeline actresses={actresses} />

        {/* 3. Roles Evolution - Stacked bar chart */}
        <RolesEvolution />

        {/* 4. Waiting Years - Time between milestones */}
        <WaitingYears />

        {/* 5. Studio Dot Plot - Studio comparison */}
        <StudioDotPlot />
      </div>

      {/* Final insight section */}
      <div className="py-24 px-6 bg-gradient-to-b from-transparent to-card/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <blockquote className="font-serif text-2xl md:text-3xl text-foreground mb-8 leading-relaxed">
              "Les chiffres ne mentent pas, mais ils ne disent pas tout. 
              Derrière chaque statistique, il y a des femmes qui ont refusé 
              d'être réduites à un pourcentage."
            </blockquote>
            <p className="text-muted-foreground text-sm">
              — Analyse des données 1930-2024
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
