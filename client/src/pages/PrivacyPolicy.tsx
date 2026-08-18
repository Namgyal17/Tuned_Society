import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const EFFECTIVE_DATE = 'August 18, 2026';

const SECTIONS = [
    { id: 'information-we-collect', label: 'Information We Collect' },
    { id: 'how-we-use-it', label: 'How We Use Your Information' },
    { id: 'how-we-share-it', label: 'How We Share Your Information' },
    { id: 'push-notifications', label: 'Push Notifications' },
    { id: 'data-retention', label: 'Data Retention' },
    { id: 'data-security', label: 'Data Security' },
    { id: 'your-rights', label: 'Your Rights & Choices' },
    { id: 'childrens-privacy', label: "Children's Privacy" },
    { id: 'third-party-links', label: 'Third-Party Links & Services' },
    { id: 'international-transfers', label: 'International Data Transfers' },
    { id: 'grievance-redressal', label: 'Grievance Redressal' },
    { id: 'changes', label: 'Changes to This Policy' },
    { id: 'contact', label: 'Contact Us' },
];

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 min-h-screen bg-bg-primary text-text-primary">
            {/* Header */}
            <section className="relative py-20 border-b border-white/5">
                <div className="container-custom max-w-4xl">
                    <Link to="/" className="inline-block mb-6 text-accent-red hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-heading font-black italic uppercase text-white mb-6 leading-tight">
                        Privacy <span className="text-accent-red">Policy</span>
                    </h1>
                    <p className="text-lg text-text-secondary max-w-2xl font-light">
                        This policy explains what information Tuned Society collects, why we collect it,
                        and the choices you have. We built Tuned Society around real garages and real
                        bookings — this is a plain-language account of what that requires from your data.
                    </p>
                    <p className="mt-6 font-display text-xs tracking-[0.2em] uppercase text-text-muted">
                        Effective Date: <span className="text-white">{EFFECTIVE_DATE}</span>
                    </p>
                </div>
            </section>

            {/* Body */}
            <section className="py-16">
                <div className="container-custom max-w-4xl grid lg:grid-cols-[220px_1fr] gap-16">

                    {/* Table of contents */}
                    <nav className="hidden lg:block">
                        <div className="sticky top-28">
                            <h4 className="text-xs font-display uppercase tracking-[0.2em] text-text-muted mb-4">On This Page</h4>
                            <ul className="space-y-3 border-l border-white/10">
                                {SECTIONS.map((s, i) => (
                                    <li key={s.id}>
                                        <a
                                            href={`#${s.id}`}
                                            className="block pl-4 -ml-px border-l border-transparent hover:border-accent-red text-sm text-text-secondary hover:text-white transition-colors"
                                        >
                                            <span className="text-accent-red font-display mr-1">{String(i + 1).padStart(2, '0')}</span> {s.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* Content */}
                    <div className="min-w-0">
                        <p className="text-text-secondary leading-relaxed text-lg mb-6">
                            Tuned Society ("Tuned Society", "we", "us", or "our") operates the Tuned Society
                            mobile app and website, connecting car and bike owners with tuning garages for
                            bookings, community posts, and vehicle services. This policy applies to everyone
                            who uses the app, the website, or creates a garage or vendor account with us.
                        </p>
                        <p className="text-text-secondary leading-relaxed text-lg mb-16">
                            For the purposes of India's Digital Personal Data Protection Act, 2023 ("DPDP
                            Act"), <strong className="text-white">Tuned Society is the Data Fiduciary</strong> responsible
                            for your personal data — the entity that decides why and how it is processed. By
                            creating an account, requesting an OTP, or otherwise using the app, you consent to
                            the collection and processing of your personal data as described in this policy.
                            You may withdraw that consent at any time as described in{' '}
                            <a href="#your-rights" className="text-accent-red hover:text-white transition-colors">Your Rights &amp; Choices</a>,
                            though withdrawal may mean we can no longer provide services that depend on that data.
                        </p>

                        {/* 1. Information We Collect */}
                        <div id="information-we-collect" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">01</span>Information We Collect
                            </h2>

                            <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-3">Account &amp; Identity Information</h3>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                We use your mobile phone number as your primary login credential, verified by
                                a one-time password (OTP) sent via SMS. When you sign up, we also collect a
                                username, and optionally a display name, profile photo, bio, and location you
                                choose to add to your profile.
                            </p>

                            <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-3">Booking &amp; Vehicle Information</h3>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                When you book an appointment with a garage, we collect your name, phone
                                number, vehicle registration number, vehicle model, and any notes you add for
                                the garage — this is what the garage needs to prepare for and complete your
                                service.
                            </p>

                            <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-3">Content You Share</h3>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Posts, photos, videos, comments, likes, follows, and saves you create or make
                                within the app are stored on our cloud storage (Amazon Web Services S3) and,
                                depending on your privacy settings, shown to other users.
                            </p>

                            <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-3">Garage &amp; Vendor Information</h3>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                If you register a garage or vendor account, we additionally collect your
                                business name, address, gallery photos, services, and pricing so customers can
                                find and book with you.
                            </p>

                            <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-3">Marketplace Waitlist</h3>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                If you join the waitlist for our upcoming marketplace, we collect your email
                                address so we can notify you when it launches.
                            </p>

                            <h3 className="text-white font-bold uppercase tracking-wide text-sm mb-3">Device &amp; Usage Information</h3>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                We automatically collect a push-notification token, device type, operating
                                system, app version, IP address, and general usage data (such as which
                                features you use and app crash reports) to keep the app running reliably and
                                to improve it.
                            </p>

                            <div className="bg-white/5 border-l-2 border-accent-red px-6 py-4">
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    <span className="text-white font-bold">What we don't collect: </span>
                                    Tuned Society does not collect financial information (such as card or bank
                                    details), health records, biometric data, or any other category defined as
                                    sensitive personal data under Indian law. If we add payment features in the
                                    future, this policy will be updated before that data is ever collected.
                                </p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 2. How We Use It */}
                        <div id="how-we-use-it" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">02</span>How We Use Your Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-6">We use the information we collect to:</p>
                            <div className="bg-bg-card border border-white/5 p-8 rounded-xl">
                                <ul className="space-y-3">
                                    {[
                                        'Verify your identity and keep your account secure',
                                        'Connect you with garages and process your bookings',
                                        'Show you posts, garages, and content relevant to you',
                                        'Send booking updates, happy codes, and other service notifications',
                                        'Respond to support requests and resolve disputes',
                                        'Detect and prevent fraud, abuse, and policy violations',
                                        'Understand how the app is used so we can fix issues and improve it',
                                        'Let you know when the Tuned Society marketplace and new features launch',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-text-secondary">
                                            <span className="text-accent-red mt-1">▹</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 3. How We Share It */}
                        <div id="how-we-share-it" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">03</span>How We Share Your Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                We do not sell your personal information to advertisers or data brokers. We
                                share information only in the following circumstances:
                            </p>

                            <div className="space-y-6">
                                <div className="bg-bg-card border border-white/5 p-6 rounded-xl">
                                    <h4 className="text-white font-bold uppercase mb-2">With the garage you book</h4>
                                    <p className="text-text-secondary text-sm">
                                        Your name, phone number, and vehicle details are shared with the specific
                                        garage you book an appointment with, so they can prepare for and carry
                                        out the service.
                                    </p>
                                </div>
                                <div className="bg-bg-card border border-white/5 p-6 rounded-xl">
                                    <h4 className="text-white font-bold uppercase mb-2">With service providers</h4>
                                    <p className="text-text-secondary text-sm">
                                        We use trusted infrastructure providers to run Tuned Society — including
                                        cloud hosting and media storage (Amazon Web Services), push notifications
                                        and phone verification (Google Firebase), and an SMS gateway to deliver
                                        OTP codes. These providers process data only on our instructions and only
                                        to the extent needed to provide their service to us.
                                    </p>
                                </div>
                                <div className="bg-bg-card border border-white/5 p-6 rounded-xl">
                                    <h4 className="text-white font-bold uppercase mb-2">For legal reasons</h4>
                                    <p className="text-text-secondary text-sm">
                                        We may disclose information if required by law, legal process, or to
                                        protect the rights, property, or safety of Tuned Society, our users, or
                                        the public.
                                    </p>
                                </div>
                                <div className="bg-bg-card border border-white/5 p-6 rounded-xl">
                                    <h4 className="text-white font-bold uppercase mb-2">In a business transfer</h4>
                                    <p className="text-text-secondary text-sm">
                                        If Tuned Society is involved in a merger, acquisition, or sale of assets,
                                        your information may be transferred as part of that transaction, subject
                                        to this policy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 4. Push Notifications */}
                        <div id="push-notifications" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">04</span>Push Notifications
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We send push notifications for things like booking status updates, likes,
                                comments, follows, and important app announcements. You can turn these off at
                                any time from your device's notification settings — this won't affect your
                                ability to use the app, but you may miss time-sensitive booking updates.
                            </p>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 5. Data Retention */}
                        <div id="data-retention" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">05</span>Data Retention
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We keep your information for as long as your account is active. Booking
                                records may be retained for a longer period where needed for accounting,
                                dispute resolution, or legal compliance. If you delete your account, we remove
                                or anonymize your personal information except where we're required to keep it
                                for the reasons above.
                            </p>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 6. Data Security */}
                        <div id="data-security" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">06</span>Data Security
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                We use industry-standard safeguards to protect your information, including
                                encrypted connections (HTTPS/TLS) between the app and our servers, secure
                                token-based authentication, and access controls that limit who can view your
                                data internally. No method of transmission or storage is 100% secure, but we
                                work to protect your information using practices appropriate to its
                                sensitivity.
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                In the event of a personal data breach, we will notify the Data Protection
                                Board of India and the affected users as required under the DPDP Act, and take
                                immediate steps to contain and remediate the breach.
                            </p>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 7. Your Rights */}
                        <div id="your-rights" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">07</span>Your Rights &amp; Choices
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Depending on where you live, including under India's Digital Personal Data
                                Protection Act, 2023, you have the right to:
                            </p>
                            <div className="bg-bg-card border border-white/5 p-8 rounded-xl">
                                <ul className="space-y-3">
                                    {[
                                        'Access the personal information we hold about you',
                                        'Correct inaccurate or outdated information in your profile',
                                        'Request deletion of your account and associated personal data',
                                        'Withdraw consent for optional data uses, such as marketing notifications',
                                        'Ask how your information has been used and who it has been shared with',
                                        'Nominate another individual to exercise these rights on your behalf in the event of your death or incapacity',
                                        'Lodge a complaint with the Data Protection Board of India if you are unsatisfied with how we handle your request',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-text-secondary">
                                            <span className="text-accent-red mt-1">▹</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className="text-text-secondary leading-relaxed mt-6">
                                To exercise any of these rights, contact us using the details in the{' '}
                                <a href="#contact" className="text-accent-red hover:text-white transition-colors">Contact Us</a> section, or
                                reach our Grievance Officer directly as described in{' '}
                                <a href="#grievance-redressal" className="text-accent-red hover:text-white transition-colors">Grievance Redressal</a> below.
                            </p>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 8. Children's Privacy */}
                        <div id="childrens-privacy" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">08</span>Children's Privacy
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Tuned Society is intended for users who are 18 years of age or older, in line
                                with the vehicle-related services we provide. We do not knowingly collect
                                personal information from anyone under 18. If we learn that we have, we will
                                delete it promptly.
                            </p>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 9. Third-Party Links */}
                        <div id="third-party-links" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">09</span>Third-Party Links &amp; Services
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                The app and website may link to third-party sites or services — such as a
                                garage's own website, app store listings, or maps. This policy doesn't cover
                                those third parties, and we encourage you to review their own privacy policies
                                before sharing information with them.
                            </p>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 10. International Transfers */}
                        <div id="international-transfers" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">10</span>International Data Transfers
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Our servers and cloud infrastructure are hosted with Amazon Web Services. Your
                                information may be processed or stored outside the country you live in. Where
                                this happens, we take steps to keep it protected consistent with this policy.
                            </p>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 11. Grievance Redressal */}
                        <div id="grievance-redressal" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">11</span>Grievance Redressal
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                In accordance with the DPDP Act and the Information Technology Act, 2000, we
                                have appointed a Grievance Officer to address any concerns or complaints about
                                how your personal data is collected, used, or protected. If you're unhappy
                                with how we've handled your data or a request you've made, contact the
                                Grievance Officer directly and we will acknowledge your complaint and respond
                                within 30 days.
                            </p>
                            <div className="inline-block px-6 py-4 bg-white/5 border-l-2 border-accent-red">
                                <p className="text-white font-bold">Grievance Officer — Tuned Society</p>
                                <a href="mailto:tunedsociety7@gmail.com" className="text-accent-red hover:text-white transition-colors">
                                    tunedsociety7@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 12. Changes */}
                        <div id="changes" className="mb-16 scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">12</span>Changes to This Policy
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We may update this policy from time to time as Tuned Society grows — for
                                example, when we launch the marketplace. We'll update the "Effective Date" at
                                the top of this page, and where a change is significant, we'll let you know
                                in the app before it takes effect.
                            </p>
                        </div>

                        <div className="w-full h-px bg-white/10 my-12" />

                        {/* 13. Contact */}
                        <div id="contact" className="scroll-mt-28">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase">
                                <span className="text-accent-red font-display mr-2">13</span>Contact Us
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                If you have questions about this policy or how your information is handled,
                                reach out to us:
                            </p>
                            <div className="inline-block px-6 py-4 bg-white/5 border-l-2 border-accent-red">
                                <p className="text-white font-bold">Tuned Society</p>
                                <a href="mailto:tunedsociety7@gmail.com" className="text-accent-red hover:text-white transition-colors">
                                    tunedsociety7@gmail.com
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
