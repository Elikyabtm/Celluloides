"use client";

import { motion } from "framer-motion";
import { Film, ExternalLink } from "lucide-react";

const references = [
  { name: "The Pudding", url: "https://pudding.cool" },
  { name: "The HTML Review", url: "https://thehtml.review" },
  { name: "Sisters in Cinema", url: "https://www.sistersincinema.com" },
];

export function Footer() {
  return (
    <footer className="relative py-24 px-6 border-t border-border/30">
      {/* Film grain overlay */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main content */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Film className="w-5 h-5 text-primary" />
              <span className="font-serif text-lg tracking-wider">
                Celluloïdes <span className="text-primary">Noires</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Une archive numérique interactive explorant l'évolution de la représentation 
              des femmes noires dans le cinéma hollywoodien.
            </p>
          </motion.div>

          {/* References */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm text-foreground tracking-wider uppercase mb-4">
              Références
            </h4>
            <ul className="space-y-3">
              {references.map((ref) => (
                <li key={ref.name}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    {ref.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm text-foreground tracking-wider uppercase mb-4">
              À propos
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Projet conçu pour Sisters in Cinema, organisation dédiée à la célébration 
              et au développement des femmes noires réalisatrices.
            </p>
            <p className="text-muted-foreground/60 text-xs">
              Direction artistique : salle obscure, grain argentique, typographies contrastées.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Celluloïdes Noires. Tous droits réservés.
          </p>
          <p className="italic">
            "Le public connaît les visages. Il ignore les combats derrière les rôles."
          </p>
        </div>
      </div>

      {/* Decorative film strip */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,oklch(0.15_0_0)_20px,oklch(0.15_0_0)_24px)]" />
    </footer>
  );
}
