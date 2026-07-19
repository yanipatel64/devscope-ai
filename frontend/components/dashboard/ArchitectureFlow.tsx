"use client";

import type { ArchitectureNode } from "@/types/repository";

interface Props {
  architecture: ArchitectureNode[];
}

export default function ArchitectureFlow({
  architecture,
}: Props) {
  return (
    <section className="rounded-3xl border border-gray-800 bg-gradient-to-br from-[#0F172A] to-black p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold">
          AI Architecture Flow
        </h2>

        <p className="mt-2 text-gray-400">
          Repository architecture discovered automatically
        </p>

      </div>

      <div className="relative ml-4 border-l border-violet-500/30">

        {(architecture || []).map((item,index)=>(
          <div
            key={index}
            className="relative mb-8 pl-10"
          >

            {/* Timeline Dot */}

            <div className="absolute -left-[13px] top-4 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#0F172A] bg-violet-500 shadow-lg shadow-violet-500/40">

              <div className="h-2 w-2 rounded-full bg-white" />

            </div>

            {/* Card */}

            <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-[#111827] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]">

              <div className="flex items-center justify-between">

                <h3 className="text-xl font-semibold text-white">
                  {item.layer}
                </h3>

                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-300">
                  ✓ AI Verified
                </span>

              </div>

              <p className="mt-4 leading-7 text-gray-400">
                {item.reason}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}