import React from "react";

export default function ShowcaseSection({
    images = {
        a: "/opt-images/showcase-1-1000.webp",
        b: "/opt-images/showcase-2-1000.webp",
        c: "/opt-images/showcase-3-1000.webp",
    },
}) {
    return (
        <section id="showcase" className="relative bg-black text-white px-6 md:px-10 py-16 md:py-24">
            <div className="mx-auto max-w-7xl grid grid-cols-12 gap-8 md:gap-10 items-center">
                {/* Copy */}
                <div className="col-span-12 md:col-span-5">
                    <p className="uppercase tracking-widest text-[11px] text-white/50">Showcase</p>
                    <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                        Redefining the art of timekeeping
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-zinc-300 max-w-prose">
                        Precision movements, sapphire clarity, and enduring materials. Explore signature pieces engineered for everyday excellence.
                    </p>

                    <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                        <li className="flex items-center gap-2"><Dot /> 70h power reserve</li>
                        <li className="flex items-center gap-2"><Dot /> Chronometer‑grade accuracy</li>
                        <li className="flex items-center gap-2"><Dot /> 100m water resistance</li>
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="/menPage" className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-white text-black border border-white/10 hover:bg-zinc-100 transition">Shop Men</a>
                        <a href="/womenPage" className="inline-flex items-center justify-center h-10 px-5 rounded-full border border-white/20 hover:bg-white/5 transition">Shop Women</a>
                    </div>
                </div>

                {/* Collage */}
                <div className="col-span-12 md:col-span-7">
                    <div className="grid grid-cols-12 grid-rows-2 gap-4 md:gap-5">
                        {/* Large tile */}
                        <figure className="relative col-span-12 md:col-span-7 row-span-2 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                            <GlowDecor />
                            <img src={images.a} alt="Showcase watch A" loading="lazy" className="w-full h-full object-cover" />
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                <SpecBadge>Automatic</SpecBadge>
                                <SpecBadge>Sapphire</SpecBadge>
                            </div>
                            <div className="absolute left-4 bottom-4 text-sm text-zinc-200">
                                <div className="font-semibold">LW‑01 Classic</div>
                                <div className="text-white/70">From $1,899</div>
                            </div>
                        </figure>

                        {/* Small tiles */}
                        <figure className="relative col-span-6 md:col-span-5 row-span-1 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                            <GlowDecor />
                            <img src={images.b} alt="Showcase watch B" loading="lazy" className="w-full h-full object-cover" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute left-4 bottom-4 text-sm text-zinc-200">
                                <div className="font-semibold">LW‑02 Diver</div>
                                <div className="text-white/70">100m • Ceramic bezel</div>
                            </div>
                        </figure>

                        <figure className="relative col-span-6 md:col-span-5 row-span-1 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                            <GlowDecor />
                            <img src={images.c} alt="Showcase watch C" loading="lazy" className="w-full h-full object-cover" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute left-4 bottom-4 text-sm text-zinc-200">
                                <div className="font-semibold">LW‑03 Metro</div>
                                <div className="text-white/70">Slim • 38mm</div>
                            </div>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------------- UI Bits ---------------- */
function SpecBadge({ children }) {
    return (
        <span className="inline-flex items-center h-7 px-3 rounded-full border border-white/15 bg-white/5 text-xs text-white/85">
            {children}
        </span>
    );
}
function Dot() { return <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/70" aria-hidden="true" />; }
function GlowDecor() {
    return (
        <>
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/[0.04] blur-2xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/[0.04] blur-2xl" />
        </>
    );
}
