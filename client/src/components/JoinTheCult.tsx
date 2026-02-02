import React from 'react';

const JoinTheCult: React.FC = () => {
    // Background "logos" - represented as text for now
    const brands = [
        "HKS", "BREMBO", "SPARCO", "RECARO", "GREDDY", "TEIN", "KW",
        "BILSTEIN", "NOS", "MOMO", "BRIDE", "HRE", "BBS", "VOLK",
        "ADVAN", "WORK", "ENKEI", "RAYS", "SSR", "VOSSEN"
    ];

    // Randomized positioning for a scattered effect
    // Using a deterministic way to generate random-looking positions to avoid hydration mismatches if we were using SSR, 
    // but for client-side React it's fine. We'll just hardcode some classes or styles for variety.

    return (
        <section className="relative bg-black min-h-[60vh] flex flex-col justify-center items-center overflow-hidden py-24">

            {/* Background Texture */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                {brands.map((brand, i) => {
                    const top = Math.floor(Math.random() * 90) + 5 + '%';
                    const left = Math.floor(Math.random() * 90) + 5 + '%';
                    const rotation = Math.floor(Math.random() * 60) - 30 + 'deg';
                    const size = Math.floor(Math.random() * 2) + 1 + 'rem'; // 1rem to 3rem

                    return (
                        <span
                            key={i}
                            className="absolute text-accent-red-dark font-display font-bold uppercase opacity-5 transition-opacity duration-500 hover:opacity-10 cursor-default"
                            style={{
                                top,
                                left,
                                transform: `rotate(${rotation})`,
                                fontSize: size,
                            }}
                        >
                            {brand}
                        </span>
                    );
                })}
                {/* Vignette */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center container-custom">
                <h2 className="text-5xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 uppercase tracking-tighter mb-8 drop-shadow-2xl">
                    JOIN THE CULT
                </h2>

                <p className="text-text-muted font-heading text-lg md:text-xl tracking-[0.2em] uppercase max-w-2xl mx-auto mb-12">
                    The Underground. The Elite. The Tuned.
                </p>

                <div className="flex justify-center gap-6">
                    <a
                        href="https://instagram.com/tuned_society_"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative px-8 py-4 bg-transparent overflow-hidden"
                    >
                        <div className="absolute inset-0 w-full h-full bg-accent-red/10 group-hover:bg-accent-red/20 transition-all duration-300 transform skew-x-[-12deg]"></div>
                        <div className="absolute inset-0 w-1 h-full bg-accent-red left-0 transform skew-x-[-12deg]"></div>
                        <div className="absolute inset-0 w-1 h-full bg-accent-red right-0 transform skew-x-[-12deg]"></div>

                        <span className="relative z-10 font-heading font-bold text-xl text-white uppercase tracking-widest group-hover:text-accent-red transition-colors duration-300">
                            Follow Us
                        </span>
                    </a>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-6 mt-8">
                    {/* Instagram */}
                    <a href="https://instagram.com/tuned_society_" target="_blank" rel="noreferrer" className="text-white/50 hover:text-accent-red transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                    {/* Facebook */}
                    <a href="https://www.facebook.com/profile.php?id=61587235528134" target="_blank" rel="noreferrer" className="text-white/50 hover:text-accent-red transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default JoinTheCult;
