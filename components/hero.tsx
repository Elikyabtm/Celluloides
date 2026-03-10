import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden film-grain"
    >
      {/* Background with parallax */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent"
      />

      {/* Film strip decorations */}
      <div className="absolute left-0 top-0 h-full w-12 opacity-20">
        <div className="h-full w-full bg-[repeating-linear-gradient(to_bottom,transparent,transparent_20px,oklch(0.3_0_0)_20px,oklch(0.3_0_0)_24px)]" />
      </div>
      <div className="absolute right-0 top-0 h-full w-12 opacity-20">
        <div className="h-full w-full bg-[repeating-linear-gradient(to_bottom,transparent,transparent_20px,oklch(0.3_0_0)_20px,oklch(0.3_0_0)_24px)]" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6"
        >
          Une archive numérique interactive
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif title-hollywood text-5xl md:text-7xl lg:text-8xl text-foreground mb-8 leading-tight"
        >
          <span className="block">Celluloïdes</span>
          <span className="block text-primary">Noires</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-serif text-xl md:text-2xl text-muted-foreground italic max-w-2xl mx-auto mb-4"
        >
          L'Héritage Éclaté
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          Explorer l'évolution de la représentation des femmes noires
          dans le cinéma hollywoodien, des stéréotypes racialisés
          aux figures contemporaines d'émancipation.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs tracking-[0.2em] uppercase">Défiler</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.06_0_0)_100%)]" />
    </section>
  );
}
