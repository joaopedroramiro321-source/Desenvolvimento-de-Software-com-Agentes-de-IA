import { readdir, lstat, realpath, open } from 'node:fs/promises';
import path from 'node:path';

const ignored = new Set(['.git', '.svn', 'node_modules', '.venv', 'venv', 'vendor',
  'dist', 'build', 'coverage', '.next', '.eve', 'reports', '.aws', '.ssh']);
const extensions = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.py',
  '.php', '.rb', '.go', '.java', '.cs', '.rs', '.json', '.yaml', '.yml', '.toml',
  '.xml', '.tf', '.html', '.sh', '.ps1', '.sql', '.properties', '.ini', '.conf']);
const maxBytes = 512 * 1024;
const rules = [
  { id: 'SEC001', severity: 'alta', cwe: 'CWE-798', title: 'Possível credencial literal',
    regex: /\b(?:api[_-]?key|secret|password|access[_-]?token)\b["']?\s*[:=]\s*["'][^"'\r\n]{8,}["']/i,
    fix: 'Verificar se é credencial real; remover do código e rotacionar se exposta.' },
  { id: 'SEC002', severity: 'alta', cwe: 'CWE-321', title: 'Possível chave privada',
    regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
    fix: 'Remover a chave do projeto e revogar/substituir a credencial exposta.' },
  { id: 'SEC003', severity: 'media', cwe: 'CWE-295', title: 'Verificação TLS possivelmente desabilitada',
    regex: /rejectUnauthorized\s*:\s*false|verify\s*=\s*False|NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*["']?0/,
    fix: 'Habilitar validação do certificado e usar uma cadeia de confiança válida.' },
  { id: 'SEC004', severity: 'alta', cwe: 'CWE-95', title: 'Avaliação dinâmica de código',
    regex: /\beval\s*\(/,
    fix: 'Verificar origem do argumento; substituir avaliação de código por parsing estrito.' },
  { id: 'SEC005', severity: 'media', cwe: 'CWE-79', title: 'Inserção de HTML exige revisão',
    regex: /dangerouslySetInnerHTML|\.innerHTML\s*=/,
    fix: 'Verificar controle da entrada e sanitização; preferir renderização como texto.' },
  { id: 'SEC006', severity: 'alta', cwe: 'CWE-78', title: 'Execução com shell exige revisão',
    regex: /shell\s*[:=]\s*(?:true|True)|\bos\.system\s*\(/,
    fix: 'Verificar influência do usuário; usar executável fixo e argumentos separados sem shell.' },
];

export function permittedFile(name) {
  return name.startsWith('.env') || name === 'Dockerfile' ||
    extensions.has(path.extname(name).toLowerCase());
}

export async function projectRoot(input) {
  if (!input) throw new Error('Informe o caminho do projeto ou configure CYBER_PROJECT_ROOT.');
  const root = await realpath(input);
  if (!(await lstat(root)).isDirectory()) throw new Error('O alvo precisa ser um diretório.');
  return root;
}

// Reject traversal, links/junctions and special files; never resolve a link into another project.
export async function safeFile(root, relative) {
  if (!relative || path.isAbsolute(relative) || relative.includes(':')) throw new Error('Caminho inválido.');
  const parts = relative.replaceAll('\\', '/').split('/');
  if (parts.some(p => !p || p === '.' || p === '..' || ignored.has(p))) throw new Error('Caminho fora do escopo.');
  let current = root;
  for (const part of parts) {
    current = path.join(current, part);
    if ((await lstat(current)).isSymbolicLink()) throw new Error('Links não são permitidos.');
  }
  const resolved = await realpath(current);
  const rel = path.relative(root, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) throw new Error('Caminho fora do escopo.');
  const stat = await lstat(resolved);
  if (!stat.isFile() || stat.size > maxBytes) throw new Error('Arquivo especial ou acima do limite de 512 KiB.');
  if (!permittedFile(path.basename(resolved))) throw new Error('Tipo de arquivo não suportado.');
  return resolved;
}

async function textFile(file) {
  const handle = await open(file, 'r');
  try {
    const buffer = Buffer.alloc(maxBytes + 1);
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    if (bytesRead > maxBytes) throw new Error('Arquivo acima do limite.');
    const text = buffer.subarray(0, bytesRead).toString('utf8');
    if (text.includes('\0')) throw new Error('Arquivo binário.');
    return text;
  } finally { await handle.close(); }
}

export function redact(text) {
  return text
    .replace(/-----BEGIN [^-]*PRIVATE KEY-----[\s\S]*?(?:-----END [^-]*PRIVATE KEY-----|$)/g,
      match => match.split('\n').map(() => '[CHAVE PRIVADA REMOVIDA]').join('\n'))
    .replace(/^.*(?:password|passwd|secret|token|api[_-]?key|authorization|credential).*$/gim, '[LINHA POTENCIALMENTE SENSÍVEL REMOVIDA]')
    .replace(/\b(?:AKIA[A-Z0-9]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{16,})\b/g, '[SEGREDO REMOVIDO]');
}

export async function readProjectFile(rootInput, relative, start = 1, count = 100) {
  const root = await projectRoot(rootInput);
  const file = await safeFile(root, relative);
  if (path.basename(file).startsWith('.env')) throw new Error('Conteúdo de .env não é enviado ao modelo; use a triagem.');
  const text = redact(await textFile(file));
  const lines = text.split(/\r?\n/);
  return { file: relative, totalLines: lines.length,
    content: lines.slice(start - 1, start - 1 + count).map((line, i) =>
      `${start + i}: ${line.slice(0, 2000)}`).join('\n').slice(0, 24000) };
}

export async function scanProject(rootInput, options = {}) {
  const root = await projectRoot(rootInput);
  const limit = options.maxFiles ?? 5000;
  const report = { schemaVersion: 1, generatedAt: new Date().toISOString(), root,
    mode: 'triagem-estatica', files: [], findings: [], skipped: [],
    truncated: false, entriesVisited: 0,
    limitations: ['Regras heurísticas: todos os achados exigem validação contextual.',
      'Não consulta CVEs, histórico Git ou serviços de rede; não executa código.',
      'Não segue links; ignora dependências, builds e arquivos acima de 512 KiB.',
      'Não oferece proteção contra alterações concorrentes maliciosas no diretório; use cópia estável.'] };
  async function walk(dir, depth = 0) {
    if (depth > 40) { report.truncated = true; return; }
    let entries;
    try { entries = await readdir(dir, { withFileTypes: true }); }
    catch { report.skipped.push({ file: path.relative(root, dir), reason: 'Diretório ilegível' }); return; }
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (report.files.length >= limit || report.entriesVisited >= 20000 || report.findings.length >= 1000) {
        report.truncated = true; return;
      }
      report.entriesVisited++;
      const absolute = path.join(dir, entry.name);
      const relative = path.relative(root, absolute).replaceAll('\\', '/');
      if (entry.isSymbolicLink()) { report.skipped.push({ file: relative, reason: 'Link ignorado' }); continue; }
      if (entry.isDirectory()) {
        if (!ignored.has(entry.name)) await walk(absolute, depth + 1);
        else report.skipped.push({ file: relative, reason: 'Diretório excluído' });
        continue;
      }
      if (!entry.isFile() || !permittedFile(entry.name)) continue;
      let text;
      try { text = await textFile(await safeFile(root, relative)); }
      catch { report.skipped.push({ file: relative, reason: 'Ilegível, binário, link ou acima do limite' }); continue; }
      report.files.push(relative);
      for (const [index, line] of text.split(/\r?\n/).entries()) {
        for (const rule of rules) {
          if (report.findings.length >= 1000) { report.truncated = true; return; }
          if (rule.regex.test(line)) report.findings.push({
            id: `${rule.id}-${report.findings.length + 1}`, rule: rule.id,
            severity: rule.severity, confidence: 'heuristica', status: 'suspeita',
            title: rule.title, cwe: rule.cwe, file: relative, line: index + 1,
            evidence: 'Padrão detectado nesta linha; conteúdo omitido para evitar exposição de segredos.',
            recommendation: rule.fix,
          });
        }
      }
    }
  }
  await walk(root);
  return report;
}

const escapeMd = text => String(text).replace(/[<>&|`\\\r\n]/g, ch =>
  ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '|': '&#124;', '`': '&#96;', '\\': '/', '\r': ' ', '\n': ' ' })[ch]);

export function markdownReport(report) {
  return `# Triagem de segurança\n\nData: ${report.generatedAt}\n\n` +
    `Alvo: ${escapeMd(report.root)}\n\nArquivos analisados: ${report.files.length}. ` +
    `Suspeitas: ${report.findings.length}. Limite atingido: ${report.truncated ? 'sim' : 'não'}.\n\n` +
    `Resultados heurísticos, sem confirmação de explorabilidade. Ausência de achados não comprova segurança.\n\n` +
    `| ID | Severidade | Local | Suspeita | Correção sugerida |\n|---|---|---|---|---|\n` +
    report.findings.map(f => `| ${f.id} | ${f.severity} | ${escapeMd(f.file)}:${f.line} | ${f.title} (${f.cwe}) | ${f.recommendation} |`).join('\n') +
    `\n\n## Limitações\n\n${report.limitations.map(x => `- ${x}`).join('\n')}\n\n` +
    `## Arquivos/diretórios ignorados\n\n${report.skipped.map(x => `- ${escapeMd(x.file)}: ${x.reason}`).join('\n') || 'Nenhum registrado.'}\n`;
}
