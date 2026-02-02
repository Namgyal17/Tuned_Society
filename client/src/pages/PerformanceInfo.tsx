import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import garageBg from '../assets/garage-bg.jpg';

const PerformanceInfo: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 min-h-screen bg-bg-primary text-text-primary">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={garageBg}
                        alt="Performance Tuning"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/50"></div>
                </div>

                <div className="relative z-10 container-custom text-center">
                    <Link to="/" className="inline-block mb-6 text-accent-red hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                        ← Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-heading font-black italic uppercase text-white mb-6 drop-shadow-2xl">
                        Performance <span className="text-stroke-red text-transparent">Tuning</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-light">
                        Unlock your engine's true potential through precision calibration.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container-custom max-w-4xl">

                    {/* Intro */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">Optimising Engine Performance Through Precision Calibration</h2>
                        <p className="text-text-secondary leading-relaxed text-lg mb-6">
                            Performance tuning involves optimizing a vehicle’s engine management system to improve power delivery, efficiency, and drivability. Modern vehicles are controlled by an Engine Control Unit (ECU), which manages fuel injection, ignition timing, boost pressure, and other critical parameters.
                        </p>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            Manufacturers program the ECU conservatively to account for varying fuel quality, climate conditions, and long-term reliability. Performance tuning carefully refines these parameters to unlock the engine’s true potential while maintaining safety and reliability.
                        </p>
                    </div>

                    <div className="w-full h-px bg-white/10 my-12"></div>

                    {/* ECU Remapping */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-2 uppercase">ECU Remapping</h2>
                        <h3 className="text-accent-red font-display text-xl mb-6">Software-Based Performance Enhancement</h3>

                        <p className="text-text-secondary leading-relaxed text-lg mb-8">
                            ECU remapping is the process of recalibrating the factory engine software to improve performance and responsiveness.
                        </p>

                        <div className="bg-bg-card border border-white/5 p-8 rounded-xl">
                            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Key characteristics:</h4>
                            <ul className="space-y-3">
                                {['No mechanical changes required (Stage 1)', 'Optimised fuel and ignition maps', 'Improved throttle response and torque delivery', 'Fully reversible if required'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                                        <span className="text-accent-red mt-1">▹</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="text-text-secondary mt-6 italic">
                            This is the most common and reliable method of performance tuning for road vehicles.
                        </p>
                    </div>

                    <div className="w-full h-px bg-white/10 my-12"></div>

                    {/* Tuning Stages */}
                    <div className="mb-16">
                        <h2 className="text-4xl font-heading font-black text-white mb-12 text-center uppercase">Tuning Stages Explained</h2>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Stage 1 */}
                            <div className="bg-bg-card border border-white/5 p-8 rounded-xl hover:border-accent-red/30 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white uppercase">Stage 1</h3>
                                    <span className="px-3 py-1 bg-accent-red/10 text-accent-red text-xs font-bold rounded uppercase">Stock</span>
                                </div>
                                <p className="text-text-muted mb-6 text-sm uppercase tracking-wider">For Completely Stock Vehicles</p>

                                <p className="text-text-secondary mb-6">Stage 1 tuning is designed for vehicles with no hardware modifications.</p>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-white text-sm font-bold uppercase mb-2">Includes:</h4>
                                        <ul className="text-sm text-text-secondary space-y-1">
                                            <li>• ECU software optimisation only</li>
                                            <li>• Retains all factory components</li>
                                            <li>• Safe for daily use</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-bold uppercase mb-2">Benefits:</h4>
                                        <ul className="text-sm text-text-secondary space-y-1">
                                            <li>• Increased horsepower and torque</li>
                                            <li>• Smoother power delivery</li>
                                            <li>• Enhanced driving experience without compromising reliability</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Stage 2 */}
                            <div className="bg-bg-card border border-white/5 p-8 rounded-xl hover:border-accent-red/30 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white uppercase">Stage 2</h3>
                                    <span className="px-3 py-1 bg-accent-yellow/10 text-accent-yellow text-xs font-bold rounded uppercase">Modified</span>
                                </div>
                                <p className="text-text-muted mb-6 text-sm uppercase tracking-wider">For Vehicles with Upgrade Parts</p>

                                <p className="text-text-secondary mb-6">Stage 2 requires supporting hardware modifications to handle increased performance.</p>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-white text-sm font-bold uppercase mb-2">Upgrades:</h4>
                                        <ul className="text-sm text-text-secondary space-y-1">
                                            <li>• High-flow air intake system</li>
                                            <li>• Performance exhaust or downpipe</li>
                                            <li>• Upgraded intercooler</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-bold uppercase mb-2">Benefits:</h4>
                                        <ul className="text-sm text-text-secondary space-y-1">
                                            <li>• Significantly improved acceleration</li>
                                            <li>• Enhanced engine efficiency</li>
                                            <li>• More aggressive power characteristics</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stage 3 */}
                        <div className="bg-bg-tertiary border border-white/5 p-8 rounded-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-red/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white uppercase mb-2">Stage 3 Tuning</h3>
                                <p className="text-accent-red font-display uppercase tracking-wider text-sm mb-6">High-Performance and Track-Focused Builds</p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-text-secondary mb-6">Stage 3 tuning is intended for extensively modified vehicles and motorsport applications.</p>
                                        <h4 className="text-white text-sm font-bold uppercase mb-2">Typical requirements:</h4>
                                        <ul className="text-sm text-text-secondary space-y-2">
                                            <li>• Larger turbocharger or supercharger</li>
                                            <li>• Upgraded fuel system components</li>
                                            <li>• Strengthened drivetrain and engine internals</li>
                                        </ul>
                                    </div>
                                    <div className="flex flex-col justify-center border-l border-white/5 pl-8">
                                        <h4 className="text-white text-sm font-bold uppercase mb-2">Benefits:</h4>
                                        <ul className="text-lg font-heading font-bold text-white space-y-2">
                                            <li>MAXIMUM POWER OUTPUT</li>
                                            <li>TRACK-READY PERFORMANCE</li>
                                        </ul>
                                        <p className="text-xs text-text-muted mt-4">
                                            *Prioritizes performance over comfort. Requires professional setup.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-white/10 my-12"></div>

                    {/* Dyno Tuning */}
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl font-heading font-bold text-white mb-2 uppercase">Dyno Tuning</h2>
                            <h3 className="text-accent-red font-display text-xl mb-6">Precision Calibration Under Controlled Conditions</h3>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Dyno tuning uses a dynamometer to measure real-time engine output and fine-tune the ECU under simulated road loads.
                            </p>
                            <ul className="space-y-2 mb-8">
                                {['Accurate horsepower and torque measurement', 'Safe optimisation of air-fuel ratios', 'Consistent, repeatable results', 'Ensures engine reliability'].map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-3 text-text-primary font-medium">
                                        <span className="w-1.5 h-1.5 bg-accent-red rounded-full"></span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                            <div className="inline-block px-6 py-3 bg-white/5 border-l-2 border-accent-red">
                                <p className="text-sm text-text-secondary italic">
                                    Recommended for all performance stages, especially Stage 2 and above.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            {/* Placeholder for Dyno Image if we had one specific, otherwise use a gradient box */}
                            <div className="aspect-video bg-bg-card rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-accent-red/10 group-hover:bg-accent-red/20 transition-colors"></div>
                                <span className="text-white/20 font-display text-4xl font-bold uppercase rotate-[-12deg]">Dyno Tested</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-bg-secondary text-center">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Ready to Unlock Your Car's Potential?</h2>
                    <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                        Book a consultation with our expert tuners to discuss the best options for your vehicle.
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

export default PerformanceInfo;
