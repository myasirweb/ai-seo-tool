import { Search, FileText, BarChart2, BookOpen, type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  highlight: string;
}

const FEATURES: Feature[] = [
  {
    icon:        Search,
    iconBg:      "bg-blue-50",
    iconColor:   "text-blue-600",
    title:       "Keyword Research & Suggestions",
    description:
      "Enter any topic and get 10 keyword ideas instantly. Each keyword comes with search intent classification, difficulty rating, and volume estimate — powered by AI.",
    highlight:   "10 keywords per search",
  },
  {
    icon:        FileText,
    iconBg:      "bg-green-50",
    iconColor:   "text-green-600",
    title:       "Meta Title & Description Generator",
    description:
      "Generate 3 optimized meta title and description variants for any page. Includes a live Google SERP preview and character count validation.",
    highlight:   "3 variants with SERP preview",
  },
  {
    icon:        BarChart2,
    iconBg:      "bg-yellow-50",
    iconColor:   "text-yellow-600",
    title:       "Content Score Analyzer",
    description:
      "Get a detailed 100-point SEO score broken down by category: keyword usage, content structure, length, readability, and more — with specific improvement tips.",
    highlight:   "100-point rubric scoring",
  },
  {
    icon:        BookOpen,
    iconBg:      "bg-purple-50",
    iconColor:   "text-purple-600",
    title:       "Readability Checker",
    description:
      "Analyze your content with the Flesch-Kincaid formula to get a reading grade level score. Plus AI-generated suggestions to make your writing clearer and more engaging.",
    highlight:   "Flesch-Kincaid + AI tips",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest text-[#1D9E75] uppercase mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Everything You Need to Rank Higher
          </h2>
          <p className="text-gray-500 mt-3">
            Four powerful AI tools working together to improve your SEO — for free.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map(({ icon: Icon, iconBg, iconColor, title, description, highlight }) => (
            <div
              key={title}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div
                className={[
                  "w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0",
                  iconBg,
                ].join(" ")}
              >
                <Icon size={20} className={iconColor} />
              </div>

              <h3 className="text-base font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed flex-1">{description}</p>

              <span className="inline-block mt-4 bg-gray-50 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                {highlight}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
