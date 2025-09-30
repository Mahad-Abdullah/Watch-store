import React, { useEffect, useState } from "react";

export default function HeroSection({
    price = "$499",
    details = "Automatic • Sapphire • 100m",
}) {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 60 * 1000);
        return () => clearInterval(id);
    }, []);
    const timeText = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <section className="relative w-full overflow-hidden bg-black text-white px-4 sm:px-6 md:px-10 min-h-[88vh] md:min-h-screen">
            {/* subtle vignette background */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(59,130,246,0.08),transparent_60%),radial-gradient(60%_50%_at_90%_10%,rgba(59,130,246,0.05),transparent_70%)]" />

            {/* Big background word */}
            <h1
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[18vw] sm:text-[16vw] md:text-[13vw] font-extrabold tracking-[0.18em] text-white/5 text-center select-none z-0"
            >
                LUXURY
            </h1>

            {/* Bottom cover gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent z-[1]" />

            {/* Top-right theme dots (desktop only) */}
            <div className="absolute right-4 sm:right-6 top-4 sm:top-6 hidden md:flex items-center gap-2 z-30">
                <span className="w-3 h-3 rounded-full bg-white/80" />
                <span className="w-3 h-3 rounded-full bg-zinc-400/80" />
                <span className="w-3 h-3 rounded-full bg-zinc-700" />
            </div>

            <div className="relative mx-auto max-w-7xl pt-20 sm:pt-24 md:pt-28 pb-14 sm:pb-16 md:pb-20 z-10">
                {/* Grid: stacks on mobile; 6/6 on md+ */}
                <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
                    {/* Left rail (price & details) – show from md+ */}
                    <div className="hidden md:flex md:col-span-3 md:justify-start">
                        <div className="flex flex-col gap-4 text-zinc-200">
                            <RailChip icon={<TagIcon className="w-4 h-4" />} title="Price" subtitle={price} />
                            <RailChip icon={<InfoIcon className="w-4 h-4" />} title="Details" subtitle={details} />
                        </div>
                    </div>

                    {/* Center: Watch + overlays */}
                    <div className="col-span-12 md:col-span-6">
                        <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px]">
                            <img
                                loading="eager"
                                src="/opt-images/hero-watch (1)-1000.webp"
                                srcSet="/opt-images/hero-watch (1)-600.webp 600w, /opt-images/hero-watch (1)-1000.webp 1000w, /opt-images/hero-watch (1)-1400.webp 1400w"
                                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 420px"
                                alt="Luxury watch"
                                className="block w-full h-auto rounded-lg shadow-[0_10px_60px_rgba(0,0,0,0.6)]"
                            />

                            {/* top/bottom gradients to help legibility */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 md:h-36 bg-gradient-to-b from-black/90 to-transparent z-20" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 md:h-40 bg-gradient-to-t from-black/90 to-transparent z-20" />

                            {/* Time overlay */}
                            <div className="absolute inset-0 z-30 grid place-items-center pointer-events-none pt-6 sm:pt-8">
                                <span className="text-white/95 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] mix-blend-screen">
                                    {timeText}
                                </span>
                            </div>

                            {/* Callouts – hide on xs for clarity */}
                            <div className="absolute -left-[8%] sm:-left-[10%] top-[38%] -translate-y-1/2 z-40 hidden sm:block">
                                <Callout labelTop="200+" labelBottom="Craftsmanship" side="left" />
                            </div>
                            <div className="absolute left-[60%] bottom-[28%] z-40 hidden sm:block">
                                <Callout labelTop="100%" labelBottom="Water Resistance" side="right" />
                            </div>
                        </div>
                    </div>

                    {/* Right copy (flows in grid; appears under image on mobile) */}
                    <div className="col-span-12 md:col-span-3 md:justify-self-end">
                        <p className="text-sm sm:text-[15px] md:text-base text-zinc-300 leading-6 max-w-prose md:max-w-none">
                            Experience a realm where precision transcends mere functionality. Crafted for those who
                            demand elegance and performance.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll indicator (hide on very small; show from sm) */}
            <div className="absolute left-6 sm:left-12 md:left-16 bottom-10 sm:bottom-16 md:bottom-24 hidden sm:flex flex-col items-center gap-2 text-zinc-300 text-xs z-30">
                <span>Scroll</span>
                <span>Down</span>
                <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center">
                    <ArrowDown className="w-3.5 h-3.5" />
                </div>
            </div>
        </section>
    );
}

/* ---------------- Small Components ---------------- */
function RailChip({ icon, title, subtitle }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-white/15 bg-white/5 grid place-items-center">
                {icon}
            </div>
            <div className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] sm:text-xs leading-tight">
                <div className="text-white/80 font-medium">{title}</div>
                <div className="text-white/60">{subtitle}</div>
            </div>
        </div>
    );
}

function Callout({ labelTop, labelBottom, side = "right" }) {
    const isRight = side === "right";
    return (
        <div className={`relative flex items-center ${isRight ? "flex-row" : "flex-row-reverse"}`}>
            <div className="relative w-4 h-4">
                <span className="absolute inset-0 rounded-full border-2 border-white/80" />
                <span className="absolute inset-1 rounded-full bg-white/80" />
            </div>
            <div className={`h-[1px] w-14 sm:w-20 md:w-24 bg-white/60 ${isRight ? "ml-3" : "mr-3"}`} />
            <div className="text-[10px] sm:text-[11px] md:text-xs text-white/90">
                <div className="font-semibold leading-none">{labelTop}</div>
                <div className="text-white/70 leading-tight">{labelBottom}</div>
            </div>
        </div>
    );
}

/* ---------------- Icons ---------------- */
function ArrowDown(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
        </svg>
    );
}
function TagIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 10 12 2H4v8l8 8 8-8z" />
            <circle cx="7" cy="7" r="1.5" />
        </svg>
    );
}
function InfoIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    );
}
