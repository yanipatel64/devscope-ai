"use client";

import CountUp from "react-countup";

interface Props {
  title: string;
  score: number;
  color: "green" | "blue" | "purple" | "orange";
  factors?: string[];
}

export default function ScoreCard({
  title,
  score,
  color,
  factors = [],
}: Props) {
  const colors = {
    green: {
      ring: "from-green-400 to-emerald-500",
      badge: "bg-green-500/20 text-green-300",
    },
    blue: {
      ring: "from-cyan-400 to-blue-500",
      badge: "bg-blue-500/20 text-blue-300",
    },
    purple: {
      ring: "from-violet-400 to-fuchsia-500",
      badge: "bg-violet-500/20 text-violet-300",
    },
    orange: {
      ring: "from-orange-400 to-yellow-500",
      badge: "bg-orange-500/20 text-orange-300",
    },
  };

  const status =
    score >= 85
      ? "Excellent"
      : score >= 70
      ? "Good"
      : score >= 50
      ? "Fair"
      : "Needs Work";

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-[#111827] via-[#0F172A] to-black p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]">

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm uppercase tracking-widest text-gray-400">
            {title}
          </p>

          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colors[color].badge}`}
          >
            {status}
          </span>

        </div>

        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${colors[color].ring} p-[3px]`}
        >

          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0B1120]">

            <span className="text-2xl font-bold">
  <CountUp
    end={score}
    duration={2}
  />
  %
</span>

          </div>

        </div>

      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-800">

        <div
          className={`h-full rounded-full bg-gradient-to-r ${colors[color].ring} transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />

      </div>

      <div className="mt-6 space-y-2">

        {factors.map((factor, index) => (
          <div
            key={index}
            className="flex items-start gap-2 text-sm text-gray-300"
          >
            <span className="mt-1 text-violet-400">●</span>
            <span>{factor}</span>
          </div>
        ))}

      </div>

    </div>
  );
}