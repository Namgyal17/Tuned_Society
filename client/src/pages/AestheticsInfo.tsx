import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import aestheticsImg from '../assets/services/aesthetics.png';

const AestheticsInfo: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const aestheticMods = [
        {
            title: "Body Kits & Visual Enhancements",
            description: "Front splitters, side skirts, rear diffusers, and spoilers designed to elevate the car’s stance and character."
        },
        {
            title: "Wraps & Paint Protection",
            description: "High-quality vinyl wraps and PPF solutions that protect original paint while allowing full visual customisation."
        },
        {
            title: "Lighting Upgrades",
            description: "LED, projector, and custom lighting solutions that improve visibility and enhance road presence."
        },
        {
            title: "Interior Enhancements",
            description: "Steering wheels, seats, trims, ambient lighting, and detailing that elevate the driving experience from inside."
        }
    ];

    const aeroMods = [
        {
            title: "Front Splitters",
            description: "Reduce front-end lift and improve stability at higher speeds."
        },
        {
            title: "Rear Diffusers",
            description: "Optimise airflow under the car, improving traction and rear-end stability."
        },
        {
            title: "Spoilers & Wings",
            description: "Designed to increase downforce and balance, not just visual aggression."
        },
        {
            title: "Underbody Panels",
            description: "Smooth airflow beneath the vehicle for improved efficiency and reduced drag."
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-bg-primary text-text-primary">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={aestheticsImg}
                        alt="Aesthetics & Aero"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/50"></div>
                </div>

                <div className="relative z-10 container-custom text-center">
                    <Link to="/" className="inline-block mb-6 text-accent-red hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                        ← Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-heading font-black italic uppercase text-white mb-6 drop-shadow-2xl">
                        Aesthetics <span className="text-stroke-red text-transparent">& Aero</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-light">
                        Presence defined. Purpose refined.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container-custom max-w-4xl">

                    {/* Intro */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">Balance & Intent</h2>
                        <p className="text-text-secondary leading-relaxed text-lg mb-6">
                            Aesthetics define presence. Aerodynamics define purpose. When done right, visual upgrades don’t just turn heads — they enhance stability, airflow, and driving confidence.
                        </p>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            At Tuned Society, aesthetics and aerodynamic modifications are approached with balance and intent. Every visual upgrade is chosen to complement the vehicle’s design while ensuring functionality, fitment, and real-world usability.
                        </p>
                    </div>

                    <div className="w-full h-px bg-white/10 my-12"></div>

                    {/* Aesthetic Mods Grid */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-10 uppercase text-center">Aesthetic Modifications</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {aestheticMods.map((mod, index) => (
                                <div key={index} className="bg-bg-card border border-white/5 p-8 rounded-xl hover:border-accent-red/30 transition-all duration-300 group">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-red transition-colors">{mod.title}</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        {mod.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Aero Mods Grid */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-10 uppercase text-center">Aerodynamic Upgrades</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {aeroMods.map((mod, index) => (
                                <div key={index} className="bg-bg-tertiary border border-white/5 p-8 rounded-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-red/5 rounded-full blur-[50px] translate-x-1/3 -translate-y-1/3"></div>
                                    <h3 className="text-xl font-bold text-white mb-3 relative z-10">{mod.title}</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm relative z-10">
                                        {mod.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Materials & Build Quality */}
                    <div className="bg-bg-card border-l-4 border-accent-red p-8 md:p-12 mb-16">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6 uppercase">Materials & Build Quality</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-text-secondary">
                            <div className="flex items-center gap-3">
                                <span className="text-accent-red text-xl">❖</span>
                                <div>
                                    <strong className="text-white block uppercase text-sm mb-1">Carbon Fibre</strong>
                                    For lightweight strength.
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-accent-red text-xl">❖</span>
                                <div>
                                    <strong className="text-white block uppercase text-sm mb-1">ABS & FRP</strong>
                                    For durability and precision fit.
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-accent-red text-xl">❖</span>
                                <div>
                                    <strong className="text-white block uppercase text-sm mb-1">Wind-Tested</strong>
                                    Designs for functional performance.
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-accent-red text-xl">❖</span>
                                <div>
                                    <strong className="text-white block uppercase text-sm mb-1">OEM+ Standards</strong>
                                    Fitment that matches factory quality.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Philosophy */}
                    <div className="bg-bg-tertiary p-10 rounded-xl text-center border border-white/5">
                        <h2 className="text-sm font-bold text-accent-red uppercase tracking-widest mb-4">The Tuned Society Philosophy</h2>
                        <p className="text-xl md:text-2xl text-white font-heading italic max-w-3xl mx-auto leading-relaxed">
                            "We believe aesthetics should never be an afterthought, and aerodynamics should never be fake."
                        </p>
                        <p className="text-text-secondary mt-6 max-w-2xl mx-auto">
                            Every modification is selected to suit the car, the driver, and the intended use — from daily-driven builds to performance-focused machines.
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-bg-secondary text-center">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Transform Your Look.</h2>
                    <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                        Ready to elevate your car's presence and performance?
                    </p>
                    <button
                        onClick={() => (window as any).openConsultationModal && (window as any).openConsultationModal()}
                        className="btn btn-primary px-12 py-4 text-lg shadow-glow"
                    >
                        GET A QUOTE
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AestheticsInfo;
