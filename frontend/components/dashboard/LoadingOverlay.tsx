"use client";

interface Props {
  step: string;
}

export default function LoadingOverlay({
  step,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">

      <div className="w-full max-w-lg rounded-3xl border border-violet-500/20 bg-[#0F172A] p-10 shadow-[0_0_60px_rgba(139,92,246,0.25)]">

        <div className="flex justify-center">

          <div className="relative">

            <div className="h-24 w-24 rounded-full border-4 border-violet-500/20"></div>

            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-violet-500"></div>

          </div>

        </div>

        <h2 className="mt-8 text-center text-3xl font-bold">
          DevScope AI
        </h2>

        <p className="mt-2 text-center text-gray-400">
          Repository Intelligence Engine
        </p>

        <div className="mt-10">

          <div className="h-3 overflow-hidden rounded-full bg-gray-800">

            <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />

          </div>

        </div>

        <p className="mt-8 text-center text-violet-300">
          {step}
        </p>

        <div className="mt-10 space-y-3 text-sm text-gray-500">

          <p>✓ Repository Cloning</p>

          <p>✓ Repository Parsing</p>

          <p>✓ AI Architecture Analysis</p>

          <p>✓ Security Inspection</p>

          <p>✓ Quality Scoring</p>

          <p>✓ Report Generation</p>

        </div>

      </div>

    </div>
  );
}