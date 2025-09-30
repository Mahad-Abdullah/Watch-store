import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUI } from "../state/ui-store";
import { routeForProduct } from "../utils/routes";

export default function ChronoNavbar() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(null); // 'mail' | 'alerts' | null
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const { state, dismissNotification, triggerNotificationAction, cartItemsCount } = useUI();

  const alertsCount = state.notifications.length;
  const mailCount = state.notifications.filter((n) => n.type === "mail").length;
  const cartCount = cartItemsCount;

  const togglePanel = (which) => setPanel((p) => (p === which ? null : which));

  const toProduct = (obj) => {
    const id = obj?.id ?? obj?.meta?.itemSnapshot?.id;
    const section = obj?.section ?? obj?.meta?.itemSnapshot?.section ?? "men";
    return routeForProduct({ id, section });
  };

  // subtle elevate navbar after scroll for mobile clarity
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-shadow ${isScrolled ? "shadow-md shadow-black/40" : ""
        }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        {/* top spacer so content doesn't jump under fixed nav */}
        <div className="mt-2 sm:mt-3" />
        <nav
          className="
            relative flex items-center gap-2 sm:gap-3
            rounded-xl border border-white/10
            bg-black/60 supports-[backdrop-filter]:bg-black/40 backdrop-blur
            px-2 sm:px-3 md:px-4
            h-14 sm:h-16
          "
        >
          {/* Left: brand + links */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            {/* Mobile menu */}
            <button
              className="lg:hidden p-2 -ml-1 text-zinc-200/90 hover:text-white rounded-md"
              aria-label="Open menu"
              onClick={() => {
                setOpen(true);
                setPanel(null);
              }}
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center gap-2 shrink-0">
              <DotLogo className="w-5 h-5 text-white" />
              <span className="font-semibold tracking-wide text-white text-sm sm:text-base">Chrono</span>
            </Link>

            <ul className="hidden lg:flex items-center gap-6 text-sm text-zinc-300">
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    className={({ isActive }) =>
                      `transition-colors ${isActive ? "text-white" : "hover:text-white"}`
                    }
                    end={n.end}
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: actions (Mail, Bell, Cart) */}
          <div className="ml-auto flex items-center gap-0.5 sm:gap-1.5">
            <IconButton label="Messages" onClick={() => togglePanel("mail")}>
              <MailIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <Badge count={mailCount} />
            </IconButton>

            <IconButton label="Notifications" onClick={() => togglePanel("alerts")}>
              <BellIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <Badge count={alertsCount} />
            </IconButton>

            {/* Cart → /cart */}
            <IconButton label="Cart" className="cursor-pointer" onClick={() => navigate("/cart")}>
              <CartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <Badge count={cartCount} />
            </IconButton>
          </div>

          {/* Panels (auto shift inward on small screens) */}
          {panel === "mail" && (
            <Panel onClose={() => setPanel(null)} className="right-2 sm:right-20">
              <PanelHeader title="Messages" />
              <EmptyOrList
                items={state.notifications.filter((n) => n.type === "mail")}
                empty="No messages."
                renderItem={(n) => (
                  <NotificationRow
                    n={n}
                    onClose={() => dismissNotification(n.id)}
                    onAction={() => triggerNotificationAction(n.id)}
                    onNavigate={() => {
                      const hasProduct = n?.meta?.itemSnapshot?.id;
                      setPanel(null);
                      if (hasProduct) navigate(toProduct(n));
                    }}
                  />
                )}
              />
            </Panel>
          )}

          {panel === "alerts" && (
            <Panel onClose={() => setPanel(null)} className="right-2 sm:right-12">
              <PanelHeader title="Notifications" />
              <EmptyOrList
                items={state.notifications.slice(0, 8)}
                empty="All caught up."
                renderItem={(n) => (
                  <NotificationRow
                    n={n}
                    onClose={() => dismissNotification(n.id)}
                    onAction={() => triggerNotificationAction(n.id)}
                    onNavigate={() => {
                      const hasProduct = n?.meta?.itemSnapshot?.id;
                      setPanel(null);
                      if (hasProduct) navigate(toProduct(n));
                    }}
                  />
                )}
              />
            </Panel>
          )}
        </nav>
      </div>

      {/* Mobile slide-over (full-height, safe-area aware) */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside
            className="
              absolute left-0 top-0 h-full w-[90%] max-w-sm
              bg-zinc-950 text-white p-4 pt-[max(1rem,env(safe-area-inset-top))]
              border-r border-white/10
              overflow-y-auto
            "
          >
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <DotLogo className="w-5 h-5" />
                <span className="font-semibold">Chrono</span>
              </Link>
              <button aria-label="Close" className="p-2 -mr-2 rounded-md hover:bg-white/10" onClick={() => setOpen(false)}>
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Search (stub) */}
            <form onSubmit={(e) => e.preventDefault()} className="mb-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search watches…"
                  className="w-full h-12 rounded-md bg-white/5 border border-white/10 pl-10 pr-3 focus:outline-none"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              </div>
            </form>

            {/* Nav links */}
            <nav>
              <ul className="space-y-1">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <NavLink
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block px-2 py-3 rounded-lg ${isActive ? "bg-white/10" : "hover:bg-white/5"}`
                      }
                      end={n.end}
                    >
                      {n.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick actions */}
            <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
              <button className="h-11 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10" onClick={() => setPanel("mail")}>
                <MailIcon className="w-4 h-4 mr-1 inline-block" />
                Mail
              </button>
              <button className="h-11 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10" onClick={() => setPanel("alerts")}>
                <BellIcon className="w-4 h-4 mr-1 inline-block" />
                Alerts
              </button>
              <button
                className="h-11 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
                onClick={() => {
                  setOpen(false);
                  navigate("/cart");
                }}
              >
                <CartIcon className="w-4 h-4 mr-1 inline-block" />
                Cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}

const NAV = [
  { label: "Men", to: "/menPage", end: true },
  { label: "Women", to: "/womenPage", end: true },
];

/* ---------------- Small Components ---------------- */
function IconButton({ children, label, className = "", onClick }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`relative p-2 sm:p-2.5 rounded-lg hover:bg-white/10 text-zinc-200 ${className}`}
    >
      {children}
    </button>
  );
}

function Badge({ count }) {
  if (!count) return null;
  return (
    <span
      className="
        absolute -right-1 -top-1
        min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px]
        px-1 rounded-full bg-white text-black
        text-[10px] sm:text-[11px] font-semibold
        flex items-center justify-center
      "
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

function Panel({ children, onClose, className = "" }) {
  return (
    <div className={`absolute top-[calc(100%+8px)] ${className}`}>
      <div
        className="
          relative w-[92vw] xs:w-[22rem] sm:w-[26rem] max-w-[92vw]
          rounded-lg border border-white/10 bg-zinc-950/95 text-white backdrop-blur
          p-3 shadow-2xl
        "
      >
        <button
          className="absolute right-2 top-2 p-1 rounded hover:bg-white/10 text-white/90"
          aria-label="Close panel"
          onClick={onClose}
        >
          <span className="block leading-none text-lg">×</span>
        </button>
        {children}
      </div>
    </div>
  );
}

function PanelHeader({ title }) {
  return <h3 className="text-sm font-semibold mb-2">{title}</h3>;
}

function EmptyOrList({ items, empty, renderItem }) {
  if (!items.length) return <p className="text-sm text-zinc-300">{empty}</p>;
  return (
    <ul className="space-y-2 max-h-72 overflow-auto pr-1">
      {items.map((item) => (
        <li key={item.id} className="text-sm text-zinc-200">
          {renderItem ? renderItem(item) : <>• {item.title}</>}
        </li>
      ))}
    </ul>
  );
}

function NotificationRow({ n, onClose, onAction, onNavigate }) {
  const canView = n?.action && n.action.kind === "VIEW_ITEM";
  return (
    <div className="rounded border border-white/10 p-2 hover:bg-white/5 transition-colors">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{n.title}</div>
          <div className="text-[11px] text-white/70">{new Date(n.ts).toLocaleTimeString()}</div>
        </div>
        {n.showClose && (
          <button
            className="ml-2 text-white/90 hover:text-white"
            onClick={onClose}
            aria-label="Close notification"
          >
            ×
          </button>
        )}
      </div>

      {canView && (
        <div className="mt-2 flex items-center gap-3">
          <button className="text-xs underline underline-offset-2 hover:opacity-90" onClick={onNavigate}>
            {n.action.label}
          </button>
          <button
            className="text-xs underline underline-offset-2 hover:opacity-90 opacity-70"
            onClick={onAction}
            title="Open quick preview"
          >
            Preview
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Icons ---------------- */
function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-3.5-3.5" />
    </svg>
  );
}
function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><path d="m22 6-10 7L2 6" />
    </svg>
  );
}
function BellIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function CartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
function DotLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="5" />
    </svg>
  );
}
