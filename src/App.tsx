import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Deliverables from "./components/Deliverables";
import Courses from "./components/Courses";
import SceneWall from "./components/SceneWall";
import VideoRow from "./components/VideoRow";
import Apps from "./components/Apps";
import Mentorship from "./components/Mentorship";
import Contact from "./components/Contact";

// 只在接近视口时才下载 DomeGallery(use-gesture ~30KB)
const DomeGallerySection = lazy(() => import("./components/DomeGallerySection"));

export default function App() {
  const [showGallery, setShowGallery] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShowGallery(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black">
      <Hero />
      <About />
      <Deliverables />
      <Courses />
      <SceneWall />
      <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />
      {showGallery && (
        <Suspense fallback={null}>
          <DomeGallerySection />
        </Suspense>
      )}
      <Apps />
      <VideoRow />
      <Mentorship />
      <Contact />
    </div>
  );
}
