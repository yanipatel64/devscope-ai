"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

interface Props {
  scores: {
    project_health: number;
    security: number;
    architecture: number;
    maintainability: number;
  };

  languages?: Record<string, number>;
}

const COLORS = [
  "#8B5CF6",
  "#6366F1",
  "#3B82F6",
  "#06B6D4",
  "#14B8A6",
  "#10B981",
  "#22C55E",
  "#F59E0B",
];

export default function RepositoryAnalytics({
  scores,
  languages = {},
}: Props) {
  const scoreData = [
    {
      name: "Health",
      value: Number(scores.project_health),
    },
    {
      name: "Security",
      value: Number(scores.security),
    },
    {
      name: "Architecture",
      value: Number(scores.architecture),
    },
    {
      name: "Maintainability",
      value: Number(scores.maintainability),
    },
  ];

  const languageData = Object.entries(languages).map(
    ([name, value]) => ({
      name,
      value: Number(value),
    })
  );
    return (
    <section className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-950 to-black p-8 shadow-2xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Repository Analytics
          </h2>

          <p className="mt-2 text-gray-400">
            AI generated repository health overview
          </p>

        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* BAR CHART */}

        <div className="rounded-2xl border border-gray-800 bg-[#111827] p-6">

          <h3 className="mb-6 text-xl font-semibold">
            Repository Health
          </h3>

          <div className="h-[340px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={scoreData}
                margin={{
                  top: 25,
                  right: 20,
                  left: 10,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  stroke="#2A2A2A"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "#9CA3AF",
                    fontSize: 13,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[0, 100]}
                  tick={{
                    fill: "#9CA3AF",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  cursor={{
                    fill: "#1F2937",
                  }}
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />

                <Bar
                  dataKey="value"
                  radius={[12, 12, 0, 0]}
                  fill="#8B5CF6"
                  animationDuration={1500}
                >

                  <LabelList
                    dataKey="value"
                    position="top"
                    fill="#ffffff"
                    formatter={(v) => `${v}%`}
                  />

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* PIE CHART */}

        <div className="rounded-2xl border border-gray-800 bg-[#111827] p-6">

          <h3 className="mb-6 text-xl font-semibold">
            Language Distribution
          </h3>

          <div className="h-[340px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={languageData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={115}
                  paddingAngle={3}
                  animationDuration={1400}
                  label
                >

                  {languageData.map((_, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </section>
  );
}