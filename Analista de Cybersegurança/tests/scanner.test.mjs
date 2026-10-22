import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, mkdir, symlink, rm, readFile, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { scanProject, readProjectFile, markdownReport } from '../src/scanner.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'cyber-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

test('detecta suspeitas com linhas e não divulga o segredo no relatório', async t => {
  const root = await fixture(t);
  const secret = 'credencial-ficticia-apenas-teste';
  await writeFile(path.join(root, 'app.js'), `const password = "${secret}";\neval(input);\n`);
  const result = await scanProject(root);
  assert.equal(result.findings.length, 2);
  assert.equal(result.findings[1].line, 2);
  assert.equal(result.findings[0].status, 'suspeita');
  assert.ok(!JSON.stringify(result).includes(secret));
  assert.ok(!markdownReport(result).includes(secret));
  assert.ok(!(await readProjectFile(root, 'app.js')).content.includes(secret));
});

test('rejeita traversal, caminhos absolutos, diretórios excluídos e .env', async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, '.env'), 'PASSWORD=local');
  await mkdir(path.join(root, 'node_modules'));
  await writeFile(path.join(root, 'node_modules', 'x.js'), 'eval(input)');
  for (const file of ['../outside.js', '..\\outside.js', path.join(root, '.env'), '.env', 'node_modules/x.js']) {
    await assert.rejects(readProjectFile(root, file));
  }
  assert.equal((await scanProject(root)).findings.length, 0);
});

test('não segue junctions para fora do alvo', async t => {
  const root = await fixture(t);
  const outside = await fixture(t);
  await writeFile(path.join(outside, 'secret.js'), 'eval(input)');
  try { await symlink(outside, path.join(root, 'escape'), 'junction'); }
  catch (error) { if (error.code === 'EPERM') { t.skip('Sistema não permite criar links'); return; } throw error; }
  await assert.rejects(readProjectFile(root, 'escape/secret.js'));
  assert.equal((await scanProject(root)).findings.length, 0);
});

test('informa limites e ignora binários e arquivos grandes', async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, 'a.js'), 'const n = 1;');
  await writeFile(path.join(root, 'b.js'), 'eval(input)');
  assert.equal((await scanProject(root, { maxFiles: 1 })).truncated, true);
  await writeFile(path.join(root, 'binary.js'), Buffer.from([0, 1, 2]));
  await writeFile(path.join(root, 'large.js'), 'x'.repeat(512 * 1024 + 1));
  const report = await scanProject(root);
  assert.equal(report.skipped.length, 2);
  await assert.rejects(readProjectFile(root, 'large.js'));
});

test('CLI gera JSON/Markdown e distingue achados de erro operacional', async t => {
  const root = await fixture(t);
  const output = await fixture(t);
  await writeFile(path.join(root, 'app.py'), 'eval(user_input)');
  const result = spawnSync(process.execPath, ['src/cli.mjs', root, '--out', output, '--fail-on-findings'], { encoding: 'utf8' });
  assert.equal(result.status, 1, result.stderr);
  const files = await readdir(output);
  assert.equal(files.length, 2);
  const json = JSON.parse(await readFile(path.join(output, files.find(x => x.endsWith('.json'))), 'utf8'));
  assert.equal(json.findings[0].rule, 'SEC004');
  const invalid = spawnSync(process.execPath, ['src/cli.mjs', path.join(root, 'missing')]);
  assert.equal(invalid.status, 2);
});

test('projeto sem padrões suspeitos não gera achados', async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, 'app.js'), 'export const sum = (a, b) => a + b;');
  const report = await scanProject(root);
  assert.equal(report.findings.length, 0);
  assert.equal(report.truncated, false);
  assert.equal(report.files.length, 1);
});

test('redação de chave multilinha preserva numeração das linhas seguintes', async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, 'config.js'), '-----BEGIN PRIVATE KEY-----\nconteudo-ficticio\n-----END PRIVATE KEY-----\nconst n = 1;');
  const result = await readProjectFile(root, 'config.js', 4, 1);
  assert.equal(result.content, '4: const n = 1;');
  assert.equal(result.totalLines, 4);
});
