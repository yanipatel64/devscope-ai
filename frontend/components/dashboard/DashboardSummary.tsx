"use client";

import {
  FolderGit2,
  FileCode2,
  Calendar,
  Binary,
} from "lucide-react";

import type {
  RepositoryInfo,
  RepositoryMetrics,
} from "@/types/repository";

interface Props {
  repository: RepositoryInfo;
  metrics: RepositoryMetrics;
}

export default function DashboardSummary({
  repository,
  metrics,
}: Props) {

  const languageCount = Object.keys(
    metrics.languages
  ).length;

  const repositorySize =
    metrics.total_lines < 1000
      ? "Small"
      : metrics.total_lines < 10000
      ? "Medium"
      : "Large";

  const cards = [
    {
      title: "Repository Size",
      value: repositorySize,
      icon: FolderGit2,
    },
    {
      title: "Files",
      value: metrics.total_files,
      icon: FileCode2,
    },
    {
      title: "Languages",
      value: languageCount,
      icon: Binary,
    },
    {
      title: "Lines of Code",
      value: metrics.total_lines,
      icon: FileCode2,
    },
    {
      title: "Last Updated",
      value: repository.updated,
      icon: Calendar,
    },
  ];

  return (
    <section className="rounded-3xl border border-gray-800 bg-gray-950 p-8">

      <h2 className="mb-2 text-3xl font-bold">
        Repository Snapshot
      </h2>

      <p className="mb-8 text-gray-400">
        High-level repository statistics
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">

        {cards.map((card, index) => {

          const Icon = card.icon;

          return (
            <div
              key={index}
              className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6 transition hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10"
            >

              <Icon
                className="mb-5 text-violet-400"
                size={30}
              />

              <p className="text-sm text-gray-400">

                {card.title}

              </p>

              <h3 className="mt-2 text-2xl font-bold">

                {card.value}

              </h3>

            </div>
          );

        })}

      </div>

    </section>
  );
}