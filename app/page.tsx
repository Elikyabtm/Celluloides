import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { IntroSection } from "@/components/intro-section";
import { StereotypeSection } from "@/components/stereotype-section";
import { DecadeSection } from "@/components/decade-section";
import { Timeline } from "@/components/timeline";
import { ArchivesGallery } from "@/components/archives-gallery";
import { DataVisualization } from "@/components/data-visualization";
import { Footer } from "@/components/footer";
import archivesData from "@/data/archives.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Introduction */}
      <IntroSection />

      {/* Stereotypes Deconstruction */}
      <StereotypeSection stereotypes={archivesData.stereotypes} />

      {/* Decades Scrollytelling */}
      <DecadeSection decades={archivesData.decades} />

      {/* Timeline */}
      <Timeline events={archivesData.timeline_events} />

      {/* Archives Gallery */}
      <ArchivesGallery actresses={archivesData.actresses} />

      {/* Data Visualization */}
      <DataVisualization decades={archivesData.decades} actresses={archivesData.actresses} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
