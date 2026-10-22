import { defineTool } from "eve/tools";
import { z } from "zod";
import { scanProject } from "../../src/scanner.mjs";

export default defineTool({
  description: "Faz triagem estática do projeto configurado em CYBER_PROJECT_ROOT. Não executa código. Retorna suspeitas, nunca vulnerabilidades confirmadas.",
  inputSchema: z.object({}),
  async execute() {
    const report = await scanProject(process.env.CYBER_PROJECT_ROOT);
    return { ...report, files: report.files.slice(0, 300),
      findings: report.findings.slice(0, 100), skipped: report.skipped.slice(0, 100),
      totalFiles: report.files.length, totalFindings: report.findings.length,
      modelOutputTruncated: report.files.length > 300 || report.findings.length > 100 || report.skipped.length > 100 };
  },
});
