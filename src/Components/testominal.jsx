import React from "react";

/**
 * TestimonialsSection — Customer Reviews
 * Dark, minimal review grid with star ratings to match the site's style.
 * Place avatar images in public/images (or leave empty to use initials badge).
 */
export default function TestimonialsSection() {
    const reviews = [
        {
            name: "Jennifer",
            role: "Verified Buyer",
            text:
                "Absolutely love the craftsmanship. The weight, the dial clarity, everything feels premium.",
            rating: 5,
            avatar: "/Images/client-1.webp",
        },
        {
            name: "Joseph",
            role: "Verified Buyer",
            text:
                "Fast insured shipping and the bracelet adjustment was spot on. Will buy again.",
            rating: 5,
            avatar: "/Images/client-2.webp",
        },
        {
            name: "John Smith",
            role: "Verified Buyer",
            text:
                "The LW‑02 Diver is my daily. Sapphire is scratch‑free after months of wear.",
            rating: 4.8,
            avatar: "/Images/client-3.webp",
        },
    ];

    return (
        <section id="testimonials" className="relative bg-black text-white px-6 md:px-10 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="max-w-2xl">
                    <p className="uppercase tracking-widest text-[11px] text-white/50">Testimonials</p>
                    <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                        What our customers say
                    </h2>
                    <div className="mt-4 flex items-center gap-3 text-sm text-zinc-300">
                        <StarRow value={4.9} />
                        <span className="font-semibold">4.9/5</span>
                        <span className="text-white/60">•</span>
                        <span>1,200+ verified reviews</span>
                    </div>
                </div>

                {/* Grid */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {reviews.map((r) => (
                        <article
                            key={r.name}
                            className="relative rounded-xl border border-white/10 bg-white/[0.03] p-5 md:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                        >
                            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/[0.03] blur-2xl" />

                            <QuoteIcon className="w-6 h-6 text-white/30" aria-hidden="true" />

                            <p className="mt-3 text-sm text-zinc-300 leading-6">{r.text}</p>

                            <div className="mt-5 flex items-center justify-between">
                                <div className="flex items-center gap-3 min-w-0">
                                    <Avatar name={r.name} src={r.avatar} />
                                    <div className="min-w-0">
                                        <div className="font-semibold truncate">{r.name}</div>
                                        <div className="text-xs text-white/60">{r.role}</div>
                                    </div>
                                </div>
                                <StarRow value={r.rating} small />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------------- UI Bits ---------------- */
function StarRow({ value = 5, small = false }) {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    const size = small ? "w-4 h-4" : "w-5 h-5";
    return (
        <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => {
                if (i < full) return <StarSolid key={i} className={`${size} text-yellow-400`} />;
                if (i === full && half) return <StarHalf key={i} className={`${size} text-yellow-400`} />;
                return <StarOutline key={i} className={`${size} text-white/30`} />;
            })}
        </div>
    );
}

function Avatar({ name, src }) {
    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className="w-10 h-10 rounded-full object-cover border border-white/10"
                loading="lazy"
            />
        );
    }
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    return (
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 grid place-items-center text-sm">
            {initials}
        </div>
    );
}

/* ---------------- Icons ---------------- */
function QuoteIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M7 7h5v5H7z" />
            <path d="M7 12c0 3-2 5-5 5" />
            <path d="M17 7h5v5h-5z" />
            <path d="M17 12c0 3-2 5-5 5" />
        </svg>
    );
}
function StarSolid(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 .587l3.668 7.431 8.204 1.193-5.936 5.788 1.402 8.168L12 18.896l-7.338 3.871 1.402-8.168L.128 9.211l8.204-1.193z" />
        </svg>
    );
}
function StarOutline(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
        </svg>
    );
}
function StarHalf(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <defs>
                <linearGradient id="halfGrad" x1="0" x2="1">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                </linearGradient>
            </defs>
            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" fill="url(#halfGrad)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
