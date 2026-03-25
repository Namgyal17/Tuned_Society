import { Link } from 'react-router-dom';

const SuspensionInfo = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center text-accent-red hover:text-red-400 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
            </Link>

            <div className="bg-bg-secondary rounded-2xl border border-gray-800 p-8 md:p-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Suspension & Handling</h1>
                <p className="text-gray-400 text-lg mb-8 max-w-3xl">
                    Detailed breakdown on Coilovers, Lowering Springs, Sway Bars, and Air Suspension setups to drastically improve cornering speed and vehicle stance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/50 rounded-xl p-6 border border-gray-800">
                        <h3 className="text-xl font-bold mb-3 text-accent-red">Street vs Track</h3>
                        <p className="text-gray-400">Choose the right spring rates and damping controls tailored to daily driving or weekend track days.</p>
                    </div>
                    <div className="bg-black/50 rounded-xl p-6 border border-gray-800">
                        <h3 className="text-xl font-bold mb-3 text-accent-red">Suspension Specialists</h3>
                        <p className="text-gray-400">Get your suspension installed and aligned by experts using laser-guided geometry machines.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuspensionInfo;
