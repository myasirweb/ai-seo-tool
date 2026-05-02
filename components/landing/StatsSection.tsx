const STATS = [
  { value: "4",    label: "SEO Tools in One Place" },
  { value: "100%", label: "Free Forever"            },
  { value: "0",    label: "Login Required"          },
  { value: "AI",   label: "Powered by OpenAI"       },
];

export default function StatsSection() {
  return (
    <section className="w-full bg-gray-50 border-y border-gray-200 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-6 text-center">
        {STATS.map(({ value, label }) => (
          <div key={label}>
            <p className="text-3xl font-extrabold text-[#1D9E75]">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
