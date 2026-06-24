"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

export default function ScrollExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const frameCount = 271;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    // Set canvas dimensions
    canvas.width = 1920;
    canvas.height = 1080;

    const currentFrame = (index: number) => 
      `/images/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (i === 0) render();
      };
      images.push(img);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=6000",
        scrub: 0.5,
        pin: true,
      }
    });

    // Animate frames
    tl.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
      duration: 10
    }, 0);

    // Text Animations along the timeline
    // Hero Text Fade Out
    tl.to(".hero-text", { opacity: 0, y: -50, duration: 1 }, 0.5);

    // Scene 3 Text: Fresh Ingredients
    tl.fromTo(".text-fresh", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 3);
    tl.to(".text-fresh", { opacity: 0, y: -50, duration: 1 }, 5);

    // Scene 3 Text: Premium Quality
    tl.fromTo(".text-quality", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 5.5);
    tl.to(".text-quality", { opacity: 0, y: -50, duration: 1 }, 7.5);

    // Scene 3 Text: Authentic Taste
    tl.fromTo(".text-taste", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 8);
    tl.to(".text-taste", { opacity: 0, y: -50, duration: 1 }, 9.5);


    function render() {
      if (!canvas || !context || !images[airpods.frame]) return;
      
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.objectFit = "cover";

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height);
    }

    const handleResize = () => render();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      {imagesLoaded < frameCount && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="text-gold text-2xl mb-4 font-light tracking-widest">PREPARING EXPERIENCE</div>
          <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${(imagesLoaded / frameCount) * 100}%` }}
            />
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="block w-full h-full object-cover" />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
        
        {/* Hero Text */}
        <div className="hero-text absolute top-1/4 text-center w-full px-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            MOKARRMAL
          </h1>
          <p className="text-xl md:text-3xl text-gold font-light tracking-wide mb-12">
            Crafted for Flavor. Built for Experience.
          </p>
        </div>
        
        {/* Scroll Indicator */}
        <div className="hero-text absolute bottom-12 flex flex-col items-center text-gold/70 animate-bounce">
          <span className="text-sm tracking-widest mb-2 uppercase">Explore the Menu</span>
          <ChevronDown size={24} />
        </div>

        {/* Floating Texts during explosion */}
        <div className="text-fresh absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 opacity-0 text-left">
          <h2 className="text-5xl font-bold text-white mb-2">Fresh Ingredients</h2>
          <div className="h-1 w-12 bg-gold"></div>
        </div>

        <div className="text-quality absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 opacity-0 text-right">
          <h2 className="text-5xl font-bold text-white mb-2">Premium Quality</h2>
          <div className="h-1 w-12 bg-gold ml-auto"></div>
        </div>

        <div className="text-taste absolute bottom-1/4 text-center opacity-0">
          <h2 className="text-5xl font-bold text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">Authentic Taste</h2>
        </div>

      </div>
    </div>
  );
}
