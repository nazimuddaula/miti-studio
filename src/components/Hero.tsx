
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/30 -z-10"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center max-w-5xl">
        <div className="mb-6 overflow-hidden">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 fade-in-section tracking-tight reveal"
          >
            Creating refined digital experiences for discerning brands
          </h1>
        </div>
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 fade-in-section text-balance"
          style={{ transitionDelay: '0.2s' }}
        >
          We blend strategy, design, and technology to craft memorable digital solutions that elevate your brand.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12 fade-in-section" style={{ transitionDelay: '0.4s' }}>
          <a href="#portfolio" className="btn-primary">
            View Our Work
          </a>
          <a href="#contact" className="btn-outline">
            Get In Touch
          </a>
        </div>
      </div>

      <button 
        onClick={scrollToNext} 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center border border-border animate-pulse-subtle transition-transform hover:translate-y-1"
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
};

export default Hero;
