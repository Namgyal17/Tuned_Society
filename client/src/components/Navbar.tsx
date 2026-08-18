import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // "About"/"Services"/"Consultation" are sections on the landing page, so
    // they only make sense to scroll to once we're actually on it — from any
    // other route (e.g. Privacy Policy) we navigate home first, then scroll.
    const scrollToSection = (id: string) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'py-6 bg-transparent'}`}>
            <div className="container-custom flex justify-between items-center">
                <a href="#" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <img src={logo} alt="Tuned Society" className="w-12 h-12 rounded-full object-cover border-2 border-accent-red/20 group-hover:border-accent-red group-hover:shadow-glow transition-all duration-300" />
                    <div className="flex flex-col">
                        <span className="font-heading font-bold text-xl tracking-wider text-white">TUNED SOCIETY</span>
                        <span className="text-[10px] text-text-muted tracking-[0.2em] font-medium group-hover:text-accent-red transition-colors">EST. 2025</span>
                    </div>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {['About', 'Services', 'Consultation'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="font-heading font-semibold text-sm uppercase tracking-wider text-text-secondary hover:text-white hover:text-accent-red transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-accent-red after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {item}
                        </button>
                    ))}
                    <Link
                        to="/privacy-policy"
                        className="font-heading font-semibold text-sm uppercase tracking-wider text-text-secondary hover:text-white hover:text-accent-red transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-accent-red after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Privacy
                    </Link>
                    <button
                        onClick={() => (window as any).openConsultationModal && (window as any).openConsultationModal()}
                        className="btn btn-primary px-6 py-2 text-sm"
                    >
                        Start Build
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-bg-primary border-b border-white/10 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 py-6' : 'max-h-0 py-0'}`}>
                <div className="flex flex-col items-center gap-6">
                    {['About', 'Services', 'Consultation'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="font-heading font-bold text-lg uppercase tracking-wider text-white"
                        >
                            {item}
                        </button>
                    ))}
                    <Link
                        to="/privacy-policy"
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-heading font-bold text-lg uppercase tracking-wider text-white"
                    >
                        Privacy
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
