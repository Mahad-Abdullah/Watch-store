import React, { createContext, useContext, useReducer, useMemo } from "react";

const UIContext = createContext(null);

// ---- Types (for your reference)
// CartItem: { id, name, price:number, image, quantity:number }
// Notification: { id, type:"cart"|"info"|"alert", title, ts, showClose:boolean, action?: { label, kind }, meta?: any }

const initialState = {
    cart: [],
    notifications: [],
    unread: { alerts: 0, mail: 0, cart: 0 },
    previewItem: null, // used to show a product details card/modal globally
};


function clampQty(n) {
    const num = Number(n || 1);
    if (Number.isNaN(num)) return 1;
    return Math.max(1, Math.min(99, Math.floor(num)));
}

function reducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART": {
            const incoming = action.item;
            const qty = clampQty(incoming.quantity ?? 1);

            // merge by id: increment quantity if exists
            const idx = state.cart.findIndex((x) => x.id === incoming.id);
            let cart;
            if (idx !== -1) {
                cart = state.cart.map((x, i) =>
                    i === idx ? { ...x, quantity: clampQty(x.quantity + qty) } : x
                );
            } else {
                // normalize item
                const normalized = {
                    id: incoming.id,
                    name: incoming.name,
                    price: typeof incoming.price === "number"
                        ? incoming.price
                        : Number(String(incoming.price).replace(/[^0-9.]/g, "")) || 0,
                    image: incoming.image ?? null,
                    quantity: qty,
                };
                cart = [...state.cart, normalized];
            }

            // notification with "View item" action and visible close button
            const note = {
                id: crypto.randomUUID(),
                type: "cart",
                title: `${incoming.name} added to cart`,
                ts: Date.now(),
                showClose: true,
                action: { label: "View item", kind: "VIEW_ITEM" },
                // snapshot the item at time of add so the preview can render even if list changes
                meta: { itemSnapshot: { ...incoming, quantity: qty } },
            };

            return {
                ...state,
                cart,
                notifications: [note, ...state.notifications],
                unread: {
                    ...state.unread,
                    cart: state.unread.cart + 1,
                    alerts: state.unread.alerts + 1,
                },
            };
        }

        case "REMOVE_FROM_CART": {
            const cart = state.cart.filter((x) => x.id !== action.id);
            return { ...state, cart };
        }

        case "UPDATE_CART_QTY": {
            const { id, quantity } = action;
            const cart = state.cart.map((x) =>
                x.id === id ? { ...x, quantity: clampQty(quantity) } : x
            );
            return { ...state, cart };
        }

        case "CLEAR_CART": {
            return { ...state, cart: [] };
        }

        case "DISMISS_NOTIFICATION": {
            const notifications = state.notifications.filter((n) => n.id !== action.id);
            return { ...state, notifications };
        }

        case "OPEN_PREVIEW": {
            return { ...state, previewItem: action.item || null };
        }

        case "CLOSE_PREVIEW": {
            return { ...state, previewItem: null };
        }

        // Trigger actions from notifications (e.g., "View item")
        case "TRIGGER_NOTIFICATION_ACTION": {
            const note = state.notifications.find((n) => n.id === action.id);
            if (!note || !note.action) return state;

            if (note.action.kind === "VIEW_ITEM") {
                // Prefer latest item from cart by id if available; fallback to snapshot
                const snap = note.meta?.itemSnapshot;
                const fromCart = snap ? state.cart.find((c) => c.id === snap.id) : null;
                const itemForPreview = fromCart || snap || null;
                return { ...state, previewItem: itemForPreview };
            }

            return state;
        }

        default:
            return state;
    }
}

export function UIProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // derived values
    const cartItemsCount = useMemo(
        () => state.cart.reduce((sum, it) => sum + (it.quantity || 0), 0),
        [state.cart]
    );
    const cartTotal = useMemo(
        () => state.cart.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 0), 0),
        [state.cart]
    );

    const api = useMemo(
        () => ({
            // cart ops
            addToCart: (item) => dispatch({ type: "ADD_TO_CART", item }),
            removeFromCart: (id) => dispatch({ type: "REMOVE_FROM_CART", id }),
            updateCartQty: (id, quantity) => dispatch({ type: "UPDATE_CART_QTY", id, quantity }),
            clearCart: () => dispatch({ type: "CLEAR_CART" }),

            // notifications
            dismissNotification: (id) => dispatch({ type: "DISMISS_NOTIFICATION", id }),
            triggerNotificationAction: (id) => dispatch({ type: "TRIGGER_NOTIFICATION_ACTION", id }),

            // preview (to show a product card/modal globally)
            openPreview: (item) => dispatch({ type: "OPEN_PREVIEW", item }),
            closePreview: () => dispatch({ type: "CLOSE_PREVIEW" }),

            // selectors / state
            state,
            cartItemsCount,
            cartTotal,
        }),
        [state, cartItemsCount, cartTotal]
    );

    return <UIContext.Provider value={api}>{children}</UIContext.Provider>;
}

export function useUI() {
    const ctx = useContext(UIContext);
    if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
    return ctx;
}
