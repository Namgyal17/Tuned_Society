import { Link } from 'react-router-dom';

const BrakingInfo = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center text-accent-red hover:text-red-400 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
            </Link>

            <div className="bg-bg-secondary rounded-2xl border border-gray-800 p-8 md:p-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Braking Systems</h1>
                <p className="text-gray-400 text-lg mb-8 max-w-3xl">
                    The most important safety upgrade. Deep dive into Big Brake Kits (BBK), slotted rotors, performance track pads, and stainless braided brake lines.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/50 rounded-xl p-6 border border-gray-800">
                        <h3 className="text-xl font-bold mb-3 text-accent-red">Pad Compounds</h3>
                        <p className="text-gray-400">Choose between ceramic for low dust vs metallic for supreme high-temperature braking power.</p>
                    </div>
                    <div className="bg-black/50 rounded-xl p-6 border border-gray-800">
                        <h3 className="text-xl font-bold mb-3 text-accent-red">Safety First</h3>
                        <p className="text-gray-400">If you add power, you must add stopping capability. Find garages that properly bleed and upgrade fluid.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrakingInfo;
