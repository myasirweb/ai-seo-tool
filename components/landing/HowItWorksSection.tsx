import { Search, Zap, BarChart2, ChevronRight, type LucideIcon } from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number:      "01",
    icon:        Search,
    title:       "Enter Your Topic or Content",
    description:
      "Type in a topic for keyword research, or paste your full article for content analysis. No signup or account required.",
  },
  {
    number:      "02",
    icon:        Zap,
    title:       "AI Analyzes in Seconds",
    description:
      "Our AI engine powered by OpenAI processes your input and runs it through our SEO scoring framework instantly.",
  },
  {
    number:      "03",
    icon:        BarChart2,
    title:       "Get Actionable Results",
    description:
      "Receive keyword suggestions, meta variants, a detailed content score, or readability improvements — all ready to copy and use.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest text-[#1D9E75] uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            From Idea to Optimized Content in 3 Steps
          </h2>
          <p className="text-gray-500 mt-3">
            No learning curve. Just paste, click, and get results.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {STEPS.map(({ number, icon: Icon, title, description }, index) => (
            <>
              {/* Step card */}
              <div
                key={number}
                className="bg-white border border-gray-100 rounded-2xl p-6 flex-1 flex flex-col gap-4"
              >
                {/* Number badge */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1D9E75] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {number}
                  </div>
                </div>

                {/* Icon */}
                <Icon size={22} className="text-gray-300" />

                {/* Text */}
                <div>
                  <h3 className="text-base font-bold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{description}</p>
                </div>
              </div>

              {/* Connector arrow — desktop only, not after last step */}
              {index < STEPS.length - 1 && (
                <div
                  key={`arrow-${number}`}
                  className="hidden md:flex items-center self-center text-gray-300 shrink-0 mt-4"
                >
                  <ChevronRight size={28} />
                </div>
              )}
            </>
          ))}
        </div>

      </div>
    </section>
  );
}
