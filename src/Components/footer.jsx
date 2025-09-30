import React from "react";
import Privacy from "./privacy";


export default function SiteFooter() {
    return (
        <footer className="bg-black text-white border-t border-white/10">
            {/* Top section */}
            <div className="px-6 md:px-10">
                <div className="mx-auto max-w-7xl py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {/* Left: Brand */}
                    <div className="sm:pr-8">
                        <a href="#" className="font-semibold text-lg tracking-wide">Chrono</a>
                        <p className="mt-2 text-sm text-white/70 max-w-xs">
                            Luxury timepieces crafted with precision for everyday excellence.
                        </p>
                    </div>

                    {/* Center: Links (row) */}
                    <div className="flex items-start justify-center">
                        <FooterCol
                            title="Shop"
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Men", href: "/menPage" },
                                { label: "Women", href: "/womenPage" },
                            ]}
                        />
                    </div>

                    {/* Right: Icons */}
                    <div className="flex sm:justify-end justify-center items-start gap-4 text-white/70">
                        <a href="https://www.instagram.com/dailywatch/?hl=en" aria-label="Instagram" className="hover:text-white">
                            <InstagramIcon className="w-5 h-5" />
                        </a>
                        <a href="https://x.com/LuxuryWatchGuy1?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" aria-label="Twitter" className="hover:text-white">
                            <TwitterIcon className="w-5 h-5" />
                        </a>
                        <a href="http://www.youtube.com/@AChannelAboutWatches" aria-label="YouTube" className="hover:text-white">
                            <YoutubeIcon className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 md:px-10 border-t border-white/10">
                <div className="mx-auto max-w-7xl h-14 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
                    <div>© {new Date().getFullYear()} Chrono — Luxury Watches. All rights reserved.</div>
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1">
                            <LockIcon className="w-4 h-4" /> Secured payments
                        </span>
                        <span>•</span>
                        <a href="/privacy" className="hover:text-white">Privacy</a>
                        <a href="/terms" className="hover:text-white">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ---------------- Small Components ---------------- */
function FooterCol({ title, items }) {
    return (
        <div className="w-full">
            <div className="font-semibold mb-3 text-center">{title}</div>
            <ul className="text-sm text-white/70 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {items.map((it) => (
                    <li key={it.label}>
                        <a href={it.href} className="hover:text-white whitespace-nowrap">
                            {it.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ---------------- Icons (consistent stroke SVGs) ---------------- */
function InstagramIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.9" />
        </svg>
    );
}

// Using an "X" glyph to ensure visibility/reliability for Twitter/X
function TwitterIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M22 4s-.8 3-3 4.5c1 10-9 16-16 9 3 0 5-1 6-2-3-1-5-3-5-6 .6.3 1.2.4 1.9.4-2-1.3-3.1-3.6-2.6-6 2.2 2.7 5.4 4.4 9 4.6-.5-2.2 1.2-4.1 3.4-4.1 1 0 1.9.4 2.6 1 0 0 1.6-.3 2.7-1z" />
        </svg>
    );
}

function YoutubeIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="2.5" y="5" width="19" height="14" rx="3.5" />
            <path d="M10 9.5l5 2.5-5 2.5V9.5z" />
        </svg>
    );
}

function LockIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}
