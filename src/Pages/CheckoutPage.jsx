import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUI } from "../state/ui-store";
import { routeForProduct } from "../utils/routes";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { state, cartTotal, cartItemsCount, clearCart, updateCartQty, removeFromCart } = useUI();

    // ----- Form State
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });
    const [address, setAddress] = useState({
        line1: "",
        line2: "",
        city: "",
        country: "",
        zip: "",
    });
    const [shipping, setShipping] = useState("standard"); // 'standard' | 'express'
    const [payment, setPayment] = useState("card");       // 'card' | 'cod' | 'paypal'
    const [notes, setNotes] = useState("");
    const [agree, setAgree] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // ----- Pricing (you can replace with live rates)
    const shippingFee = shipping === "express" ? 19.99 : 0;
    const taxRate = 0.0; // set to 0; adjust if needed like 0.05 for 5%
    const subTotal = cartTotal;
    const tax = subTotal * taxRate;
    const grandTotal = useMemo(() => Number(subTotal + shippingFee + tax), [subTotal, shippingFee, tax]);

    // ----- Derived
    const hasItems = (state.cart?.length || 0) > 0;

    // ----- Validation
    const missing = [];
    if (!customer.firstName.trim()) missing.push("First name");
    if (!customer.lastName.trim()) missing.push("Last name");
    if (!EMAIL_RE.test(customer.email)) missing.push("Valid email");
    if (!customer.phone.trim()) missing.push("Phone");
    if (!address.line1.trim()) missing.push("Address line 1");
    if (!address.city.trim()) missing.push("City");
    if (!address.country.trim()) missing.push("Country");
    if (!address.zip.trim()) missing.push("ZIP/Postal code");
    const formValid = missing.length === 0 && agree && hasItems;

    // ----- Handlers
    const onPlaceOrder = async () => {
        if (!formValid || submitting) return;
        try {
            setSubmitting(true);
            // Simulate order create
            const orderId = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
            // Optionally: await api.createOrder({...})
            // Clear cart AFTER successful create
            clearCart();
            navigate("/order-confirmation", {
                state: {
                    orderId,
                    grandTotal,
                    email: customer.email,
                    items: cartItemsCount,
                },
                replace: true,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-black/30 text-white">
            {/* Floating back button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-6 left-6 cursor-pointer z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white text-3xl"
                aria-label="Go back"
            >
                ←
            </button>

            <div className="mx-auto max-w-6xl px-4 py-20">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Checkout</h1>
                    <Link to="/cart" className="text-sm underline opacity-80 hover:opacity-100">
                        Edit Cart ({cartItemsCount})
                    </Link>
                </div>

                {!hasItems ? (
                    <div className="rounded-lg border border-white/10 bg-black/50 p-6 text-zinc-300">
                        Your cart is empty. <Link to="/menPage" className="underline">Continue shopping</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: Forms */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Customer Info */}
                            <Card title="Customer Information">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Input label="First name" value={customer.firstName} onChange={(v) => setCustomer({ ...customer, firstName: v })} required />
                                    <Input label="Last name" value={customer.lastName} onChange={(v) => setCustomer({ ...customer, lastName: v })} required />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                    <Input type="email" label="Email" value={customer.email} onChange={(v) => setCustomer({ ...customer, email: v })} required />
                                    <Input label="Phone" value={customer.phone} onChange={(v) => setCustomer({ ...customer, phone: v })} required />
                                </div>
                            </Card>

                            {/* Shipping Address */}
                            <Card title="Shipping Address">
                                <Input label="Address line 1" value={address.line1} onChange={(v) => setAddress({ ...address, line1: v })} required />
                                <Input label="Address line 2 (optional)" value={address.line2} onChange={(v) => setAddress({ ...address, line2: v })} />
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                                    <Input label="City" value={address.city} onChange={(v) => setAddress({ ...address, city: v })} required />
                                    <Input label="Country" value={address.country} onChange={(v) => setAddress({ ...address, country: v })} required />
                                    <Input label="ZIP / Postal code" value={address.zip} onChange={(v) => setAddress({ ...address, zip: v })} required />
                                </div>
                            </Card>

                            {/* Shipping method */}
                            <Card title="Shipping Method">
                                <RadioRow
                                    name="shipping"
                                    checked={shipping === "standard"}
                                    onChange={() => setShipping("standard")}
                                    headline="Standard"
                                    subline="3–5 business days"
                                    right="$0.00"
                                />
                                <RadioRow
                                    name="shipping"
                                    checked={shipping === "express"}
                                    onChange={() => setShipping("express")}
                                    headline="Express"
                                    subline="1–2 business days"
                                    right="$19.99"
                                />
                            </Card>

                            {/* Payment */}
                            <Card title="Payment">
                                <RadioRow
                                    name="payment"
                                    checked={payment === "card"}
                                    onChange={() => setPayment("card")}
                                    headline="Credit/Debit Card"
                                    subline="Secure payments"
                                />
                                <RadioRow
                                    name="payment"
                                    checked={payment === "cod"}
                                    onChange={() => setPayment("cod")}
                                    headline="Cash on Delivery"
                                    subline="Pay when your order arrives"
                                />
                                <RadioRow
                                    name="payment"
                                    checked={payment === "paypal"}
                                    onChange={() => setPayment("paypal")}
                                    headline="PayPal"
                                    subline="Pay via your PayPal account"
                                />
                            </Card>

                            {/* Notes & Terms */}
                            <Card title="Order Notes">
                                <textarea
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none placeholder:text-zinc-400"
                                    placeholder="Any special requests or delivery instructions?"
                                />
                                <label className="mt-3 flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={agree}
                                        onChange={(e) => setAgree(e.target.checked)}
                                        className="accent-white"
                                    />
                                    I agree to the Terms & Privacy Policy
                                </label>
                                {!formValid && (
                                    <p className="mt-2 text-xs text-red-300">
                                        {hasItems
                                            ? "Please complete all required fields and accept the terms."
                                            : "Your cart is empty."}
                                    </p>
                                )}
                            </Card>
                        </div>

                        {/* Right: Summary */}
                        <aside className="h-fit space-y-4">
                            <SummaryCard
                                items={state.cart}
                                subTotal={subTotal}
                                shippingFee={shippingFee}
                                tax={tax}
                                grandTotal={grandTotal}
                                onQty={(id, q) => updateCartQty(id, q)}
                                onRemove={(id) => removeFromCart(id)}
                            />
                            <button
                                onClick={onPlaceOrder}
                                disabled={!formValid || submitting}
                                className={`w-full h-11 rounded text-sm font-medium ${!formValid || submitting
                                    ? "bg-white/20 text-white/70 cursor-not-allowed"
                                    : "bg-white text-black hover:bg-zinc-100"
                                    }`}
                            >
                                {submitting ? "Placing Order…" : `Place Order — $${grandTotal.toFixed(2)}`}
                            </button>
                            <p className="text-[12px] text-white/70 text-center">
                                By placing your order, you agree to our{" "}
                                <Link to="/terms" className="underline">Terms</Link> and{" "}
                                <Link to="/privacy" className="underline">Privacy Policy</Link>.
                            </p>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ===================== Small UI pieces ===================== */
function Card({ title, children }) {
    return (
        <div className="rounded-lg border border-white/10 bg-black/50 p-4">
            {title && <h2 className="text-sm font-semibold mb-3">{title}</h2>}
            {children}
        </div>
    );
}

function Input({ label, value, onChange, type = "text", required }) {
    return (
        <label className="block text-sm">
            <span className="mb-1 block text-zinc-300">
                {label} {required && <sup className="text-red-400">*</sup>}
            </span>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="w-full rounded-md bg-white/5 border border-white/10 px-3 h-10 text-sm outline-none placeholder:text-zinc-400"
                placeholder={label}
            />
        </label>
    );
}

function RadioRow({ name, checked, onChange, headline, subline, right }) {
    return (
        <label className="flex items-center gap-3 py-2 px-3 rounded hover:bg-white/5 cursor-pointer">
            <input
                type="radio"
                name={name}
                checked={checked}
                onChange={onChange}
                className="accent-white"
            />
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{headline}</div>
                {subline && <div className="text-xs text-white/70">{subline}</div>}
            </div>
            {right && <div className="text-sm">{right}</div>}
        </label>
    );
}

function SummaryCard({ items, subTotal, shippingFee, tax, grandTotal, onQty, onRemove }) {
    return (
        <div className="rounded-lg border border-white/10 bg-black/50 p-4">
            <h2 className="text-sm font-semibold mb-3">Order Summary</h2>
            <ul className="space-y-2 max-h-72 overflow-auto pr-1">
                {items.map((it) => (
                    <li key={it.id} className="flex items-center gap-3">
                        <img
                            src={it.image ?? "/placeholder.webp"}
                            alt={it.name}
                            className="w-12 h-12 rounded object-cover"
                        />
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                                <div className="text-sm truncate">{it.name}</div>
                                <div className="text-xs text-zinc-300">
                                    ${Number(it.price || 0).toFixed(2)}
                                </div>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                                <div className="inline-flex items-stretch rounded-full border border-white/15 overflow-hidden">
                                    <button
                                        className="px-2 text-[11px] text-white/90 hover:bg-white/10 disabled:opacity-40"
                                        disabled={(it.quantity || 1) <= 1}
                                        onClick={() => onQty(it.id, Math.max(1, (it.quantity || 1) - 1))}
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        min={1}
                                        max={99}
                                        value={it.quantity || 1}
                                        onChange={(e) => onQty(it.id, Math.max(1, Math.min(99, Number(e.target.value || 1))))}
                                        className="w-10 text-center text-[11px] bg-transparent outline-none"
                                    />
                                    <button
                                        className="px-2 text-[11px] text-white/90 hover:bg-white/10"
                                        onClick={() => onQty(it.id, Math.min(99, (it.quantity || 1) + 1))}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                                <button className="text-[11px] text-red-300 hover:text-red-200" onClick={() => onRemove(it.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-3 space-y-2 text-sm">
                <Row label="Subtotal" value={`$${subTotal.toFixed(2)}`} />
                <Row label="Shipping" value={shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`} />
                {tax > 0 && <Row label="Tax" value={`$${tax.toFixed(2)}`} />}
                <Row label="Total" value={<span className="font-semibold">${grandTotal.toFixed(2)}</span>} />
            </div>
        </div>
    );
}

function Row({ label, value }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-white/80">{label}</span>
            <span>{value}</span>
        </div>
    );
}
