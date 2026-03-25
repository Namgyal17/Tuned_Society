import { Link } from 'react-router-dom';

const WheelsInfo = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center text-accent-red hover:text-red-400 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
            </Link>

            <div className="bg-bg-secondary rounded-2xl border border-gray-800 p-8 md:p-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Wheels & Tires</h1>
                <p className="text-gray-400 text-lg mb-8 max-w-3xl">
                    Everything you need to know about decreasing unsprung weight, matching offset (ET), choosing between Cast vs Forged rims, and picking the right sticky rubber.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/50 rounded-xl p-6 border border-gray-800">
                        <h3 className="text-xl font-bold mb-3 text-accent-red">Fitment Guide</h3>
                        <p className="text-gray-400">Learn about wheel offsets, rubbing issues, and fender rolling to achieve that perfect flush look.</p>
                    </div>
                    <div className="bg-black/50 rounded-xl p-6 border border-gray-800">
                        <h3 className="text-xl font-bold mb-3 text-accent-red">Tire Selection</h3>
                        <p className="text-gray-400">Navigate tire compounds: from 200 treadwear semi-slicks to all-season high-performance rubber.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WheelsInfo;
