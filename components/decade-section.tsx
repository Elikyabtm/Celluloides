"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Decade {
  period: string;
  title: string;
  description: string;
  context: string;
  statistics: {
    roles_principaux: number;
    roles_domestiques: number;
    nominations_oscars: number;
  };
}

interface DecadeSectionProps {
  decades: Decade[];
}

export function DecadeSection({ decades }: DecadeSectionProps) {
  return (
    <section className="relative">
      {decades.map((decade, index) => (
        <DecadePanel key={decade.period} decade={decade} index={index} isLast={index === decades.length - 1} />
      ))}
    </section>
  );
}

function DecadePanel({
  decade,
  index,
  isLast,
}: {
  decade: Decade;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  // Calculate progress bar widths
  const maxRoles = 100;
  const principauxWidth = (decade.statistics.roles_principaux / maxRoles) * 100;
  const domestiquesWidth = (decade.statistics.roles_domestiques / maxRoles) * 100;

  return (
    <div
      ref={ref}
      className={`min-h-screen flex items-center justify-center py-32 px-6 relative ${
        !isLast ? "border-b border-border/30" : ""
      }`}
    >
      {/* Background period indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-serif text-[20vw] text-border/10 select-none whitespace-nowrap">
          {decade.period.split("-")[0]}
        </span>
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Period badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 text-primary text-sm tracking-wider">
            {decade.period}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif title-hollywood text-4xl md:text-6xl text-foreground mb-6"
        >
          {decade.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-foreground/90 leading-relaxed mb-8 max-w-2xl"
        >
          {decade.description}
        </motion.p>

        {/* Context */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground leading-relaxed mb-12"
        >
          <span className="text-primary">Contexte : </span>
          {decade.context}
        </motion.p>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Rôles principaux */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rôles principaux</span>
              <span className="text-primary font-medium">{decade.statistics.roles_principaux}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${principauxWidth}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>

          {/* Rôles domestiques */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rôles domestiques</span>
              <span className="text-destructive font-medium">{decade.statistics.roles_domestiques}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${domestiquesWidth}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="h-full bg-destructive rounded-full"
              />
            </div>
          </div>

          {/* Nominations Oscars */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Nominations Oscars</span>
              <span className="text-accent font-medium">{decade.statistics.nominations_oscars}</span>
            </div>
            <div className="flex gap-1">
              {[...Array(Math.min(decade.statistics.nominations_oscars, 20))].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                  className="w-3 h-3 rounded-full bg-accent/80"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll progress indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
