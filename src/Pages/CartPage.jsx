import React from "react";
import { useNavigate } from "react-router-dom";
import { useUI } from "../state/ui-store";
import { routeForProduct } from "../utils/routes";

export default function CartPage() {
    const navigate = useNavigate();
    const {
        state,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartItemsCount,
        cartTotal,
    } = useUI();

    const onChangeQty = (id, val) => {
        const v = Math.max(1, Math.min(99, Number(val || 1)));
        updateCartQty(id, v);
    };

    if (!state?.cart?.length) {
        return (
            <div className="relative min-h-screen bg-black/50 text-white">
                {/* Floating close button */}
                <button
                    className="fixed top-5 right-5 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/70 hover:bg-black/80 text-white/90 hover:text-white text-3xl"
                    onClick={() => navigate(-1)}
                    aria-label="Close cart"
                >
                    ×
                </button>

                <div className="mx-auto max-w-7xl px-6 md:px-8 py-24">
                    <h1 className="text-3xl md:text-4xl font-semibold mb-6">Your Cart</h1>
                    <div className="rounded-2xl border border-white/10 bg-black/60 p-6 md:p-8 text-zinc-300 text-base md:text-lg">
                        Your cart is empty.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-black/50 text-white">
            {/* Floating close button */}
            <button
                className="cursor-pointer fixed top-5 right-5 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/70 hover:bg-black/80 text-white/90 hover:text-white text-3xl"
                onClick={() => navigate(-1)}
                aria-label="Close cart"
            >
                ×
            </button>

            <div className="mx-auto max-w-7xl px-6 md:px-8 py-24">
                <h1 className="text-3xl md:text-4xl font-semibold mb-8">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Items */}
                    <div className="lg:col-span-2 space-y-4 md:space-y-5">
                        {state.cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 md:gap-6 rounded-2xl border border-white/10 bg-black/60 p-4 md:p-6"
                            >
                                <button
                                    className="shrink-0"
                                    onClick={() => navigate(routeForProduct(item))}
                                    aria-label={`Open ${item.name}`}
                                >
                                    <img
                                        src={item.image ?? "/placeholder.webp"}
                                        alt={item.name}
                                        className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
                                    />
                                </button>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <button
                                            className="text-left text-base md:text-lg font-medium text-zinc-100 hover:underline truncate"
                                            onClick={() => navigate(routeForProduct(item))}
                                            title={item.name}
                                        >
                                            {item.name}
                                        </button>
                                        <div className="text-base md:text-lg text-zinc-200 font-semibold">
                                            ${Number(item.price || 0).toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="mt-3 flex flex-wrap items-center gap-3 md:gap-4">
                                        {/* Qty control - bigger/touch-friendly */}
                                        <div className="inline-flex items-stretch rounded-full border border-white/15 overflow-hidden">
                                            <button
                                                className="cursor-pointer px-3 md:px-4 h-10 md:h-11 text-base md:text-lg text-white/90 hover:bg-white/10 disabled:opacity-40"
                                                disabled={(item.quantity || 1) <= 1}
                                                onClick={() =>
                                                    updateCartQty(item.id, Math.max(1, (item.quantity || 1) - 1))
                                                }
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                min={1}
                                                max={99}
                                                value={item.quantity || 1}
                                                onChange={(e) => onChangeQty(item.id, e.target.value)}
                                                className="w-14 md:w-16 h-10 md:h-11 text-center text-base md:text-lg bg-transparent outline-none"
                                            />
                                            <button
                                                className="cursor-pointer px-3 md:px-4 h-10 md:h-11 text-base md:text-lg text-white/90 hover:bg-white/10"
                                                onClick={() =>
                                                    updateCartQty(item.id, Math.min(99, (item.quantity || 1) + 1))
                                                }
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            className="text-sm md:text-base text-red-300 hover:text-red-200 cursor-pointer"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex items-center justify-between text-sm md:text-base text-zinc-300 mt-1 md:mt-2">
                            <button
                                className="text-sm md:text-base underline underline-offset-2 hover:opacity-90 cursor-pointer"
                                onClick={clearCart}
                            >
                                Clear cart
                            </button>
                            <div className="text-sm md:text-base">{cartItemsCount} item(s)</div>
                        </div>
                    </div>

                    {/* Summary (sticky on desktop) */}
                    <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-white/10 bg-black/60 p-4 md:p-6 space-y-4">
                        <h2 className="text-lg md:text-xl font-semibold mb-1">Order Summary</h2>

                        <div className="space-y-2 text-base">
                            <Row label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
                            <Row label="Shipping" value="Calculated at checkout" muted />
                            <Row label="Tax" value="Calculated at checkout" muted />
                            <div className="border-t border-white/10 my-2" />
                            <Row
                                label={<span className="font-semibold">Total</span>}
                                value={<span className="font-semibold">${cartTotal.toFixed(2)}</span>}
                            />
                        </div>

                        <button
                            className="cursor-pointer w-full h-12 md:h-14 rounded-xl bg-white text-black text-base md:text-lg font-medium hover:bg-zinc-100"
                            onClick={() => navigate("/checkout")}
                        >
                            Proceed to Checkout
                        </button>

                        <p className="text-[12px] md:text-sm text-white/70 text-center">
                            You can review shipping & tax on the next step.
                        </p>
                    </aside>
                </div>
            </div>
        </div>
    );
}

/* ---------- Small row helper (kept simple) ---------- */
function Row({ label, value, muted }) {
    return (
        <div className="flex items-center justify-between">
            <span className={muted ? "text-white/70" : "text-white"}>{label}</span>
            <span className={muted ? "text-white/70" : ""}>{value}</span>
        </div>
    );
}
