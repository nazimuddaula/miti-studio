
import React, { useEffect, useRef } from 'react';
import { Monitor, Smartphone, Palette, LayoutGrid, Pen, AreaChart } from 'lucide-react';

const services = [
  {
    icon: <Palette className="h-8 w-8" />,
    title: "Brand Strategy",
    description: "We define your brand's voice, values, and visual identity to create a cohesive and memorable presence."
  },
  {
    icon: <Monitor className="h-8 w-8" />,
    title: "Web Design",
    description: "Beautiful, functional websites that provide exceptional user experiences across all devices."
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "App Design",
    description: "Intuitive mobile applications that solve real problems and delight users."
  },
  {
    icon: <LayoutGrid className="h-8 w-8" />,
    title: "UI/UX Design",
    description: "User-centered design that balances aesthetics with functionality for seamless interactions."
  },
  {
    icon: <Pen className="h-8 w-8" />,
    title: "Content Creation",
    description: "Compelling visual and written content that tells your brand's story and resonates with your audience."
  },
  {
    icon: <AreaChart className="h-8 w-8" />,
    title: "Digital Marketing",
    description: "Strategic digital marketing campaigns that connect with your target audience and drive results."
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const serviceRefs = useRef<(HTMLElement | null)[]>([]);

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
    
    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      
      serviceRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !serviceRefs.current.includes(el)) {
      serviceRefs.current.push(el);
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-secondary/50"
    >
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in-section">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
            What We Do Best
          </h3>
          <p className="text-lg text-muted-foreground">
            We offer a comprehensive range of design services to help your brand stand out and connect with your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="p-8 rounded-xl bg-white border border-border group hover:shadow-lg transition-all duration-300 fade-in-section"
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              <div className="w-16 h-16 rounded-lg bg-primary/5 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{service.title}</h4>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
