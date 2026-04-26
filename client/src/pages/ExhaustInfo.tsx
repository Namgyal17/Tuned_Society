import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import exhaustImg from '../assets/services/exhaust.jpg';

const ExhaustInfo: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const modifications = [
        {
            title: "Axle-Back Exhaust",
            description: "A rear-section upgrade focused on improving exhaust tone while keeping the rest of the system stock. Ideal for a subtle, refined sound upgrade."
        },
        {
            title: "Cat-Back Exhaust",
            description: "Replaces the exhaust system from the catalytic converter to the rear. Improves flow, reduces weight, and delivers a deeper, sportier exhaust note."
        },
        {
            title: "Headers / Exhaust Manifolds",
            description: "Performance headers improve exhaust scavenging, resulting in better throttle response and power delivery."
        },
        {
            title: "High-Flow Catalytic Converters",
            description: "Designed to reduce back pressure while maintaining emissions compliance, improving both performance and sound."
        },
        {
            title: "Valvetronic Exhaust Systems",
            description: "Electronically controlled valves allow you to switch between quiet and aggressive exhaust modes depending on driving conditions."
        },
        {
            title: "Custom Exhaust Fabrication",
            description: "Tailored exhaust systems built to match your vehicle, performance goals, and sound preference."
        }
    ];

    const materials = [
        { title: "Stainless Steel", desc: "Corrosion-resistant and durable choice for all-round performance." },
        { title: "Titanium", desc: "Ultra-lightweight with a distinct, exotic high-pitched resonance." },
        { title: "Mandrel-Bent Piping", desc: "Ensures smooth flow without diameter reduction at bends." },
        { title: "Performance Mufflers", desc: "Tuned resonators that eliminate drone while enhancing tone." }
    ];



    return (
        <div className="pt-24 min-h-screen bg-bg-primary text-text-primary">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={exhaustImg}
                        alt="Exhaust Systems"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/50"></div>
                </div>

                <div className="relative z-10 container-custom text-center">
                    <Link to="/" className="inline-block mb-6 text-accent-red hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-7xl font-heading font-black italic uppercase text-white mb-8 leading-tight drop-shadow-2xl">
                        EXHAUST <span className="text-accent-red animate-pulse-slow">SYSTEMS</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-light">
                        Flow. Efficiency. Character.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container-custom max-w-4xl">

                    {/* Intro */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">More Than Just Sound</h2>
                        <p className="text-text-secondary leading-relaxed text-lg mb-6">
                            An exhaust system upgrade is about more than sound — it’s about flow, efficiency, and character. A well-designed exhaust reduces restriction, improves engine breathing, and enhances both performance and driving experience.
                        </p>
                        <p className="text-text-secondary leading-relaxed text-lg">
                            At Tuned Society, exhaust modifications are selected and built to deliver measurable gains while maintaining reliability, legality, and everyday usability. Whether you’re chasing performance, sound, or a refined aesthetic, the right exhaust setup makes a clear difference.
                        </p>
                    </div>

                    <div className="w-full h-px bg-white/10 my-12"></div>

                    {/* Modifications Grid */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-heading font-bold text-white mb-10 uppercase text-center">Types of Exhaust Upgrades</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {modifications.map((mod, index) => (
                                <div key={index} className="bg-bg-card border border-white/5 p-8 rounded-xl hover:border-accent-red/30 transition-all duration-300 group">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-red transition-colors">{mod.title}</h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        {mod.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Materials & Design */}
                    <div className="mb-16 bg-bg-tertiary rounded-xl p-10 border border-white/5">
                        <h2 className="text-2xl font-heading font-bold text-white mb-8 uppercase text-center">Materials & Design</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            {materials.map((mat, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-accent-red/10 flex items-center justify-center shrink-0 text-accent-red font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase mb-1">{mat.title}</h4>
                                        <p className="text-text-secondary text-sm">{mat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why Upgrade? */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6 uppercase">Why Upgrade?</h2>
                        <ul className="space-y-4 max-w-2xl">
                            {['Improved airflow and engine efficiency', 'Enhanced throttle response', 'Weight reduction compared to stock systems', 'A sound profile that matches your build', 'Visual upgrade with premium exhaust tips'].map((reason, i) => (
                                <li key={i} className="flex items-center gap-3 text-text-primary">
                                    <span className="w-1.5 h-1.5 bg-accent-red rounded-full"></span>
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Additional "Tuned Society Approach" Block */}
                    <div className="flex flex-col md:flex-row gap-8 mb-16 items-stretch">
                        <div className="flex-1 bg-gradient-to-br from-bg-card to-black border border-white/10 p-8 rounded-xl">
                            <h3 className="text-xl font-heading font-bold text-accent-red mb-4 uppercase">The Tuned Society Approach</h3>
                            <p className="text-text-secondary mb-4">Every system we install is planned with:</p>
                            <ul className="space-y-2 text-sm text-white">
                                <li>• Correct pipe sizing and routing</li>
                                <li>• Heat management and clearance</li>
                                <li>• Sound balance (performance vs drone)</li>
                                <li>• Compatibility with engine tuning</li>
                            </ul>
                        </div>
                        <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1596706786047-9753c15858cc?q=80&w=2938&auto=format&fit=crop')] bg-cover bg-center rounded-xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors"></div>
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                                <h3 className="text-2xl font-heading font-bold text-white mb-2 uppercase">Hear The Difference</h3>
                                <p className="text-text-secondary text-sm">
                                    The sound of your car is its voice. Make it heard.
                                </p>
                            </div>
                        </div>
                    </div>



                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-bg-secondary text-center">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Find Your Sound.</h2>
                    <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                        From subtle rumble to race-track scream, we build exhaust setups that match your vision.
                    </p>
                    <button
                        onClick={() => (window as any).openConsultationModal && (window as any).openConsultationModal()}
                        className="btn btn-primary px-12 py-4 text-lg shadow-glow"
                    >
                        GET AN EXHAUST QUOTE
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ExhaustInfo;
