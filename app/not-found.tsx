import Link from "next/link";
import { SITE } from "@/constants/site";

/** Premium 404 page. */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-ink px-4 text-center text-white">
      <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div>
        <p className="font-display text-8xl font-bold text-gold-gradient sm:text-9xl">404</p>
        <h1 className="mt-5 title-lg text-white sm:text-4xl">This page seems to have moved</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mist sm:text-base">
          The page you are looking for does not exist. Let us guide you back to the furniture.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-gold">
            Back to Home
          </Link>
          <Link href="/shop" className="btn-outline-light">
            Browse the Shop
          </Link>
        </div>
        <p className="mt-12 text-[11px] font-semibold tracking-[0.3em] text-mist uppercase">{SITE.name}</p>
      </div>
    </section>
  );
}
