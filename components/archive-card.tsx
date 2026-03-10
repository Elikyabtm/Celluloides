"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, Calendar, Film } from "lucide-react";

interface Actress {
  id: string;
  name: string;
  birth: number;
  death: number | null;
  milestone: string;
  quote: string;
  context: string;
  films: string[];
  legacy: string;
}

interface ArchiveCardProps {
  actress: Actress;
  index: number;
}

export function ArchiveCard({ actress, index }: ArchiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden bg-card border border-border/50 transition-all duration-500 ${
          isRevealed ? "fissure" : ""
        }`}
      >
        {/* Film strip header */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-muted/50 flex items-center px-3 gap-2 z-10">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-border" />
            ))}
          </div>
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-[10px] text-muted-foreground tracking-wider">
            {actress.birth} — {actress.death || "présent"}
          </span>
        </div>

        {/* Image placeholder with grain effect */}
        <div className="relative aspect-[3/4] mt-6 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br from-muted to-muted/50 transition-all duration-700 ${
              isHovered ? "grayscale-0 brightness-110" : "grayscale brightness-75"
            }`}
          >
            {/* Placeholder pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Film className="w-12 h-12 text-border mx-auto mb-2" />
                <span className="text-xs text-muted-foreground">Archive Photo</span>
              </div>
            </div>
          </div>

          {/* Fragmentation overlay on reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isRevealed ? 1 : 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,oklch(0.45_0.2_25/0.3)_49%,oklch(0.45_0.2_25/0.3)_51%,transparent_52%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,oklch(0.45_0.2_25/0.2)_49%,oklch(0.45_0.2_25/0.2)_51%,transparent_52%)]" />
          </motion.div>

          {/* Hover quote reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-background/90 flex items-center justify-center p-6"
          >
            <div className="text-center">
              <Quote className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="font-serif italic text-foreground leading-relaxed">
                "{actress.quote}"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-2xl text-foreground mb-2 title-hollywood text-sm tracking-widest">
            {actress.name}
          </h3>

          <p className="text-primary text-sm font-medium mb-4">
            {actress.milestone}
          </p>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {actress.context}
          </p>

          {/* Films */}
          <div className="flex flex-wrap gap-2 mb-4">
            {actress.films.slice(0, 2).map((film) => (
              <span
                key={film}
                className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
              >
                {film}
              </span>
            ))}
          </div>

          {/* Reveal button */}
          <button
            onClick={() => setIsRevealed(!isRevealed)}
            className="text-xs text-primary hover:text-primary/80 transition-colors tracking-wider uppercase flex items-center gap-2"
          >
            <span>{isRevealed ? "Masquer" : "Révéler"} l'héritage</span>
            <motion.span
              animate={{ rotate: isRevealed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ↓
            </motion.span>
          </button>

          {/* Legacy reveal */}
          <motion.div
            initial={false}
            animate={{
              height: isRevealed ? "auto" : 0,
              opacity: isRevealed ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border">
              <p className="text-sm text-foreground/80 leading-relaxed italic">
                {actress.legacy}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-primary/30" />
    </motion.div>
  );
}
