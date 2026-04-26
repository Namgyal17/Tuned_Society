import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import suspensionImg from '../assets/services/suspension.jpg';

const SuspensionInfo: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const solutions = [
        {
            title: "Coilover Systems",
            description: "Height-adjustable performance suspension offering the perfect balance between comfort, control, and stance."
        },
        {
            title: "Air Suspension",
            description: "Fully adjustable air setups for drivers who want flexibility—slam it when parked, raise it for real-world roads."
        },
        {
            title: "Lowering Springs",
            description: "A clean, cost-effective way to enhance stance and handling while retaining near-stock comfort."
        },
        {
            title: "Performance Shocks & Dampers",
            description: "Upgraded dampers that improve ride quality, reduce body roll, and enhance overall road feedback."
        },
        {
            title: "Sway Bars & Chassis Bracing",
            description: "Improves cornering stability and steering response by reducing flex and body movement."
        },
        {
            title: "Custom Suspension Tuning",
            description: "Ride height, preload, rebound, and damping tuned to your driving style and Indian road conditions."
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-bg-primary text-text-primary">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={suspensionImg}
                        alt="Suspension & Handling"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/50"></div>
                </div>

                <div className="relative z-10 container-custom text-center">
                    <Link to="/" className="inline-block mb-6 text-accent-red hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-7xl font-heading font-black italic uppercase text-white mb-8 leading-tight drop-shadow-2xl">
                        SUSPENSION <span className="text-accent-red animate-pulse-slow">& HANDLING</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-light">
                        Where comfort meets control.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container-custom max-w-4xl">

                    {/* Intro */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">Redefining How Your Car Feels</h2>
                        <p className="text-text-secondary leading-relaxed text-lg mb-6">
                            Suspension is where comfort meets control. It defines how your car feels on the road—how confidently it corners, how smoothly it rides, and how connected you feel behind the wheel.
                        </p>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            At Tuned Society, we focus on suspension upgrades that don’t just lower your car, but genuinely improve stability, grip, and driving confidence. Whether it’s a daily driver, a weekend build, or a performance-focused machine, the right suspension setup changes everything.
                        </p>
                    </div>

                    <div className="w-full h-px bg-white/10 my-12"></div>

                    {/* Solutions Grid */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-10 uppercase text-center">Suspension Solutions We Support</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {solutions.map((solution, index) => (
                                <div key={index} className="bg-bg-card border border-white/5 p-8 rounded-xl hover:border-accent-red/30 transition-all duration-300 group">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-red transition-colors">{solution.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        {solution.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-px bg-white/10 my-12"></div>

                    {/* Visual/Feature Block */}
                    <div className="bg-bg-tertiary border border-white/5 p-10 rounded-xl relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-red to-transparent"></div>
                        <h3 className="text-2xl font-bold text-white uppercase mb-4">Precision Setup</h3>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            We don't just bolt parts on. We align, corner balance, and damp-adjust every setup to ensure it performs exactly as intended for your specific use case.
                        </p>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-bg-secondary text-center">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Drop It. Tune It. Drive It.</h2>
                    <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                        Get the perfect stance and handling setup for your build.
                    </p>
                    <button
                        onClick={() => (window as any).openConsultationModal && (window as any).openConsultationModal()}
                        className="btn btn-primary px-12 py-4 text-lg shadow-glow"
                    >
                        GET A SUSPENSION QUOTE
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SuspensionInfo;
