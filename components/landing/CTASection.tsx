import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center bg-[#1D9E75] rounded-3xl px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Start Optimizing Your Content Today
        </h2>
        <p className="text-white/80 mt-3 mb-8">
          Free forever. No account needed. Just open the tool and start.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-white text-[#1D9E75] font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-150"
        >
          Open the Dashboard →
        </Link>
        <p className="text-white/60 text-sm mt-4">
          ✓ Free &nbsp; ✓ No login &nbsp; ✓ All 4 tools included
        </p>
      </div>
    </section>
  );
}
