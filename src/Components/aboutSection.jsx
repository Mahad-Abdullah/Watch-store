import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function AboutSection() {
    // Dropdown state (for Explore)
    const [menuOpen, setMenuOpen] = useState(false);
    const btnRef = useRef(null);
    const panelRef = useRef(null);

    // Close on outside click / Esc
    useEffect(() => {
        const onDocClick = (e) => {
            if (!btnRef.current?.contains(e.target) && !panelRef.current?.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <section
            id="about"
            className="
        relative bg-black text-white
        px-4 sm:px-6 md:px-10
        py-14 sm:py-16 md:py-24
      "
        >
            <div
                className="
          mx-auto max-w-7xl
          grid grid-cols-1 md:grid-cols-12
          gap-8 sm:gap-10 md:gap-12
          items-center
        "
            >
                {/* Text */}
                <div className="md:col-span-6">
                    <p className="uppercase tracking-widest text-[10px] sm:text-[11px] text-white/50">
                        Luxury Watches
                    </p>

                    <h2
                        className="
              mt-2
              text-3xl sm:text-4xl md:text-5xl
              font-extrabold leading-tight
            "
                    >
                        Crafting Moments That Last Forever
                    </h2>

                    <p
                        className="
              mt-4
              text-[15px] sm:text-base md:text-lg
              text-zinc-300
              max-w-prose
            "
                    >
                        Precision-engineered timepieces for those who value elegance and
                        performance. Every detail is considered — from movement to materials —
                        for a lifetime on the wrist.
                    </p>

                    {/* Features */}
                    <ul className="mt-6 space-y-3 text-[15px] sm:text-sm md:text-base text-zinc-300">
                        <FeatureItem>Swiss automatic movement</FeatureItem>
                        <FeatureItem>Scratch-resistant sapphire crystal</FeatureItem>
                        <FeatureItem>Water resistance up to 100m</FeatureItem>
                    </ul>

                    {/* CTAs */}
                    <div className="mt-7 flex flex-wrap gap-3">
                        <div className="relative inline-block text-left">
                            <button
                                ref={btnRef}
                                onClick={() => setMenuOpen((v) => !v)}
                                aria-haspopup="menu"
                                aria-expanded={menuOpen}
                                className="
                  inline-flex items-center justify-center
                  h-11 sm:h-12 px-5 sm:px-6
                  rounded-full
                  bg-white text-black
                  border border-white/10
                  hover:bg-zinc-100 transition
                  text-sm sm:text-base
                "
                            >
                                Explore collection
                                <svg
                                    viewBox="0 0 24 24"
                                    className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            {menuOpen && (
                                <div
                                    ref={panelRef}
                                    role="menu"
                                    className="
                    absolute left-0 mt-2 w-48
                    rounded-xl
                    border border-white/10
                    bg-black/95 backdrop-blur
                    p-1 shadow-2xl z-10
                  "
                                >
                                    {[
                                        { label: "Men", to: "/menPage" },
                                        { label: "Women", to: "/womenPage" },
                                    ].map((item) => (
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            role="menuitem"
                                            onClick={() => setMenuOpen(false)}
                                            className="
                        block px-3 py-2 rounded-lg
                        text-sm sm:text-[15px]
                        text-zinc-200
                        hover:bg-white/10 focus:bg-white/10 focus:outline-none
                      "
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div
                        className="
              mt-10
              grid grid-cols-3
              gap-4 sm:gap-6
              max-w-xs sm:max-w-md
            "
                    >
                        <Stat k="50+" v="Collections" />
                        <Stat k="24/7" v="Support" />
                        <Stat k="99%" v="Precision" />
                    </div>
                </div>

                {/* Image */}
                <div className="md:col-span-6">
                    <div
                        className="
              relative rounded-2xl
              border border-white/10
              bg-gradient-to-br from-zinc-900 to-zinc-800
              p-2 sm:p-3 md:p-4 overflow-hidden
            "
                    >
                        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/[0.03] blur-2xl" />
                        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/[0.03] blur-2xl" />

                        {/* Responsive image with lazy loading */}
                        <img
                            loading="lazy"
                            src="/opt-images/11-1000.webp"
                            srcSet="/opt-images/11-1000.webp 1000w, /opt-images/11-1400.webp 1400w"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                            alt="Luxury watch close-up"
                            className="
                relative z-10 block
                w-full h-auto
                rounded-xl object-contain
                shadow-[0_10px_60px_rgba(0,0,0,0.6)]
              "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------------- Small Bits ---------------- */
function FeatureItem({ children }) {
    return (
        <li className="flex items-start gap-2.5 sm:gap-3">
            <CheckIcon className="mt-[3px] w-4 h-4 sm:w-5 sm:h-5 text-white/80" aria-hidden="true" />
            <span className="leading-relaxed">{children}</span>
        </li>
    );
}

function Stat({ k, v }) {
    return (
        <div>
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold">{k}</div>
            <div className="text-zinc-400 text-xs sm:text-sm">{v}</div>
        </div>
    );
}

/* ---------------- Icons ---------------- */
function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m20 6-11 11L4 12" />
        </svg>
    );
}
