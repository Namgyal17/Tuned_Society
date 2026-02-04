import React from 'react';
import garageBg from '../assets/garage-bg.jpg';

const Consultation: React.FC = () => {
    // Placeholder partners for the ticker
    const partners = [
        "WHEELERZ HUB", "BOOST NATION", "CARBONIZE", "ZEROSPOT"
    ];

    return (
        <section id="consultation" className="relative bg-black min-h-[90vh] flex flex-col pt-32 pb-0 overflow-hidden">
            {/* Background Image Container */}
            <div className="absolute top-0 left-0 w-full h-[75%] z-0">
                <img
                    src={garageBg}
                    alt="Garage Background"
                    className="w-full h-full object-cover object-[50%_75%] opacity-40"
                />
                {/* Gradient: Top fade (blend with previous section) */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent"></div>

                {/* Gradient: Bottom fade (image to black) */}
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-black"></div>

                {/* Side Gradients for vignette effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
            </div>

            {/* Main Content */}
            <div className="container-custom relative z-10 text-center flex-grow flex flex-col justify-center items-center mb-12">
                <h2 className="text-4xl md:text-7xl font-heading font-black italic uppercase text-white mb-8 leading-tight drop-shadow-2xl">
                    Stop <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 opacity-50">Guessing.</span><br />
                    Start <span className="text-accent-red animate-pulse-slow">Building.</span>
                </h2>

                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
                    Your dream build is one consultation away. We'll help you plan the roadmap, select the parts, and find the right people to execute it.
                </p>

                <button
                    onClick={() => (window as any).openConsultationModal && (window as any).openConsultationModal()}
                    className="btn btn-primary px-12 py-5 text-lg shadow-glow hover:scale-105 transition-transform duration-300"
                >
                    TALK TO AN EXPERT
                </button>
            </div>

            {/* Bottom Ticker Section */}
            <div className="relative z-20 bg-black/50 backdrop-blur-sm py-8 mt-auto">


                <p className="text-center text-xs font-heading uppercase tracking-[0.2em] text-text-muted mb-6">Trusted By India's Best</p>

                <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll">
                        {partners.map((partner, index) => (
                            <li key={index}>
                                <span className="text-xl md:text-2xl font-display font-bold text-white/30 whitespace-nowrap uppercase tracking-widest hover:text-white/80 hover:shadow-glow transition-all duration-300 cursor-default select-none">
                                    {partner}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll" aria-hidden="true">
                        {partners.map((partner, index) => (
                            <li key={`clone-${index}`}>
                                <span className="text-xl md:text-2xl font-display font-bold text-white/30 whitespace-nowrap uppercase tracking-widest hover:text-white/80 hover:shadow-glow transition-all duration-300 cursor-default select-none">
                                    {partner}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Consultation;
