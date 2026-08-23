import React, { useState, useEffect } from 'react';

const WaitlistModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interested: null as boolean | null,
    });

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-waitlist', handleOpen);
        return () => window.removeEventListener('open-waitlist', handleOpen);
    }, []);

    if (!isOpen) return null;

    const close = () => {
        setIsOpen(false);
        setIsSuccess(false);
        setError(null);
        setFormData({ name: '', email: '', interested: null });
    };

    const isValid = formData.name.trim() !== '' && /^\S+@\S+\.\S+$/.test(formData.email) && formData.interested !== null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        setIsSubmitting(true);
        setError(null);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';
            const response = await fetch(`${API_URL}/api/waitlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setIsSuccess(true);
            } else {
                throw new Error(data.error || 'Failed to join waitlist');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn"
                onClick={close}
            ></div>

            <div className="relative bg-[#0a0a0a] w-full max-w-md flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(220,38,38,0.2)] animate-fadeInUp">
                <button
                    onClick={close}
                    className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
                >
                    ✕
                </button>

                <div className="px-8 pt-10 pb-8">
                    {isSuccess ? (
                        <div className="animate-fadeInUp flex flex-col items-center justify-center text-center py-6">
                            <div className="w-16 h-16 bg-accent-red/10 border border-accent-red/20 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-heading font-black text-white italic uppercase mb-2">You're on the list!</h3>
                            <p className="text-text-muted text-sm mb-8">Thanks for joining, {formData.name.split(' ')[0]}. We'll email you the moment Tuned Society opens up.</p>
                            <button onClick={close} className="btn btn-secondary min-w-[140px]">
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-heading font-black text-white italic uppercase tracking-wider mb-1">
                                Join the <span className="text-accent-red">Waitlist</span>
                            </h2>
                            <p className="text-text-muted text-sm mb-8">Be first in line when we launch.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="group">
                                    <label className="block text-xs font-bold text-accent-red uppercase tracking-wider mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:border-accent-red focus:bg-white/10 focus:outline-none transition-all"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold text-accent-red uppercase tracking-wider mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:border-accent-red focus:bg-white/10 focus:outline-none transition-all"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold text-accent-red uppercase tracking-wider mb-3">Are you interested in using this app?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, interested: true })}
                                            className={`p-3 rounded-lg border font-bold text-sm uppercase tracking-wide transition-all ${formData.interested === true ? 'bg-accent-red border-accent-red text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'}`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, interested: false })}
                                            className={`p-3 rounded-lg border font-bold text-sm uppercase tracking-wide transition-all ${formData.interested === false ? 'bg-white/20 border-white/40 text-white' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'}`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex justify-center py-4"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        'Join the Waitlist'
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WaitlistModal;
