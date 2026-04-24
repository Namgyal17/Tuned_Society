import React, { useEffect, useRef } from 'react';
import engineBay from '../assets/engine-bay.jpg';

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
            elements.forEach(el => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-24 bg-bg-secondary relative overflow-hidden">
            {/* Gradient Overlay for seamless transition */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-bg-secondary z-10"></div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wide">
                            We Don’t Just <span className="text-accent-red">Build</span> Cars.<br />
                            We Build <span className="text-white">Legacies.</span>
                        </h2>

                        <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                            <p>
                                <strong className="text-white">Tuned Society</strong> was born from a simple frustration: the gap between
                                <em className="text-white"> "I want this"</em> and <em className="text-white">"How do I get this?"</em>.
                            </p>
                            <p>
                                The Indian automotive scene is exploding, but finding the right parts, the right advice, and most importantly,
                                the right <span className="text-accent-red">mechanics</span> is a nightmare. Forums are dead, Instagram is
                                cluttered, and trial-and-error is expensive.
                            </p>
                            <p>
                                We bridge that gap. We curate the best garages, decode the complex world of mods, and guide you
                                step-by-step to your dream build. No gatekeeping. No BS. Just pure automotive passion.
                            </p>
                        </div>

                        <div className="flex gap-8 pt-4">
                            {/* <div>
                                <h3 className="text-3xl font-heading font-bold text-white">500+</h3>
                                <p className="text-sm text-text-muted uppercase tracking-wider">Builds Consulted</p>
                            </div> */}
                            {/* <div>
                                <h3 className="text-3xl font-heading font-bold text-white">50+</h3>
                                <p className="text-sm text-text-muted uppercase tracking-wider">Verified Partners</p>
                            </div> */}
                            <div>
                                <h3 className="text-3xl font-heading font-bold text-white">100%</h3>
                                <p className="text-sm text-text-muted uppercase tracking-wider">Enthusiast Driven</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Abstract Art / Image Placeholder */}
                        <div className="relative md:aspect-[5/4] rounded-lg overflow-hidden md:border md:border-white/5 group">
                            <img
                                src={engineBay}
                                alt="Engine Bay"
                                className="w-full h-auto md:h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60"></div>

                            {/* Floating Card */}
                            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-bg-card/90 backdrop-blur-md p-3 md:p-6 rounded border border-white/10 shadow-2xl">
                                <p className="font-heading italic text-sm md:text-lg lg:text-xl text-white">"The details are not the details. They make the design."</p>
                                <p className="mt-1 md:mt-2 text-xs md:text-sm text-accent-red font-bold uppercase tracking-widest">- Charles Eames</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
