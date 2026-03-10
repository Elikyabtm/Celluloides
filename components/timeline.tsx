"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Film, Users } from "lucide-react";

interface TimelineEvent {
  year: number;
  event: string;
  type: "milestone" | "context" | "cinema";
}

interface TimelineProps {
  events: TimelineEvent[];
}

const typeConfig = {
  milestone: {
    icon: Star,
    color: "text-primary",
    bg: "bg-primary/20",
    border: "border-primary/50",
  },
  context: {
    icon: Users,
    color: "text-muted-foreground",
    bg: "bg-muted",
    border: "border-border",
  },
  cinema: {
    icon: Film,
    color: "text-destructive",
    bg: "bg-destructive/20",
    border: "border-destructive/50",
  },
};

export function Timeline({ events }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif title-hollywood text-3xl md:text-4xl text-foreground mb-4">
            Chronologie
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Les moments clés qui ont façonné la représentation des femmes noires à Hollywood
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Progress line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-primary to-transparent"
            />
          </div>

          {/* Events */}
          <div className="space-y-16">
            {events.map((event, index) => {
              const config = typeConfig[event.type];
              const Icon = config.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${event.year}-${index}`}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}>
                    <span className="text-4xl font-serif text-primary/50">
                      {event.year}
                    </span>
                    <p className="text-foreground mt-2 leading-relaxed">
                      {event.event}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-10 h-10 rounded-full ${config.bg} ${config.border} border flex items-center justify-center`}
                    >
                      <Icon className={`w-4 h-4 ${config.color}`} />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 mt-16 text-sm"
        >
          {Object.entries(typeConfig).map(([key, config]) => {
            const Icon = config.icon;
            const labels: Record<string, string> = {
              milestone: "Accomplissements",
              context: "Contexte social",
              cinema: "Événements cinéma",
            };
            return (
              <div key={key} className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${config.color}`} />
                <span className="text-muted-foreground">{labels[key]}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
