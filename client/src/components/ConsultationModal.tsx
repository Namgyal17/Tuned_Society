import React, { useState, useEffect } from 'react';
import { useConsultationData } from '../hooks/useConsultationData';

const ConsultationModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [successData, setSuccessData] = useState<{ phone: string | null } | null>(null);
    const { vehicles, buildGoals, garages, loading, error } = useConsultationData();

    const [formData, setFormData] = useState({
        vehicle: { type: '', region: '', brand: '', model: '' },
        buildGoal: { category: '', build: '' },
        budget: '',
        usage: '',
        preferences: { priorities: [] as string[], timeline: '' },
        location: '',
        selectedGarage: '',
        additionalNotes: '',
        userName: '',
        userPhone: ''
    });

    const [garageSearch, setGarageSearch] = useState('');

    const [isLocating, setIsLocating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                // Using OpenStreetMap Nominatim API for reverse geocoding
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();

                const address = data.address;
                const city = address.city || address.town || address.village || address.municipality || address.state_district || "";
                const state = address.state || "";

                const locationString = city && state ? `${city}, ${state}` : city || state || "";

                if (locationString) {
                    setFormData(prev => ({ ...prev, location: locationString }));
                } else {
                    alert("Could not determine city name from coordinates.");
                }
            } catch (error) {
                console.error("Error fetching location:", error);
                alert("Failed to fetch location details. Please enter manually.");
            } finally {
                setIsLocating(false);
            }
        }, (error) => {
            console.error("Geolocation error:", error);
            alert("Unable to retrieve your location. Please check browser permissions.");
            setIsLocating(false);
        });
    };

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-consultation', handleOpen);
        return () => window.removeEventListener('open-consultation', handleOpen);
    }, []);

    if (!isOpen) return null;

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);
    const close = () => { setIsOpen(false); setCurrentStep(1); setSuccessData(null); };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);
        try {
            // Use environment variable or fallback to localhost
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';
            const response = await fetch(`${API_URL}/api/consultation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Instead of closing, show success step
                // Fail-safe: If backend doesn't return phone, find it in local garages array
                let phone = data.garagePhone;
                if (!phone && formData.selectedGarage) {
                    const selected = garages.find(g => g.slug === formData.selectedGarage);
                    phone = selected?.phone;
                }
                setSuccessData({ phone: phone });
                setCurrentStep(9); // Move to success step
            } else {
                throw new Error(data.error || 'Failed to submit consultation');
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            alert(`Error: ${error.message || "Failed to send request"}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getWhatsAppLink = () => {
        if (!successData?.phone) return null;

        // Remove non-digits from phone
        const cleanPhone = successData.phone.replace(/\D/g, '');
        // Default to India 91 if no country code (naively assuming for now as per context)
        const phone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

        const text = `Hi, I just submitted a consultation request via Tuned Society.\n\n*Vehicle:* ${formData.vehicle.brand} ${formData.vehicle.model}\n*Build Goal:* ${formData.buildGoal.category} - ${formData.buildGoal.build}\n*Budget:* ${formData.budget}\n*Timeline:* ${formData.preferences.timeline}\n\nCan we discuss my build?`;

        return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    };

    const totalSteps = 8;


    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn"
                onClick={close}
            ></div>

            <div className="relative bg-[#0a0a0a] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(220,38,38,0.2)] p-8 animate-fadeInUp">
                <button
                    onClick={close}
                    className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5"
                >
                    ✕
                </button>

                {/* Header & Progress */}
                <div className="mb-10">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-3xl font-heading font-black text-white italic uppercase tracking-wider">
                                Build <span className="text-accent-red">Consultation</span>
                            </h2>
                            <p className="text-text-muted text-sm mt-1">Let's blueprint your dream build.</p>
                        </div>
                        <span className="text-white/40 font-mono text-sm">STEP {currentStep.toString().padStart(2, '0')} / {totalSteps.toString().padStart(2, '0')}</span>
                    </div>

                    {/* Segmented Progress Bar */}
                    <div className="flex gap-1 h-1">
                        {Array.from({ length: totalSteps }).map((_, i) => (
                            <div
                                key={i}
                                className={`flex-1 rounded-full transition-all duration-500 ${i + 1 <= currentStep ? 'bg-accent-red shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-white/5'}`}
                            ></div>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 space-y-4">
                        <div className="w-12 h-12 border-2 border-accent-red border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white/50 animate-pulse">Loading configuration data...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
                            !
                        </div>
                        <h3 className="text-xl font-bold text-white">Connection Error</h3>
                        <p className="text-white/50 max-w-sm">{error}</p>
                        <p className="text-xs text-white/30">Make sure the backend server is running.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors"
                        >
                            Retry Connection
                        </button>
                    </div>
                ) : (
                    <div className="min-h-[400px] flex flex-col">
                        {/* Step 1: Vehicle Type */}
                        {currentStep === 1 && (
                            <div className="animate-fadeInUp space-y-6">
                                <h3 className="text-xl font-bold text-white mb-6">Select Vehicle Category</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {vehicles.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => { setFormData({ ...formData, vehicle: { ...formData.vehicle, type: type.name } }); nextStep(); }}
                                            className="group relative p-8 rounded-xl border border-white/5 bg-white/5 hover:bg-white/[0.07] hover:border-accent-red/50 transition-all duration-300 text-left overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent-red/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative z-10 flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-2 uppercase italic font-heading group-hover:text-accent-red transition-colors">{type.name}</h3>
                                                    <p className="text-sm text-text-muted">Start a {type.name.toLowerCase()} build</p>
                                                </div>
                                                <span className="text-2xl text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Region/Brand */}
                        {currentStep === 2 && (
                            <div className="animate-fadeInUp">
                                <h3 className="text-xl font-bold text-white mb-6">Select Brand</h3>
                                <div className="space-y-8">
                                    {vehicles.find(v => v.name === formData.vehicle.type)?.regions.map(region => (
                                        <div key={region.id}>
                                            <h4 className="text-sm font-bold text-accent-red uppercase tracking-widest mb-4 pl-1">{region.name}</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                {region.brands.map(brand => (
                                                    <button
                                                        key={brand.id}
                                                        onClick={() => { setFormData({ ...formData, vehicle: { ...formData.vehicle, region: region.slug, brand: brand.name } }); nextStep(); }}
                                                        className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-accent-red/50 hover:bg-white/10 hover:shadow-glow-sm transition-all text-sm font-medium text-white group"
                                                    >
                                                        <span className="group-hover:text-accent-red transition-colors">{brand.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Model */}
                        {currentStep === 3 && (
                            <div className="animate-fadeInUp">
                                <div className="flex items-center gap-3 mb-6">
                                    <button onClick={prevStep} className="text-white/40 hover:text-white transition-colors">← Back</button>
                                    <div className="w-px h-4 bg-white/10"></div>
                                    <h3 className="text-xl font-bold text-white">Select Model for {formData.vehicle.brand}</h3>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {vehicles
                                        .find(v => v.name === formData.vehicle.type)?.regions
                                        .find(r => r.slug === formData.vehicle.region)?.brands
                                        .find(b => b.name === formData.vehicle.brand)?.models
                                        .map(model => (
                                            <button
                                                key={model.id}
                                                onClick={() => { setFormData({ ...formData, vehicle: { ...formData.vehicle, model: model.name } }); nextStep(); }}
                                                className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-accent-red/50 hover:bg-white/10 transition-all text-sm font-medium text-white hover:text-accent-red"
                                            >
                                                {model.name}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        )}

                        {/* Step 4: Build Goal */}
                        {currentStep === 4 && (
                            <div className="animate-fadeInUp space-y-8">
                                <h3 className="text-xl font-bold text-white mb-2">Define Your Build Goal</h3>
                                {buildGoals
                                    .filter(bg => !bg.warning)
                                    .map(category => (
                                        <div key={category.id}>
                                            <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">{category.name}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {category.options.map(option => (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => { setFormData({ ...formData, buildGoal: { category: category.slug, build: option.slug } }); nextStep(); }}
                                                        className="group relative p-5 bg-white/5 rounded-xl border border-white/5 hover:border-accent-red/50 hover:bg-white/[0.08] transition-all text-left h-full flex flex-col"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="font-bold text-white text-lg group-hover:text-accent-red transition-colors">{option.name}</span>
                                                            {option.warning && <span className="text-[10px] font-bold bg-accent-red/20 text-accent-red px-2 py-1 rounded border border-accent-red/20">ADVANCED</span>}
                                                        </div>
                                                        <p className="text-xs text-text-muted mb-4 leading-relaxed group-hover:text-white/70 transition-colors flex-grow">{option.description}</p>
                                                        <div className="flex flex-wrap gap-1.5 mt-auto">
                                                            {option.tags.map(tag => (
                                                                <span key={tag} className="text-[10px] font-mono bg-black/40 px-2 py-1 rounded text-white/40 group-hover:text-white/60 border border-white/5">#{tag}</span>
                                                            ))}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}

                        {/* Step 5: Budget & Usage */}
                        {currentStep === 5 && (
                            <div className="animate-fadeInUp space-y-10">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-6">What is your Budget?</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {["Under ₹50k", "₹50k - ₹1 Lakh", "₹1 Lakh - ₹3 Lakhs", "₹3 Lakhs - ₹5 Lakhs", "₹5 Lakhs - ₹10 Lakhs", "₹10 Lakhs+"].map(b => (
                                            <button
                                                key={b}
                                                onClick={() => setFormData({ ...formData, budget: b })}
                                                className={`p-4 rounded-lg border transition-all text-sm font-medium ${formData.budget === b ? 'border-accent-red bg-accent-red text-white shadow-glow' : 'border-white/10 bg-white/5 text-text-secondary hover:border-white/30 hover:text-white'}`}
                                            >
                                                {b}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-6">Primary Usage?</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {["Daily Driver", "Weekend Warrior", "Track / Competitive", "Show / Stance"].map(u => (
                                            <button
                                                key={u}
                                                onClick={() => setFormData({ ...formData, usage: u })}
                                                className={`p-4 rounded-lg border transition-all text-sm font-medium ${formData.usage === u ? 'border-accent-red bg-accent-red text-white shadow-glow' : 'border-white/10 bg-white/5 text-text-secondary hover:border-white/30 hover:text-white'}`}
                                            >
                                                {u}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 6: Location & Preferences */}
                        {currentStep === 6 && (
                            <div className="animate-fadeInUp space-y-8 max-w-lg mx-auto w-full">
                                <h3 className="text-xl font-bold text-white mb-2 text-center">Logistics</h3>

                                <div className="space-y-6">
                                    <div className="group">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-xs font-bold text-accent-red uppercase tracking-wider">Location (City)</label>
                                            <button
                                                onClick={handleGetLocation}
                                                disabled={isLocating}
                                                className="text-[10px] flex items-center gap-1 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white px-2 py-1 rounded border border-white/5 transition-colors disabled:opacity-50"
                                            >
                                                {isLocating ? (
                                                    <span className="animate-pulse">Locating...</span>
                                                ) : (
                                                    <>
                                                        <span>📍</span> Use Current Location
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:border-accent-red focus:bg-white/10 focus:outline-none transition-all"
                                            placeholder="e.g. Mumbai, Bangalore"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-bold text-accent-red uppercase tracking-wider mb-2">Target Timeline</label>
                                        <select
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-accent-red focus:bg-white/10 focus:outline-none transition-all appearance-none cursor-pointer"
                                            value={formData.preferences.timeline}
                                            onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, timeline: e.target.value } })}
                                        >
                                            <option value="" className="bg-bg-card">Select Timeline</option>
                                            <option value="Immediate" className="bg-bg-card">Immediate (Ready to Start)</option>
                                            <option value="1-3 Months" className="bg-bg-card">1-3 Months</option>
                                            <option value="Planning Phase" className="bg-bg-card">Just Researching</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 7: Garage Selection */}
                        {currentStep === 7 && (
                            <div className="animate-fadeInUp space-y-6">
                                <h3 className="text-xl font-bold text-white mb-4">Select a Garage <span className="text-accent-red">*</span></h3>
                                <p className="text-text-muted text-sm mb-6">Please select a workshop to handle your build. This ensures we can connect you with the right experts.</p>

                                <div className="relative mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search by name, location, or specialty..."
                                        value={garageSearch}
                                        onChange={(e) => setGarageSearch(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white placeholder-white/20 focus:border-accent-red focus:bg-white/10 focus:outline-none transition-all"
                                    />
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {garages
                                        .filter(garage =>
                                            garage.name.toLowerCase().includes(garageSearch.toLowerCase()) ||
                                            garage.location.toLowerCase().includes(garageSearch.toLowerCase()) ||
                                            (garage.specialties && garage.specialties.some(s => s.toLowerCase().includes(garageSearch.toLowerCase())))
                                        )
                                        .map(garage => {
                                            const isSelected = formData.selectedGarage === garage.slug;
                                            return (
                                                <div key={garage.id} className={`rounded-xl border transition-all duration-300 overflow-hidden ${isSelected ? 'border-accent-red bg-white/[0.03]' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}`}>
                                                    <button
                                                        onClick={() => setFormData({ ...formData, selectedGarage: garage.slug })}
                                                        className={`w-full relative p-6 text-left flex gap-5 transition-all group group/card`}
                                                    >
                                                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-accent-red/5 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

                                                        {/* Avatar / Logo Placeholder */}
                                                        <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-colors overflow-hidden ${isSelected ? 'bg-black text-white border-accent-red' : 'bg-bg-card text-text-muted border-white/10 group-hover:border-white/30 group-hover:text-white'}`}>
                                                            {garage.imageUrl ? (
                                                                <img
                                                                    src={garage.imageUrl}
                                                                    alt={garage.name}
                                                                    className={`w-full h-full ${garage.slug === 'h20-car-wash' ? 'object-cover scale-125' : 'object-contain'}`}
                                                                    onError={(e) => {
                                                                        e.currentTarget.style.display = 'none';
                                                                        e.currentTarget.parentElement?.classList.remove('overflow-hidden');
                                                                        // Show fallback initials
                                                                        if (e.currentTarget.parentElement) {
                                                                            e.currentTarget.parentElement.innerText = garage.name.substring(0, 2).toUpperCase();
                                                                        }
                                                                    }}
                                                                />
                                                            ) : (
                                                                garage.name.substring(0, 2).toUpperCase()
                                                            )}
                                                        </div>

                                                        <div className="flex-grow min-w-0">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h4 className={`text-lg font-bold font-heading truncate pr-4 transition-colors ${isSelected ? 'text-accent-red' : 'text-white group-hover:text-white'}`}>
                                                                    {garage.name}
                                                                </h4>
                                                                <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded text-xs">
                                                                    <span className="text-accent-yellow">★</span>
                                                                    <span className="font-bold text-white">{garage.rating ? garage.rating.toFixed(1) : 'New'}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-2 text-xs text-text-muted mb-3 font-mono">
                                                                <span>📍 {garage.location}</span>
                                                            </div>

                                                            <p className={`text-sm text-text-secondary leading-relaxed ${isSelected ? '' : 'line-clamp-2'}`}>
                                                                {garage.description || "Specialists in performance tuning and custom builds."}
                                                            </p>
                                                        </div>
                                                    </button>

                                                    {/* Expanded Details Section */}
                                                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isSelected ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                        <div className="p-6 pt-0 border-t border-white/5 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

                                                            {/* Specialties */}
                                                            <div>
                                                                <h5 className="font-bold text-white/50 uppercase tracking-wider text-xs mb-3">Specialties</h5>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {garage.specialties && garage.specialties.length > 0 ? (
                                                                        garage.specialties.map(spec => (
                                                                            <span key={spec} className="px-2 py-1 rounded bg-accent-red/10 text-accent-red border border-accent-red/20 text-xs font-medium">
                                                                                {spec}
                                                                            </span>
                                                                        ))
                                                                    ) : (
                                                                        <span className="text-text-muted italic">General Performance, Tuning</span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Contact & Info */}
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <h5 className="font-bold text-white/50 uppercase tracking-wider text-xs mb-1">Address</h5>
                                                                    <p className="text-white/80">{garage.address || `${garage.location}, India`}</p>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h5 className="font-bold text-white/50 uppercase tracking-wider text-xs mb-1">Timing</h5>
                                                                        <p className="text-white/80">{garage.timing || "Mon - Sat: 10AM - 7PM"}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h5 className="font-bold text-white/50 uppercase tracking-wider text-xs mb-1">Contact</h5>
                                                                        <p className="text-white/80">{garage.phone || "Coming soon"}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <label className="block text-xs font-bold text-accent-red uppercase tracking-wider mb-2">Additional Notes</label>
                                    <textarea
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:border-accent-red focus:bg-white/10 focus:outline-none transition-all h-24 resize-none"
                                        placeholder="Specific brands, part numbers, or build inspirations..."
                                        value={formData.additionalNotes}
                                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex justify-end pt-6 gap-4">
                                    <button onClick={prevStep} className="btn btn-secondary">Back</button>
                                    <button
                                        onClick={nextStep}
                                        disabled={!formData.selectedGarage}
                                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 8: User Details */}
                        {currentStep === 8 && (
                            <div className="animate-fadeInUp space-y-6 max-w-lg mx-auto w-full">
                                <h3 className="text-xl font-bold text-white mb-2 text-center">Final Details</h3>
                                <p className="text-text-muted text-sm text-center mb-6">Almost done! Enter your details so we can contact you.</p>

                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="block text-xs font-bold text-accent-red uppercase tracking-wider mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:border-accent-red focus:bg-white/10 focus:outline-none transition-all"
                                            placeholder="Enter your name"
                                            value={formData.userName}
                                            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-bold text-accent-red uppercase tracking-wider mb-2">Contact Number</label>
                                        <input
                                            type="tel"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/20 focus:border-accent-red focus:bg-white/10 focus:outline-none transition-all"
                                            placeholder="10-digit Mobile Number"
                                            value={formData.userPhone}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                setFormData({ ...formData, userPhone: value });
                                            }}
                                        />
                                        <p className="text-[10px] text-white/30 mt-1">Enter exactly 10 digits (e.g. 9876543210)</p>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6 gap-4 border-t border-white/5 mt-6">
                                    <button onClick={prevStep} className="btn btn-secondary">Back</button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={!formData.userName || formData.userPhone.length !== 10 || isSubmitting}
                                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none min-w-[140px] flex justify-center"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            "Submit Request"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 9: Success & WhatsApp */}
                        {currentStep === 9 && (
                            <div className="animate-fadeInUp flex flex-col items-center justify-center text-center py-10">
                                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-heading font-black text-white italic uppercase mb-2 text-yellow-500">Final Step Required!</h3>
                                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg mb-8 max-w-sm">
                                    <p className="text-white text-sm leading-relaxed font-medium">
                                        Your request is logged, but you <span className="text-yellow-500 font-bold uppercase underline">MUST</span> send the details to the garage to start the conversation.
                                    </p>
                                </div>

                                {successData?.phone && (
                                    <a
                                        href={getWhatsAppLink() || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex items-center justify-center gap-3 px-8 py-4 mb-6 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] hover:-translate-y-1 animate-pulse"
                                    >
                                        <img
                                            src="/whatsapp-logo.jpg"
                                            alt="WhatsApp"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="font-bold text-lg tracking-wide uppercase">Send Details Now</span>
                                    </a>
                                )}

                                <button onClick={close} className="text-white/40 hover:text-white text-sm underline underline-offset-4">
                                    Close Window
                                </button>
                            </div>
                        )}

                        {/* Navigation Footer (Hidden for Step 7, 8, & 9) */}
                        {currentStep !== 7 && currentStep !== 8 && currentStep !== 9 && (
                            <div className="mt-auto pt-8 flex justify-between items-center border-t border-white/5">
                                {currentStep > 1 && (
                                    <button onClick={prevStep} className="btn btn-secondary">
                                        Back
                                    </button>
                                )}

                                <div className="ml-auto">
                                    {(currentStep === 5 || currentStep === 6) && (
                                        <button
                                            onClick={nextStep}
                                            disabled={(currentStep === 5 && (!formData.budget || !formData.usage)) || (currentStep === 6 && (!formData.location || !formData.preferences.timeline))}
                                            className="btn btn-primary px-8 py-3 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed shadow-glow"
                                        >
                                            Next Step
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultationModal;

