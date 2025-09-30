import React, { useState, useRef, useEffect } from "react";

/**
 * MediaSection — Promo Video + Gallery (dark, minimal)
 * - Left: responsive video (native <video> or YouTube iframe via youtubeId)
 * - Right: 2×2 gallery with subtle hover zoom & gradients
 * - Fully responsive: stacks on mobile
 *
 * Usage:
 * <MediaSection videoSrc="/videos/promo.mp4" poster="/images/promo-poster.jpg"
 *   gallery={["/images/g1.jpg","/images/g2.jpg","/images/g3.jpg","/images/g4.jpg"]} />
 * // or YouTube
 * <MediaSection youtubeId="dQw4w9WgXcQ" /> 
 */
export default function MediaSection({
    videoSrc = "/videos/promo.mp4",
    poster = "/images/promo-poster.webp",
    youtubeId,
    gallery = [
        "/opt-images/gallery-1-1000.webp",
        "/opt-images/gallery-2-1000.webp",
        "/opt-images/gallery-3-1000.webp",
        "/opt-images/gallery-4-1000.webp",
    ],
}) {
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
        <section id="media" className="relative bg-black text-white px-6 md:px-10 py-16 md:py-24">
            <div className="mx-auto max-w-7xl grid grid-cols-12 gap-6 md:gap-10 items-start">
                {/* Video */}
                <div className="col-span-12 lg:col-span-7">
                    <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]">
                        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/[0.03] blur-2xl" />
                        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/[0.03] blur-2xl" />

                        <div className="relative aspect-video">
                            {youtubeId ? (
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                                    title="Promo video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    className="absolute inset-0 w-full h-full"
                                    controls
                                    preload="metadata"
                                    poster={poster}
                                >
                                    <source src={videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            {/* top/bottom fades */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/70 to-transparent" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-sm text-zinc-300">
                        <PlayIcon className="w-4 h-4" aria-hidden="true" />
                        <span>Promo film: craftsmanship & assembly</span>
                    </div>
                </div>

                {/* Gallery */}
                <div className="col-span-12 lg:col-span-5">
                    <div className="grid grid-cols-2 gap-4 md:gap-5">
                        {gallery.slice(0, 4).map((src, i) => (
                            <figure key={src + i} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                                <img
                                    src={src}
                                    alt={`Gallery ${i + 1}`}
                                    loading="lazy"
                                    className="w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
                            </figure>
                        ))}
                    </div>

                    {/* Explore dropdown (Men / Women / Kids) */}
                    <div className="mt-5 relative inline-block text-left">
                        <button
                            ref={btnRef}
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-white text-black border border-white/10 hover:bg-zinc-100 transition"
                        >
                            Explore collection
                            <svg
                                viewBox="0 0 24 24"
                                className="ml-2 w-4 h-4"
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
                                className="absolute left-0 mt-2 w-44 rounded-lg border border-white/10 bg-black/95 backdrop-blur p-1 shadow-lg z-10"
                            >
                                {[
                                    { label: "Men", href: "/menPage" },
                                    { label: "Women", href: "/womenPage" },
                                ].map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        role="menuitem"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-3 py-2 rounded-md text-sm text-zinc-200 hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------------- Icons ---------------- */
function PlayIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}
