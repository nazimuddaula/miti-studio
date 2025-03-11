
import React, { useEffect, useRef } from 'react';

const team = [
  {
    name: "Sarah Johnson",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "With over 15 years of experience in design, Sarah leads our creative vision and ensures every project upholds our high standards."
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1556157382-97eda2f9671e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "David brings technical excellence and innovative solutions to every project, specializing in interactive experiences."
  },
  {
    name: "Maya Patel",
    role: "UX Strategist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "Maya translates complex user needs into elegant design solutions, with a focus on accessibility and inclusivity."
  },
  {
    name: "James Wilson",
    role: "Art Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    bio: "James brings a unique perspective to visual storytelling, with expertise in photography and illustration."
  }
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const teamRefs = useRef<(HTMLElement | null)[]>([]);

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
    
    teamRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      
      teamRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !teamRefs.current.includes(el)) {
      teamRefs.current.push(el);
    }
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="section-padding"
    >
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in-section">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Our Team</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
            The Talent Behind Our Work
          </h3>
          <p className="text-lg text-muted-foreground">
            Meet our diverse team of creative professionals who are passionate about design and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group fade-in-section"
              style={{ transitionDelay: `${0.1 * index}s` }}
            >
              <div className="relative mb-6 overflow-hidden rounded-xl aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <p className="text-white/90 text-sm">{member.bio}</p>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-1">{member.name}</h4>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
