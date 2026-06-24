import ScrollExperience from "@/components/ScrollExperience";
import Menu from "@/components/Menu";
import ChefRecommendations from "@/components/ChefRecommendations";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* 
        The ScrollExperience section takes up the hero and 
        provides the 3D cinematic Apple-style reveal.
      */}
      <ScrollExperience />

      {/* Floating 3D Menu Gallery */}
      <Menu />

      {/* Cinematic Showcase of Signature Dishes */}
      <ChefRecommendations />

      {/* Premium Footer with Location & Contact */}
      <Footer />
    </main>
  );
}
