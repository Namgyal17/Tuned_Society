import React from 'react';
import logo from '../assets/logo.jpg';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            <img src={logo} alt="TS" className="w-10 h-10 rounded-full" />
                            <h3 className="text-2xl font-heading font-bold text-white">TUNED SOCIETY</h3>
                        </div>
                        <p className="text-text-muted text-sm tracking-wider uppercase">Built for Enthusiasts. Driven by Passion.</p>
                    </div>

                    <div className="flex gap-8">
                        {['About', 'Services', 'Consultation'].map(link => (
                            <a key={link} href={`#${link.toLowerCase()}`} className="text-text-secondary hover:text-white transition-colors text-sm uppercase font-medium">
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="text-right">
                        <p className="text-text-muted text-xs">
                            &copy; {new Date().getFullYear()} Tuned Society. <br />All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
