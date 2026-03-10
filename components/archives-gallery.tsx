import { motion } from "framer-motion";
import { ArchiveCard } from "./archive-card";

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

interface ArchivesGalleryProps {
  actresses: Actress[];
}

export function ArchivesGallery({ actresses }: ArchivesGalleryProps) {
  return (
    <section id="archives" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">
            Les pionnières
          </p>
          <h2 className="font-serif title-hollywood text-3xl md:text-5xl text-foreground mb-6">
            Archives & Trajectoires
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Derrière les rôles imposés, des femmes ont lutté, résisté et ouvert la voie.
            Survolez pour révéler leurs paroles, cliquez pour découvrir leur héritage.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actresses.map((actress, index) => (
            <ArchiveCard key={actress.id} actress={actress} index={index} />
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground/60 text-sm italic max-w-lg mx-auto">
            "Le public connaît les visages. Il ignore les combats derrière les rôles."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
