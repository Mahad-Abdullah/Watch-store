import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useUI } from "../state/ui-store";

/* =========================
   MEN PAGE
========================= */
const Men = () => {
    const [sp] = useSearchParams();
    const pid = sp.get("pid");
    const shouldOpen = sp.get("modal") === "1";
    const { openPreview, state, closePreview } = useUI();

    // Open global preview (URL param flow)
    useEffect(() => {
        if (pid && shouldOpen) {
            openPreview({ id: pid }); // Or provide full product object if available
        }
    }, [pid, shouldOpen, openPreview]);

    const watches = [
        { id: 30, watchImage: "/Images/w1.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 31, watchImage: "/Images/w2.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 32, watchImage: "/Images/w3.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 33, watchImage: "/Images/w4.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 34, watchImage: "/Images/w5.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 35, watchImage: "/Images/w6.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 36, watchImage: "/Images/w7.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 37, watchImage: "/Images/w8.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 38, watchImage: "/Images/w10.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 39, watchImage: "/Images/w11.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 40, watchImage: "/Images/w12.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 41, watchImage: "/Images/w13.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 42, watchImage: "/Images/w14.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 43, watchImage: "/Images/w15.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
        { id: 44, watchImage: "/Images/w16.webp", watchName: "Aspire", discription: "Women's Leather Watch", price: "1200$", section: "women" },
    ];

    // Local modal support (tap card to open)
    const [active, setActive] = useState(null);

    // Close local modal on ESC
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setActive(null);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div className="relative text-white max-w-7xl mx-auto py-24 px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {watches.map((watch) => (
                    <WatchCard key={watch.id} watch={watch} onOpen={() => setActive(watch)} />
                ))}
            </div>

            {/* Local modal */}
            {active && <DetailsModal watch={active} onClose={() => setActive(null)} />}

            {/* Global preview modal (URL param / notifications) */}
            {state.previewItem && (
                <DetailsModal watch={state.previewItem} onClose={closePreview} />
            )}
        </div>
    );
};

export default Men;

/* =========================
   CARD
========================= */
function WatchCard({ watch, onOpen }) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen();
                }
            }}
            className="cursor-pointer p-4 sm:p-5 text-white flex flex-col justify-between items-stretch rounded-2xl gap-4 border border-white/10 bg-white/5 hover:bg-white/10 transition shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label={`${watch.watchName} — ${watch.discription}`}
        >
            <img
                src={`/opt-images/${watch.id}-1000.webp`}
                srcSet={`/opt-images/${watch.id}-1000.webp 1000w, /opt-images/${watch.id}-1400.webp 1400w`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt={watch.watchName}
                loading="lazy"
                decoding="async"
                width="1000"
                height="750"
                className="w-full h-60 sm:h-64 md:h-72 object-cover rounded-xl"
            />

            <div className="px-0.5">
                <h3 className="font-bold text-lg sm:text-xl">{watch.watchName}</h3>
                <p className="text-slate-300 text-sm md:text-base">{watch.discription}</p>
                <p className="mt-1 text-white/90">{watch.price}</p>
            </div>
        </div>
    );
}

/* =========================
   DETAILS MODAL (responsive)
========================= */
function DetailsModal({ watch, onClose }) {
    const closeRef = useRef(null);
    const panelRef = useRef(null);
    const { addToCart } = useUI();
    const [qty, setQty] = useState(1);

    // Lock bg scroll + trap Esc + focus close
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && onClose?.();
        document.addEventListener("keydown", onKey);
        const t = setTimeout(() => closeRef.current?.focus(), 0);
        return () => {
            document.body.style.overflow = prev;
            document.removeEventListener("keydown", onKey);
            clearTimeout(t);
        };
    }, [onClose]);

    // Price helpers
    const parsePrice = useCallback(
        (p) => (typeof p === "number" ? p : Number(String(p).replace(/[^0-9.]/g, "")) || 0),
        []
    );
    const priceNumber = parsePrice(watch?.price);
    const unitLabel =
        typeof watch?.price === "string"
            ? watch.price
            : new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(priceNumber);

    const subtotal = priceNumber * qty;
    const subtotalLabel = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
    }).format(subtotal);

    // Qty handlers
    const dec = () => setQty((q) => Math.max(1, q - 1));
    const inc = () => setQty((q) => Math.min(99, q + 1));
    const onChangeQty = (e) => {
        const n = Math.min(99, Math.max(1, Number(String(e.target.value).replace(/\D/g, "")) || 1));
        setQty(n);
    };

    const handleAdd = () => {
        addToCart({
            id: watch.id,
            name: watch.watchName,
            price: priceNumber,
            image: watch.watchImage ?? `/opt-images/${watch.id}-1000.webp`,
            quantity: qty,
            section: watch.section ?? "men",
        });
        onClose?.();
    };

    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-modal-title"
        >
            {/* Backdrop */}
            <button
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                aria-label="Close"
                onClick={onClose}
            />

            {/* Panel: column on mobile, row on lg */}
            <div
                ref={panelRef}
                className="
          relative mx-auto
          w-[min(100vw-1.5rem,1100px)]
          max-h-[min(88vh,820px)]
          rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl
          overflow-hidden
          flex flex-col lg:flex-row
        "
            >
                {/* Left: Image */}
                <div className="lg:w-[48%] max-lg:h-60 sm:max-lg:h-72 md:max-lg:h-80 bg-black/20">
                    <img
                        src={`/opt-images/${watch.id}-1000.webp`}
                        srcSet={`/opt-images/${watch.id}-1000.webp 1000w, /opt-images/${watch.id}-1400.webp 1400w`}
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        alt={watch.watchName}
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Right: Details */}
                <div className="lg:w-[52%] p-5 sm:p-6 md:p-8 flex flex-col overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="pr-2">
                            <h3 id="details-modal-title" className="text-lg sm:text-xl md:text-2xl font-semibold">
                                {watch.watchName}
                            </h3>
                            {watch.discription && (
                                <p className="mt-1 text-sm text-zinc-400">{watch.discription}</p>
                            )}
                            <p className="mt-2 text-white/90 text-base sm:text-lg">{unitLabel}</p>
                        </div>

                        <button
                            ref={closeRef}
                            onClick={onClose}
                            className="ml-2 rounded-full border border-white/20 px-3 py-1 text-sm text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                            Close
                        </button>
                    </div>

                    {/* Bullets */}
                    <ul className="list-disc pl-5 text-white/70 space-y-1 mb-5 text-sm sm:text-base">
                        <li>Genuine leather strap</li>
                        <li>Scratch-resistant glass</li>
                        <li>Water resistance: 5 ATM</li>
                        <li>2-year warranty</li>
                    </ul>

                    {/* Qty + Subtotal */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-white/70">Quantity</span>
                            <div className="flex items-stretch rounded-full border border-white/15 overflow-hidden">
                                <button
                                    onClick={dec}
                                    className="cursor-pointer px-3 py-2 text-white/90 hover:bg-white/10 disabled:opacity-40"
                                    aria-label="Decrease quantity"
                                    disabled={qty <= 1}
                                >
                                    −
                                </button>
                                <input
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={qty}
                                    onChange={onChangeQty}
                                    aria-label="Quantity"
                                    className="w-14 text-center bg-transparent outline-none text-white/90"
                                />
                                <button
                                    onClick={inc}
                                    className="cursor-pointer px-3 py-2 text-white/90 hover:bg-white/10 disabled:opacity-40"
                                    aria-label="Increase quantity"
                                    disabled={qty >= 99}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex sm:block items-end sm:items-center justify-between sm:justify-start">
                            <span className="text-xs text-white/60 mr-2 sm:block sm:mr-0">Subtotal</span>
                            <span className="text-lg font-semibold text-white/90">{subtotalLabel}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                            className="cursor-pointer rounded-full bg-white text-black px-5 py-2.5 text-sm border border-white/10 hover:bg-zinc-100 transition"
                            onClick={handleAdd}
                        >
                            Add {qty} to Cart
                        </button>
                        <button
                            onClick={onClose}
                            className="cursor-pointer rounded-full border border-white/20 px-5 py-2.5 text-sm hover:bg-white/5 transition"
                        >
                            Keep browsing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
