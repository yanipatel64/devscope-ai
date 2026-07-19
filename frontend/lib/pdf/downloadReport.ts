import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { AnalysisResult } from "@/types/repository";

export function downloadReport(result: AnalysisResult) {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("DevScope AI Report", 14, 20);

  doc.setFontSize(12);

  doc.text(
    `Repository: ${result.repository_info.name}`,
    14,
    35
  );

  doc.text(
    `Owner: ${result.repository_info.owner}`,
    14,
    43
  );

  doc.text(
    `Language: ${result.repository_info.language}`,
    14,
    51
  );

  autoTable(doc, {
    startY: 60,

    head: [["Metric", "Score"]],

    body: [
      [
        "Project Health",
        `${result.scores.project_health}%`,
      ],
      [
        "Security",
        `${result.scores.security}%`,
      ],
      [
        "Architecture",
        `${result.scores.architecture}%`,
      ],
      [
        "Maintainability",
        `${result.scores.maintainability}%`,
      ],
    ],
  });

  const metricsY =
    (doc as any).lastAutoTable.finalY + 10;

  autoTable(doc, {
    startY: metricsY,

    head: [["Repository Metric", "Value"]],

    body: [
      [
        "Total Files",
        result.repository_metrics.total_files,
      ],
      [
        "Lines of Code",
        result.repository_metrics.total_lines,
      ],
      [
        "Languages",
        Object.keys(
          result.repository_metrics.languages
        ).join(", "),
      ],
    ],
  });

  const analysisY =
    (doc as any).lastAutoTable.finalY + 15;

  doc.setFontSize(16);

  doc.text(
    "AI Analysis",
    14,
    analysisY
  );

  doc.setFontSize(11);

  const lines = doc.splitTextToSize(
    result.ai_analysis,
    180
  );

  let y = analysisY + 10;

  lines.forEach((line: string) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }

    doc.text(line, 14, y);

    y += 6;
  });

  doc.save("DevScope_AI_Report.pdf");
}