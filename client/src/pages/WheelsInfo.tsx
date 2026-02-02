import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import wheelsImg from '../assets/services/wheels.png';

const WheelsInfo: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const wheelTypes = [
        {
            title: "Alloy Wheels",
            description: "Lightweight and strong, alloy wheels improve handling, reduce unsprung weight, and enhance overall vehicle dynamics."
        },
        {
            title: "Flow-Formed Wheels",
            description: "A balance between strength and weight, offering near-forged performance at a more accessible price point."
        },
        {
            title: "Forged Wheels",
            description: "Premium wheels engineered for maximum strength and minimum weight. Ideal for high-performance and track-oriented builds."
        },
        {
            title: "Steel Wheels",
            description: "Durable and practical, commonly used for daily driving or utility-focused setups."
        }
    ];

    const tyreTypes = [
        {
            title: "Street / Performance",
            description: "Designed for daily driving with improved grip, comfort, and wet-weather performance."
        },
        {
            title: "Ultra High Performance (UHP)",
            description: "Focused on sharp handling, high-speed stability, and strong braking performance."
        },
        {
            title: "Semi-Slicks",
            description: "Track-inspired tyres offering extreme grip in dry conditions, best suited for spirited driving and motorsport use."
        },
        {
            title: "All-Season",
            description: "Balanced performance across varying road and weather conditions with long tread life."
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-bg-primary text-text-primary">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={wheelsImg}
                        alt="Wheels & Tyres"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/50"></div>
                </div>

                <div className="relative z-10 container-custom text-center">
                    <Link to="/" className="inline-block mb-6 text-accent-red hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                        ← Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-heading font-black italic uppercase text-white mb-6 drop-shadow-2xl">
                        Wheels <span className="text-stroke-red text-transparent">& Tyres</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-light">
                        Where performance meets the pavement.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container-custom max-w-4xl">

                    {/* Intro */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">Grip. Turn. Stop.</h2>
                        <p className="text-text-secondary leading-relaxed text-lg mb-6">
                            Wheels and tyres are where performance, safety, and design come together. The right combination doesn’t just change how your car looks—it defines how it grips, turns, brakes, and communicates with the road.
                        </p>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            At Tuned Society, we focus on correct fitment, quality components, and setups that suit real driving conditions. From daily usability to performance-focused builds, every wheel and tyre choice is made with purpose.
                        </p>
                    </div>

                    <div className="w-full h-px bg-white/10 my-12"></div>

                    {/* Wheel Types Grid */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-8 uppercase">Types of Wheels</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {wheelTypes.map((item, index) => (
                                <div key={index} className="bg-bg-card border border-white/5 p-6 rounded-xl hover:border-accent-red/30 transition-all duration-300">
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-text-secondary text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tyre Types Grid */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-8 uppercase">Types of Tyres</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {tyreTypes.map((item, index) => (
                                <div key={index} className="bg-bg-tertiary border border-white/5 p-6 rounded-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-red/5 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2"></div>
                                    <h3 className="text-xl font-bold text-white mb-2 relative z-10">{item.title}</h3>
                                    <p className="text-text-secondary text-sm relative z-10">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-px bg-white/10 my-12"></div>

                    {/* Special Feature: Offroad */}
                    <div className="bg-bg-card border-l-4 border-accent-yellow p-8 md:p-12 mb-16 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-heading font-bold text-white mb-4 uppercase">Offroad & 4x4 Support</h2>
                            <p className="text-xl text-accent-yellow font-display mb-6">Built for the tough terrain.</p>
                            <p className="text-text-secondary mb-6 leading-relaxed">
                                We specialize in equipping 4x4s and SUVs with robust, dirt-ready setups. Whether it's beadlock rims for low-pressure crawling or reinforced alloys for high-speed desert runs, we have the gear to get you anywhere.
                            </p>
                            <ul className="grid grid-cols-2 gap-4 text-white font-bold uppercase text-sm">
                                <li className="flex items-center gap-2"><span className="text-accent-yellow">●</span> Beadlock Capability</li>
                                <li className="flex items-center gap-2"><span className="text-accent-yellow">●</span> All-Terrain (A/T) & Mud (M/T)</li>
                                <li className="flex items-center gap-2"><span className="text-accent-yellow">●</span> Lift Kit Compatible Offsets</li>
                                <li className="flex items-center gap-2"><span className="text-accent-yellow">●</span> Max Load Ratings</li>
                            </ul>
                        </div>
                    </div>

                    {/* Fitment services */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6 uppercase">Professional Fitment & Setup</h2>
                        <ul className="space-y-4">
                            {[
                                'Proper wheel size, width, and offset selection',
                                'Tyre sizing based on performance and clearance',
                                'Precision wheel alignment and balancing',
                                'Stance and flush-fitment setups without compromising drivability'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-text-secondary">
                                    <span className="text-accent-red font-bold">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Why It Matters */}
                    <div className="bg-bg-tertiary p-8 rounded-xl text-center">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6 uppercase">Why It Matters</h2>
                        <div className="grid md:grid-cols-2 items-center gap-6 text-left max-w-2xl mx-auto">
                            <ul className="space-y-2">
                                <li className="text-text-muted text-sm uppercase tracking-wider">Performance</li>
                                <li className="text-white font-bold">Improved grip & braking</li>
                                <li className="text-white font-bold">Better steering response</li>
                            </ul>
                            <ul className="space-y-2">
                                <li className="text-text-muted text-sm uppercase tracking-wider">Safety & Style</li>
                                <li className="text-white font-bold">Correct stance safely</li>
                                <li className="text-white font-bold">Enhanced ride quality</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-bg-secondary text-center">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Get The Perfect Fit.</h2>
                    <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                        Don't guess with offsets and tire sizes. Let us calculate the perfect setup for your build.
                    </p>
                    <button
                        onClick={() => (window as any).openConsultationModal && (window as any).openConsultationModal()}
                        className="btn btn-primary px-12 py-4 text-lg shadow-glow"
                    >
                        FIND MY WHEELS
                    </button>
                </div>
            </section>
        </div>
    );
};

export default WheelsInfo;
