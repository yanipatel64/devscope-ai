"use client";

import {
  FolderGit2,
  User,
  Code2,
  Star,
  GitFork,
  CalendarDays,
  Files,
  FileCode2,
} from "lucide-react";

import type {
  RepositoryInfo,
  RepositoryMetrics,
} from "@/types/repository";

interface Props {
  repository: RepositoryInfo;
  metrics: RepositoryMetrics;
}

export default function RepositoryInfo({
  repository,
  metrics,
}: Props) {
  
const items = [
  {
    title: "Repository",
    value: repository.name,
    icon: FolderGit2,
  },
  {
    title: "Owner",
    value: repository.owner,
    icon: User,
  },
  {
    title: "Primary Language",
    value: repository.language,
    icon: Code2,
  },
  {
    title: "Stars",
    value: repository.stars,
    icon: Star,
  },
  {
    title: "Forks",
    value: repository.forks,
    icon: GitFork,
  },
  {
    title: "Last Updated",
    value: repository.updated,
    icon: CalendarDays,
  },
  {
    title: "Files",
    value: metrics.total_files,
    icon: Files,
  },
  {
    title: "Lines of Code",
    value: metrics.total_lines,
    icon: FileCode2,
  },
];

  return (
  <section className="rounded-3xl border border-gray-800 bg-gray-950 p-8">

    <h2 className="text-3xl font-bold">
      Repository Overview
    </h2>

    <p className="mt-2 text-gray-400">
      High level repository statistics
    </p>

    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      {items.map((item, index) => {

        const Icon = item.icon;

        return (

          <div
            key={index}
            className="group rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10"
          >

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400 transition group-hover:bg-violet-600 group-hover:text-white">

              <Icon size={28} />

            </div>

            <p className="text-sm text-gray-400">

              {item.title}

            </p>

            <h3 className="mt-2 break-words text-xl font-semibold text-white">

              {item.value}

            </h3>

          </div>

        );

      })}

    </div>

  </section>
);
}