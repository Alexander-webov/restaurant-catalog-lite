import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SushiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#ff7e67" />
          <stop offset="1" stopColor="#ffad80" />
        </linearGradient>
      </defs>
      <rect x="8" y="40" width="112" height="48" rx="12" fill="#171717" />
      <rect x="14" y="46" width="100" height="36" rx="8" fill="url(#g1)" />
      <circle cx="64" cy="64" r="14" fill="#fff" />
      <circle cx="64" cy="64" r="7" fill="#616161" />
      <rect x="38" y="22" width="52" height="12" rx="6" fill="#0f172a">
        <animate
          attributeName="x"
          values="36;40;36"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}

export default function NotFound() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 py-16 md:grid-cols-[220px,1fr]">
        <div className="md:sticky md:top-8"></div>

        <section className="relative">
          <div className="flex items-center gap-6">
            <SushiIcon className="hidden md:block h-28 w-28 shrink-0" />
            <div>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
                4<span className="text-gray-700">0</span>4
              </h1>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:flex">
            <button
              onClick={() => navigate(-1)}
              className="rounded-2xl border border-zinc-300 px-5 py-3 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              ← Go Back
            </button>
            <Link
              to="/"
              className="rounded-2xl bg-black px-5 py-3 text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Go Home
            </Link>
            <Link
              to="/menu"
              className="rounded-2xl bg-black px-5 py-3 text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Open Menu
            </Link>
            <Link
              to="/cart"
              className="rounded-2xl bg-black px-5 py-3 text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Open Cart
            </Link>
          </div>

          <div className="pointer-events-none absolute -top-8 right-4 hidden select-none text-8xl leading-none text-black/5 md:block">
            …
          </div>
        </section>
      </div>
    </main>
  );
}
