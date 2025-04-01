
import React from 'react';
import { Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-2 px-6 border-t border-border text-white/50 text-[9px] md:text-xs">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          <span>Copyright © {currentYear} AirPlay</span>
          <span>|</span>
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-foreground">Terms of Services</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white/50 hover:text-foreground">
            <Twitter size={12} />
          </a>
          <a href="#" className="text-white/50 hover:text-foreground">
            <Linkedin size={12} />
          </a>
          <a href="#" className="text-white/50 hover:text-foreground">
            <Instagram size={12} />
          </a>
          <a href="#" className="text-white/50 hover:text-foreground">
            <Facebook size={12} />
          </a>
        </div>
        
        <div className="hidden md:block">
          <span>Supported by AirPlay</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
