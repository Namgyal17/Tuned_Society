import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import brakesImg from '../assets/services/brakes.png';

const BrakingInfo: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const upgrades = [
        {
            title: "Performance Brake Pads",
            description: "High-friction compounds that provide stronger bite, better heat tolerance, and consistent braking performance."
        },
        {
            title: "Upgraded Brake Discs / Rotors",
            description: "Slotted and drilled rotors improve heat dissipation, reduce brake fade, and enhance braking response."
        },
        {
            title: "Big Brake Kits (BBK)",
            description: "Larger calipers and rotors designed for high-performance applications, offering superior stopping power and thermal stability."
        },
        {
            title: "Steel-Braided Brake Lines",
            description: "Reduce brake line expansion under pressure, resulting in firmer pedal feel and improved modulation."
        },
        {
            title: "High-Performance Brake Fluid",
            description: "Higher boiling-point fluids that maintain braking efficiency during aggressive driving and extended use."
        }
    ];



    return (
        <div className="pt-24 min-h-screen bg-bg-primary text-text-primary">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={brakesImg}
                        alt="Braking Systems"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/50"></div>
                </div>

                <div className="relative z-10 container-custom text-center">
                    <Link to="/" className="inline-block mb-6 text-accent-red hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                        ← Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-heading font-black italic uppercase text-white mb-6 drop-shadow-2xl">
                        Braking <span className="text-stroke-red text-transparent">Systems</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-light">
                        Control the power.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container-custom max-w-4xl">

                    {/* Intro */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">Safety. Confidence. Consistency.</h2>
                        <p className="text-text-secondary leading-relaxed text-lg mb-6">
                            Power is only as effective as the ability to control it. A well-engineered braking system is critical for safety, confidence, and consistent performance under all driving conditions.
                        </p>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            At Tuned Society, braking upgrades are designed to deliver reliable stopping power, improved pedal feel, and resistance to brake fade — whether for daily driving, spirited runs, or performance-focused builds.
                        </p>
                    </div>

                    <div className="w-full h-px bg-white/10 my-12"></div>

                    {/* Upgrades Grid */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-10 uppercase text-center">Braking Upgrades</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {upgrades.map((mod, index) => (
                                <div key={index} className="bg-bg-card border border-white/5 p-8 rounded-xl hover:border-accent-red/30 transition-all duration-300 group">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-red transition-colors">{mod.title}</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        {mod.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Focus Areas & Why Upgrade */}
                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div className="bg-bg-tertiary p-8 rounded-xl border border-white/5">
                            <h3 className="text-xl font-heading font-bold text-white mb-6 uppercase">Focus Areas</h3>
                            <ul className="space-y-4">
                                {['Caliper size and piston configuration', 'Rotor diameter and ventilation', 'Pad compound selection', 'Heat management and cooling', 'Proper brake bias and balance'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                                        <span className="text-accent-red font-bold">➤</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-bg-tertiary p-8 rounded-xl border border-white/5">
                            <h3 className="text-xl font-heading font-bold text-white mb-6 uppercase">Why Upgrade?</h3>
                            <ul className="space-y-4">
                                {['Shorter stopping distances', 'Improved pedal feel and consistency', 'Reduced brake fade under hard use', 'Better control during high-speed driving', 'Increased safety and confidence'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-text-secondary text-sm">
                                        <span className="text-accent-red font-bold">➤</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>



                    {/* Philosophy */}
                    <div className="bg-gradient-to-r from-bg-card to-bg-tertiary p-10 rounded-xl text-center border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent-red"></div>
                        <h2 className="text-xl font-heading font-bold text-white mb-4 uppercase">The Tuned Society Approach</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
                            Every braking upgrade is planned to match your vehicle’s performance level, tyre setup, and intended use. We prioritise balance, reliability, and real-world performance — not overkill.
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-bg-secondary text-center">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Stop With Confidence.</h2>
                    <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                        Upgrade your braking system for safety, performance, and peace of mind.
                    </p>
                    <button
                        onClick={() => (window as any).openConsultationModal && (window as any).openConsultationModal()}
                        className="btn btn-primary px-12 py-4 text-lg shadow-glow"
                    >
                        GET A BRAKE QUOTE
                    </button>
                </div>
            </section>
        </div>
    );
};

export default BrakingInfo;
