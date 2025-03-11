
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Add intersection observer for fade-in elements
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    fadeElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      fadeElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Set page title for MiTi Studio
  useEffect(() => {
    document.title = "MiTi Studio | Creative Design Agency";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
