
import React, { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    textRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      
      textRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding min-h-screen flex items-center"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <div className="fade-in-section" ref={addToRefs}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">About Us</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 leading-tight">
                We create meaningful connections through thoughtful design.
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2018, our studio has grown into a team of passionate designers, developers, and strategists who believe in the power of simplicity and user-focused design.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We approach each project with curiosity and dedication, taking the time to understand your brand's unique needs and challenges. Our process is collaborative, transparent, and focused on delivering exceptional results that exceed expectations.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="fade-in-section" ref={addToRefs} style={{ transitionDelay: '0.2s' }}>
                  <p className="text-4xl font-display font-bold mb-2">150+</p>
                  <p className="text-sm text-muted-foreground">Projects Completed</p>
                </div>
                <div className="fade-in-section" ref={addToRefs} style={{ transitionDelay: '0.3s' }}>
                  <p className="text-4xl font-display font-bold mb-2">12</p>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
                <div className="fade-in-section" ref={addToRefs} style={{ transitionDelay: '0.4s' }}>
                  <p className="text-4xl font-display font-bold mb-2">6+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
              
              <a href="#services" className="btn-primary">
                Our Services
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 fade-in-section" ref={addToRefs}>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Our design studio workspace" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 glass p-6 rounded-lg">
                <p className="text-lg font-medium mb-2">"Design is not just what it looks like and feels like. Design is how it works."</p>
                <p className="text-sm text-muted-foreground">— Steve Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
