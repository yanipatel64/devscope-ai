"use client";

import {
  GitBranch,
  Search,
  Cpu,
  Boxes,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";

export default function ArchitectureGraph() {
  return (
    <section
      className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-950
      p-8
      "
    >
      <h2 className="text-3xl font-bold">
        Repository Architecture
      </h2>

      <p className="text-gray-400 mt-2 mb-12">
        AI analysis workflow from GitHub repository to engineering insights.
      </p>

      <div className="flex flex-col items-center">

        <Node
          icon={<GitBranch size={30} />}
          title="GitHub Repository"
          color="from-violet-600 to-purple-500"
        />

        <VerticalLine />

        <Node
          icon={<Search size={30} />}
          title="Repository Scanner"
          color="from-blue-600 to-cyan-500"
        />

        <div className="flex items-center justify-center w-full mt-8">

          <div className="flex flex-col items-center flex-1">

            <Node
              icon={<Cpu size={30} />}
              title="Technology Scanner"
              color="from-emerald-600 to-green-500"
            />

          </div>

          <div className="w-24 h-[2px] bg-gradient-to-r from-violet-600 to-cyan-500" />

          <div className="flex flex-col items-center flex-1">

            <Node
              icon={<Boxes size={30} />}
              title="Dependency Scanner"
              color="from-orange-500 to-yellow-500"
            />

          </div>

        </div>

        <VerticalLine />

        <Node
          icon={<Sparkles size={30} />}
          title="Gemini AI Engine"
          color="from-pink-600 to-violet-600"
        />

        <VerticalLine />

        <Node
          icon={<LayoutDashboard size={30} />}
          title="Engineering Dashboard"
          color="from-indigo-600 to-violet-600"
        />

      </div>
    </section>
  );
}

function VerticalLine() {
  return (
    <div className="flex flex-col items-center my-4">
      <div className="w-[2px] h-12 bg-gradient-to-b from-violet-500 to-cyan-500 animate-pulse" />
      <div className="text-violet-400 text-xl">
        ▼
      </div>
    </div>
  );
}

function Node({
  icon,
  title,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
}) {
  return (
    <div
      className={`
      group
      relative
      w-72
      rounded-2xl
      border
      border-gray-700
      bg-gray-900
      px-6
      py-6
      transition-all
      duration-300
      hover:scale-105
      hover:border-violet-500
      hover:shadow-[0_0_40px_rgba(139,92,246,0.35)]
      `}
    >
      <div
        className={`
        absolute
        inset-0
        rounded-2xl
        bg-gradient-to-r
        ${color}
        opacity-10
        group-hover:opacity-20
        transition
        `}
      />

      <div className="relative flex items-center gap-4">

        <div
          className={`
          h-14
          w-14
          rounded-xl
          bg-gradient-to-r
          ${color}
          flex
          items-center
          justify-center
          text-white
          shadow-lg
          `}
        >
          {icon}
        </div>

        <div>

          <p className="text-xl font-semibold text-white">
            {title}
          </p>

          <p className="text-gray-400 text-sm mt-1">
            Active
          </p>

        </div>

      </div>
    </div>
  );
}