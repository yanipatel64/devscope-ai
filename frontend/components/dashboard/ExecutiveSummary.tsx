"use client";

interface Props {
  health: number;
  security: number;
  architecture: number;
  maintainability: number;
  complexity: string;
}

export default function ExecutiveSummary({
  health,
  security,
  architecture,
  maintainability,
  complexity,
}: Props) {

  const average = Math.round(
    (health +
      security +
      architecture +
      maintainability) / 4
  );

  const grade =
    average >= 90
      ? "A+"
      : average >= 80
      ? "A"
      : average >= 70
      ? "B"
      : average >= 60
      ? "C"
      : "D";

  const risk =
  average >= 80
    ? "Low"
    : average >= 60
    ? "Medium"
    : "High";

  return (
    <section className="grid gap-6 lg:grid-cols-4">

      <Card
        title="Overall Grade"
        value={grade}
        color="text-violet-400"
      />

      <Card
        title="Average Score"
        value={`${average}%`}
        color="text-green-400"
      />

      <Card
        title="Risk Level"
        value={risk}
        color={
          risk === "Low"
            ? "text-green-400"
            : risk === "Medium"
            ? "text-yellow-400"
            : "text-red-400"
        }
      />

      <Card
        title="Complexity"
        value={complexity}
        color="text-blue-400"
      />

    </section>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className={`mt-4 text-4xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}