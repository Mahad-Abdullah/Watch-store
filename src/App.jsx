// App.jsx
import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", lazy: async () => ({ Component: (await import("./Pages/homePage")).default }) },
  { path: "/menPage", lazy: async () => ({ Component: (await import("./Pages/menPage")).default }) },
  { path: "/womenPage", lazy: async () => ({ Component: (await import("./Pages/womenPage")).default }) },
  { path: "/privacy", lazy: async () => ({ Component: (await import("./Components/privacy")).default }) },
  { path: "/terms", lazy: async () => ({ Component: (await import("./Components/terms")).default }) },
  { path: "/cart", lazy: async () => ({ Component: (await import("./Pages/CartPage")).default }) },
  { path: "/checkout", lazy: async () => ({ Component: (await import("./Pages/CheckoutPage")).default }) },
]);

export default function App() {
  return (
    <Suspense fallback={<div className="p-6 text-zinc-400">Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
