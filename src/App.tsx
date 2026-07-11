import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import DomeGallerySection from "./components/DomeGallerySection";
import VideoRow from "./components/VideoRow";
import Apps from "./components/Apps";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black">
      <Hero />
      <About />
      <Features />
      <DomeGallerySection />
      <VideoRow />
      <Apps />
      <Contact />
    </div>
  );
}
