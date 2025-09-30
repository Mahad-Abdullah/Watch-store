import React, { useEffect, useRef, useState } from "react";

/**
 * Services / Features Grid — with Clickable Cards + Dynamic Modal
 * - Cards stay as <a> (SEO/deeplink), but onClick opens modal with item-specific content
 * - Keyboard: Enter/Space to open; ESC to close
 * - Accessible dialog with focus management
 */
export default function ServicesSection() {
    const items = [
        {
            title: "Custom Engraving",
            desc: "Personalize caseback & clasp.",
            Icon: EngraveIcon,
            href: "#engraving",
            details: {
                long:
                    "Mark milestones with precision engraving performed by our master technicians. Choose fonts, layouts, and placements crafted for legibility and longevity.",
                bullets: [
                    "Caseback, clasp & rotor engraving options",
                    "Mono, serif & script typefaces",
                    "Proofs shared within 24–48 hours",
                    "Lead time: typically 3–5 business days",
                ],
                ctaLabel: "Start your engraving",
            },
        },
        {
            title: "Members Club",
            desc: "Early releases & invites.",
            Icon: CrownIcon,
            href: "#club",
            details: {
                long:
                    "An insider program for serious collectors. Priority access to limited drops, atelier visits, and private previews.",
                bullets: [
                    "Early allocations on new references",
                    "Private salon & event invitations",
                    "Annual movement health check",
                    "Concierge support 7 days a week",
                ],
                ctaLabel: "Apply for membership",
            },
        },
        {
            title: "Lifetime Care",
            desc: "Free inspections & adjustments.",
            Icon: WrenchIcon,
            href: "#care",
            details: {
                long:
                    "Keep your watch perfectly regulated. Enjoy complimentary inspections, pressure tests, and bracelet sizing—forever.",
                bullets: [
                    "Complimentary pressure & timing tests",
                    "Bracelet/strap sizing & micro-adjust",
                    "Ultrasonic exterior clean",
                    "Service interval reminders",
                ],
                ctaLabel: "Book a care visit",
            },
        },
        {
            title: "Worldwide Shipping",
            desc: "Insured express delivery.",
            Icon: TruckIcon,
            href: "#shipping",
            details: {
                long:
                    "Dispatch within 24 hours on in-stock pieces. Fully insured, trackable delivery to 100+ countries.",
                bullets: [
                    "Express courier: 2–5 business days",
                    "Full value insurance in transit",
                    "In-box condition report & kit",
                    "Duties & taxes guidance provided",
                ],
                ctaLabel: "View shipping options",
            },
        },
        {
            title: "Bespoke Design",
            desc: "One-off builds & dials.",
            Icon: WandIcon,
            href: "#bespoke",
            details: {
                long:
                    "Collaborate with our studio on singular pieces—custom dials, materials, hands, and treatments to your brief.",
                bullets: [
                    "Dial colorways & textures (fumé, guilloché)",
                    "Handsets, markers, lume specs",
                    "Case & bezel material options",
                    "Design proofs and prototype review",
                ],
                ctaLabel: "Start a bespoke brief",
            },
        },
        {
            title: "Certified Pre-Owned",
            desc: "Authenticated, warranty included.",
            Icon: ShieldCheckIcon,
            href: "#cpo",
            details: {
                long:
                    "Every CPO piece undergoes a 50-point inspection and timekeeping test. Comes with documentation and a 24-month warranty.",
                bullets: [
                    "50-point authentication process",
                    "Timegrapher performance report",
                    "Polishing only on request",
                    "24-month CPO warranty",
                ],
                ctaLabel: "Explore CPO collection",
            },
        },
    ];

    const [active, setActive] = useState(null);

    // Close on ESC
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") setActive(null);
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    return (
        <section id="features" className="relative bg-black text-white px-6 md:px-10 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="max-w-2xl">
                    <p className="uppercase tracking-widest text-[11px] text-white/50">Services</p>
                    <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                        Exceptional care, end-to-end
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-zinc-300">
                        From personalization to lifetime maintenance, we support every step of your ownership journey.
                    </p>
                </div>

                {/* Grid */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {items.map((item) => (
                        <CardLink key={item.title} item={item} onOpen={() => setActive(item)} />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {active && <DetailsModal item={active} onClose={() => setActive(null)} />}
        </section>
    );
}

/* ---------------- Card as clickable <a> with modal trigger ---------------- */
function CardLink({ item, onOpen }) {
    const { title, desc, Icon, href } = item;
    return (
        <a
            href={href}
            onClick={(e) => {
                e.preventDefault();
                onOpen();
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen();
                }
            }}
            className="group relative rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] focus:outline-none focus:ring-2 focus:ring-white/20"
            tabIndex={0}
            aria-label={`${title} — learn more`}
        >
            {/* soft corner glow */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/[0.03] blur-2xl" />
            <div className="relative p-5 md:p-6">
                <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full border border-white/15 bg-white/5 grid place-items-center text-white/90">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-semibold tracking-tight">{title}</h3>
                        <p className="mt-1 text-sm text-zinc-400">{desc}</p>
                    </div>
                </div>

                <div className="mt-5 flex items-center gap-1 text-sm text-zinc-300">
                    <span className="opacity-80 group-hover:opacity-100">Learn more</span>
                    <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-0.5 transition" aria-hidden="true" />
                </div>
            </div>
        </a>
    );
}

/* ---------------- Modal ---------------- */
function DetailsModal({ item, onClose }) {
    const closeRef = useRef(null);

    useEffect(() => {
        // Focus close button on open
        closeRef.current?.focus();
    }, []);

    return (
        <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-title"
        >
            {/* Backdrop */}
            <button
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close dialog"
            />
            {/* Panel */}
            <div className="relative mx-auto mt-[10vh] w-[92%] max-w-2xl rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl">
                <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-full border border-white/15 bg-white/5 grid place-items-center text-white/90">
                            <item.Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                            <h3 id="service-title" className="text-xl md:text-2xl font-semibold">
                                {item.title}
                            </h3>
                            <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
                        </div>

                        <button
                            ref={closeRef}
                            onClick={onClose}
                            className="ml-auto rounded-full border border-white/20 px-3 py-1 text-sm text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                            Close
                        </button>
                    </div>

                    {/* Body */}
                    <div className="mt-5">
                        <p className="text-white/80">{item.details?.long}</p>
                        {!!item.details?.bullets?.length && (
                            <ul className="mt-4 list-disc pl-6 text-white/70 space-y-1">
                                {item.details.bullets.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href={item.href}
                            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2 text-sm border border-white/10 hover:bg-zinc-100 transition"
                        >
                            {item.details?.ctaLabel || "Learn more"}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                        <button
                            onClick={onClose}
                            className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/5 transition"
                        >
                            Not now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------------- Icons (inline SVG) ---------------- */
function EngraveIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 19V5" />
            <path d="M7 12h10" />
            <path d="m3 21 3-3" />
            <path d="m21 3-3 3" />
        </svg>
    );
}
function CrownIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 7l4 4 5-8 5 8 4-4v10H3z" />
        </svg>
    );
}
function WrenchIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4z" />
        </svg>
    );
}
function TruckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 7h13v8H3z" />
            <path d="M16 10h4l1 3v2h-5z" />
            <circle cx="7.5" cy="17.5" r="1.5" />
            <circle cx="18.5" cy="17.5" r="1.5" />
        </svg>
    );
}
function WandIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 21 21 3" />
            <path d="M15 3h6v6" />
        </svg>
    );
}
function ShieldCheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
function ArrowRight(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
