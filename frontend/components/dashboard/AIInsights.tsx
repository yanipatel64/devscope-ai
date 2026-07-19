"use client";

import {
  ShieldCheck,
  Cpu,
  Wrench,
  Sparkles,
} from "lucide-react";

interface Props {
  scores: {
    project_health: number;
    security: number;
    architecture: number;
    maintainability: number;
  };
}

export default function AIInsights({
  scores,
}: Props) {

  const average = Math.round(
    (
      scores.project_health +
      scores.security +
      scores.architecture +
      scores.maintainability
    ) / 4
  );

  const insights = [
    {
      icon: ShieldCheck,
      title: "Security",
      value:
        scores.security >= 70
          ? "Stable"
          : "Needs Attention",
    },
    {
      icon: Cpu,
      title: "Architecture",
      value:
        scores.architecture >= 70
          ? "Well Structured"
          : "Can Improve",
    },
    {
      icon: Wrench,
      title: "Maintainability",
      value:
        scores.maintainability >= 70
          ? "Easy to Maintain"
          : "Needs Refactoring",
    },
    {
      icon: Sparkles,
      title: "Overall",
      value: `${average}% Engineering Quality`,
    },
  ];

  return (
    <section className="rounded-3xl border border-gray-800 bg-gray-950 p-8">

      <h2 className="mb-8 text-3xl font-bold">
        AI Insights
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {insights.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/20"
            >

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600 transition group-hover:scale-110">

                <Icon size={28} />

              </div>

              <p className="text-sm text-gray-400">
                {item.title}
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {item.value}
              </h3>

            </div>

          );

        })}

      </div>

    </section>

  );

}