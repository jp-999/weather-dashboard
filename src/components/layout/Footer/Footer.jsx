import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background-dark/70 border-t border-white/10 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Meteora Weather Dashboard
            </p>
            <p className="text-white/30 text-xs">
              Mock data for demonstration purposes only
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 