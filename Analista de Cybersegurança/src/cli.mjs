import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { scanProject, markdownReport } from './scanner.mjs';

try {
  const { values, positionals } = parseArgs({ allowPositionals: true,
    options: { out: { type: 'string' }, 'fail-on-findings': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' } } });
  if (values.help) {
    console.log('Uso: node src/cli.mjs <projeto> [--out <diretório>] [--fail-on-findings]');
  } else {
    if (positionals.length !== 1) throw new Error('Informe um único diretório de projeto. Use --help.');
    const report = await scanProject(positionals[0]);
    const output = path.resolve(values.out ?? 'reports');
    await mkdir(output, { recursive: true });
    const name = `triagem-${new Date().toISOString().replaceAll(':', '-')}-${crypto.randomUUID().slice(0, 8)}`;
    await writeFile(path.join(output, `${name}.json`), JSON.stringify(report, null, 2), { flag: 'wx' });
    await writeFile(path.join(output, `${name}.md`), markdownReport(report), { flag: 'wx' });
    console.log(`${report.files.length} arquivos; ${report.findings.length} suspeitas. Relatório: ${path.join(output, `${name}.md`)}`);
    if (report.truncated || report.skipped.some(x => /ilegível|ilegíveis|Ilegível|Diretório ilegível/.test(x.reason))) process.exitCode = 2;
    else if (values['fail-on-findings'] && report.findings.length) process.exitCode = 1;
  }
} catch (error) {
  console.error(`Falha na triagem: ${error.message}`);
  process.exitCode = 2;
}
