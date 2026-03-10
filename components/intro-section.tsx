"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-32 px-6 relative overflow-hidden"
    >
      {/* Diagonal lines background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_100px,oklch(0.72_0.12_85)_100px,oklch(0.72_0.12_85)_101px)]" />
      </div>

      <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto text-center relative z-10">
        {/* Decorative quote marks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 text-primary/20 font-serif text-[120px] leading-none select-none"
        >
          "
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-2xl md:text-4xl text-foreground leading-relaxed mb-8 italic"
        >
          L'histoire hollywoodienne a longtemps enfermé les femmes noires dans des archétypes : 
          <span className="text-primary"> Mammy</span>, 
          <span className="text-destructive"> Jézabel</span>, 
          <span className="text-muted-foreground"> Saphir</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto"
        >
          Ce projet interroge le pouvoir des images : ce qui est montré façonne ce qui est perçu comme possible.
          Les archives ne sont pas présentées comme un simple patrimoine, mais comme une matière à déconstruire.
        </motion.p>

        {/* Visual element: fissure */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute left-1/2 -bottom-20 w-px h-40 origin-top"
          style={{
            background: "linear-gradient(to bottom, oklch(0.72 0.12 85), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
