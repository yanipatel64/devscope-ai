"use client";

import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileCode2,
  FileText,
  Image,
  FileJson,
  FileType,
  Code2,
  Globe,
} from "lucide-react";

import { useState } from "react";

interface Props {
  folders: string[];
  files: string[];
}

export default function RepositoryExplorer({
  folders,
  files,
}: Props) {

  const [openFolders, setOpenFolders] = useState<string[]>(folders);

  const [search, setSearch] = useState("");

  function toggle(folder: string) {
    if (openFolders.includes(folder)) {
      setOpenFolders(
        openFolders.filter((f) => f !== folder)
      );
    } else {
      setOpenFolders([
        ...openFolders,
        folder,
      ]);
    }
  }

  function getFileIcon(file: string) {

  const ext =
    file.split(".").pop()?.toLowerCase() ?? "";

  switch (ext) {

    case "html":
      return <Globe size={17} className="text-orange-400" />;

    case "css":
      return <FileType size={17} className="text-sky-400" />;

    case "js":
    case "ts":
    case "tsx":
      return <Code2 size={17} className="text-yellow-400" />;

    case "json":
      return <FileJson size={17} className="text-amber-400" />;

    case "md":
      return <FileText size={17} className="text-blue-400" />;

    case "php":
      return <Code2 size={17} className="text-violet-400" />;

    case "png":
    case "jpg":
    case "jpeg":
    case "svg":
    case "gif":
    case "webp":
      return <Image size={17} className="text-pink-400" />;

    default:
      return <FileCode2 size={17} className="text-gray-400" />;
  }

}

  const groupedFiles: Record<string, string[]> = {};

  folders.forEach((folder) => {
    groupedFiles[folder] = [];
  });

  groupedFiles["Root"] = [];

  files
  .filter((file) =>
    file.toLowerCase().includes(search.toLowerCase())
  )
  .forEach((file) => {

    const parts = file.split("\\");

    if (parts.length === 1) {
      groupedFiles["Root"].push(file);
      return;
    }

    const folder = parts[0];

    if (!groupedFiles[folder]) {
      groupedFiles[folder] = [];
    }

    groupedFiles[folder].push(parts.slice(1).join("\\"));

  });
    return (
    <section className="rounded-3xl border border-gray-800 bg-gray-950 p-8">

      <h2 className="mb-8 text-3xl font-bold">
        Repository Explorer
      </h2>

      <div className="mb-6">

  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search files..."
    className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-violet-500"
  />

</div>

      <div className="rounded-2xl border border-gray-800 bg-[#0D1117] p-6">

        {/* Root Files */}

        {groupedFiles["Root"]?.length > 0 && (
          <div className="mb-6">

            <div className="mb-3 flex items-center gap-2 font-semibold text-violet-300">
              <FolderOpen size={20} />
              Root
            </div>

            <div className="ml-7 space-y-2">

              {groupedFiles["Root"].map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-800"
                >
                  {getFileIcon(file)}

                  <span className="text-gray-300">
                    {file}
                  </span>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Folders */}

        <div className="space-y-4">

          {folders.map((folder) => {

            const isOpen =
              openFolders.includes(folder);

            return (
              <div
                key={folder}
                className="rounded-xl border border-gray-800"
              >

                <button
                  onClick={() => toggle(folder)}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-gray-800"
                >

                  {isOpen ? (
                    <ChevronDown
                      size={18}
                      className="text-gray-400"
                    />
                  ) : (
                    <ChevronRight
                      size={18}
                      className="text-gray-400"
                    />
                  )}

                  {isOpen ? (
                    <FolderOpen
                      size={20}
                      className="text-yellow-400"
                    />
                  ) : (
                    <Folder
                      size={20}
                      className="text-yellow-400"
                    />
                  )}

                  <span className="font-medium">
                    {folder}
                  </span>

                </button>

                {isOpen && (
                  <div className="ml-10 mb-4 mr-4 space-y-2">

                    {(groupedFiles[folder] || []).map(
                      (file) => (
                        <div
                          key={file}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-800"
                        >
                          {getFileIcon(file)}

                          <span className="text-gray-300">
                            {file}
                          </span>

                        </div>
                      )
                    )}

                  </div>
                )}

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}