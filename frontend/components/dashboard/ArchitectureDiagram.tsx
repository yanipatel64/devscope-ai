"use client";

import {
  Database,
  Layers3,
  Monitor,
  Server,
  Box,
  ArrowRight,
} from "lucide-react";


import type { ArchitectureNode } from "@/types/repository";

interface Props {
  architecture: ArchitectureNode[];
}

function getLayerIcon(layer: string) {

  const name = layer.toLowerCase();

  if (name.includes("repository"))
    return Layers3;

  if (name.includes("presentation"))
    return Monitor;

  if (name.includes("client"))
    return Layers3;

  if (name.includes("application"))
    return Server;

  if (name.includes("business"))
    return Box;

  if (name.includes("data"))
    return Database;

  if (name.includes("deployment"))
    return Box;

  return Layers3;
}

function getLayerColor(layer: string) {

  const name = layer.toLowerCase();

  if (name.includes("repository"))
    return "bg-blue-600";

  if (name.includes("presentation"))
    return "bg-cyan-600";

  if (name.includes("client"))
    return "bg-indigo-600";

  if (name.includes("application"))
    return "bg-green-600";

  if (name.includes("business"))
    return "bg-violet-600";

  if (name.includes("data"))
    return "bg-orange-500";

  if (name.includes("deployment"))
    return "bg-red-500";

  return "bg-gray-600";
}

export default function ArchitectureDiagram({
  architecture = []
}: Props) {
  return (
    <section className="rounded-3xl border border-gray-800 bg-gray-950 p-8">

      <h2 className="mb-10 text-3xl font-bold">
        Architecture Flow
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-4">
                {(architecture ?? []).map((item, index) => {

          const Icon = getLayerIcon(item.layer);
          const layerColor = getLayerColor(item.layer);

          return (
            <div
              key={index}
              className="flex items-center"
            >

              <div className="group w-64 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/20">

                <div
  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${layerColor}`}
>

                  <Icon size={28} />

                </div>

                <h3 className="text-lg font-semibold">

                  {item.layer}

                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">

                  {item.reason}

                </p>

              </div>

              {index !== architecture.length - 1 && (

                <div className="mx-4 hidden lg:block">

                  <ArrowRight
                    size={32}
                    className="text-violet-500"
                  />

                </div>

              )}

            </div>
          );

        })}

      </div>

    </section>
  );
}