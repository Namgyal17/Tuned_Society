import React from 'react';
import heroBg from '../assets/hero-bg.jpg';

const Hero: React.FC = () => {
    const scrollToAbout = () => {
        const element = document.getElementById('about');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Tuned Car"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-transparent to-bg-primary"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/50 via-transparent to-bg-primary/50"></div>
            </div>

            <div className="container-custom relative z-10 text-center animate-fade-in-up">
                <div className="inline-block px-4 py-1 mb-6 border border-accent-red/30 rounded-full bg-accent-red/10 backdrop-blur-sm">
                    <span className="font-heading font-semibold tracking-widest text accent-red text-sm uppercase text-accent-red">Welcome to the Club</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black italic tracking-tighter text-white mb-6 drop-shadow-lg pr-4">
                    TUNED <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red to-accent-red-dark">SOCIETY</span>
                </h1>

                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
                    India's premier automotive consulting platform. Whether you're building a track weapon, a stance show-stopper, or the perfect daily driver <span className="text-white font-semibold">we engineer your dream.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        onClick={() => (window as any).openConsultationModal && (window as any).openConsultationModal()}
                        className="btn btn-primary min-w-[180px]"
                    >
                        Start Your Build
                    </button>
                    <button
                        onClick={scrollToAbout}
                        className="btn btn-secondary min-w-[180px]"
                    >
                        Learn More
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
