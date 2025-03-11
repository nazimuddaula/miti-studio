
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Services', href: '#services' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12 lg:px-24',
        scrolled
          ? 'py-4 glass shadow-sm border-b border-white/10'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <span className="text-xl font-display font-bold tracking-tight">MiTi Studio</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover-link transition-opacity duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={20} className="text-foreground" />
          ) : (
            <Menu size={20} className="text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'absolute top-full left-0 right-0 glass border-b border-white/10 shadow-md transition-all duration-300 ease-in-out overflow-hidden md:hidden',
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col p-6 space-y-4">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-medium py-2 hover-link"
              onClick={() => setIsOpen(false)}
              style={{ '--index': index } as React.CSSProperties}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
