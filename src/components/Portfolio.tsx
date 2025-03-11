
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: "Minimal Brand Identity",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    description: "Clean, sophisticated brand identity for a luxury wellness company."
  },
  {
    id: 2,
    title: "E-commerce Redesign",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "Complete UX/UI overhaul for a premium home goods retailer."
  },
  {
    id: 3,
    title: "Financial App Interface",
    category: "App Design",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    description: "Intuitive mobile banking application with focus on security and ease of use."
  },
  {
    id: 4,
    title: "Architectural Visualization",
    category: "3D Rendering",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    description: "Photorealistic renderings for a contemporary residential development."
  },
  {
    id: 5,
    title: "Travel Platform",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "Modern booking experience for a luxury travel company."
  },
  {
    id: 6,
    title: "Smart Home App",
    category: "App Design",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    description: "Connected home control system with advanced automation features."
  }
];

type Category = 'All' | 'Branding' | 'Web Design' | 'App Design' | '3D Rendering';

const Portfolio = () => {
  const [category, setCategory] = useState<Category>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const filteredItems = category === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === category);

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
    
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    // Reset refs when category changes
    itemRefs.current = [];
  }, [category]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-padding"
    >
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 fade-in-section">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Our Work</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Selected Projects
          </h3>
          <p className="text-lg text-muted-foreground">
            A curated selection of our recent work across various industries and disciplines.
          </p>
        </div>

        <div className="flex justify-center mb-12 overflow-x-auto pb-4 fade-in-section">
          <div className="flex space-x-2">
            {(['All', 'Branding', 'Web Design', 'App Design', '3D Rendering'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={addToRefs}
              className="portfolio-item group rounded-xl overflow-hidden fade-in-section"
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-12 h-12 rounded-full glass-dark flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6 bg-white border border-border rounded-b-xl">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">
                    {item.category}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
