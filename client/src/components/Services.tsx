import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import tuningImg from '../assets/services/tuning.jpg';
import suspensionImg from '../assets/services/suspension.jpg';
import wheelsImg from '../assets/services/wheels.jpg';
import exhaustImg from '../assets/services/exhaust.jpg';
import aestheticsImg from '../assets/services/aesthetics.jpg';
import brakesImg from '../assets/services/brakes.jpg';

const Services: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const services = [
        {
            title: "Performance Tuning",
            image: tuningImg,
            description: "ECU remaps, piggybacks, and standalone management for maximum power and efficiency.",
            tags: ["ECU Remap", "Stage 1/2/3", "Dyno Tuning"]
        },
        {
            title: "Suspension & Handling",
            image: suspensionImg,
            description: "Coilovers, lowering springs, and chassis bracing to make your car handle like it's on rails.",
            tags: ["Coilovers", "Air Suspension", "Sway Bars"]
        },
        {
            title: "Wheels & Tires",
            image: wheelsImg,
            description: "The perfect fitment. Flow-formed wheels, sticky tires, and precision alignment.",
            tags: ["Alloys", "Semi-Slicks", "Stance Setup"]
        },
        {
            title: "Exhaust Systems",
            image: exhaustImg,
            description: "Headers, valvetronic systems, and cat-backs for that perfect auditory experience.",
            tags: ["Full System", "Downpipes", "Valvetronic"]
        },
        {
            title: "Aesthetics & Aero",
            image: aestheticsImg,
            description: "Body kits, spoilers, diffusers, and wraps to turn heads at every signal.",
            tags: ["Body Kits", "Wraps", "Carbon Fiber"]
        },
        {
            title: "Braking Systems",
            image: brakesImg,
            description: "Big brake kits, slotted rotors, and performance pads for confident stopping power.",
            tags: ["Big Brake Kits", "Steel Lines", "Ceramic Pads"]
        }
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="services" className="py-24 bg-bg-primary relative">
            <div className="container-custom">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-heading font-black italic uppercase text-white mb-2 leading-tight drop-shadow-2xl">
                            OUR <span className="text-accent-red animate-pulse-slow">EXPERIENCE</span>
                        </h2>
                        <p className="text-text-muted">What we can help you build.</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent-red transition-all text-white">←</button>
                        <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-accent-red transition-all text-white">→</button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="min-w-[350px] md:min-w-[400px] snap-center bg-bg-card border border-white/5 rounded-xl overflow-hidden hover:border-accent-red/30 transition-all duration-300 group flex flex-col"
                        >
                            <Link
                                to={service.title === "Performance Tuning" ? "/performance-tuning" : service.title === "Suspension & Handling" ? "/suspension-handling" : service.title === "Wheels & Tires" ? "/wheels-tires" : service.title === "Exhaust Systems" ? "/exhaust-systems" : service.title === "Aesthetics & Aero" ? "/aesthetics-aero" : service.title === "Braking Systems" ? "/braking-systems" : "#"}
                                className={`flex flex-col h-full ${(service.title === "Performance Tuning" || service.title === "Suspension & Handling" || service.title === "Wheels & Tires" || service.title === "Exhaust Systems" || service.title === "Aesthetics & Aero" || service.title === "Braking Systems") ? "cursor-pointer" : "cursor-default"}`}
                                onClick={(e) => {
                                    if (service.title !== "Performance Tuning" && service.title !== "Suspension & Handling" && service.title !== "Wheels & Tires" && service.title !== "Exhaust Systems" && service.title !== "Aesthetics & Aero" && service.title !== "Braking Systems") {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-80"></div>
                                </div>

                                <div className="p-8 pt-4 flex-grow flex flex-col">
                                    <h3 className="text-2xl md:text-3xl font-black italic uppercase font-heading text-white mb-4 leading-tight drop-shadow-lg">
                                        {service.title.split(' ')[0]} <span className="text-accent-red animate-pulse-slow">
                                            {service.title.split(' ').slice(1).join(' ')}
                                        </span>
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed mb-6 flex-grow">
                                        {service.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {service.tags.map(tag => (
                                            <span key={tag} className="text-xs font-semibold px-3 py-1 bg-white/5 rounded-full text-text-muted uppercase tracking-wide border border-white/5 group-hover:border-accent-red/20 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
