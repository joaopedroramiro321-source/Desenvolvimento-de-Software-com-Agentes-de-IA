import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

const script = readFileSync(new URL('../../../../../projetos/atletica-unesp-dracena/script.js', import.meta.url), 'utf8');

function setup(initialReduced = false) {
  const classes = new Set();
  const attributes = {};
  const listeners = {};
  let change;
  const ribbon = { classList: { toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); } } };
  const button = {
    hidden: true,
    innerHTML: '',
    setAttribute(name, value) { attributes[name] = value; },
    addEventListener(name, callback) { listeners[name] = callback; }
  };
  const media = { matches: initialReduced, addEventListener(name, callback) { assert.equal(name, 'change'); change = callback; } };
  const context = {
    document: { querySelector(selector) { return selector === '.identity-ribbon' ? ribbon : selector === '.ribbon-toggle' ? button : null; } },
    window: { matchMedia(query) { return query.includes('prefers-reduced-motion') ? media : { matches: true }; } }
  };
  vm.runInNewContext(script, context);
  return { classes, attributes, button, click: () => listeners.click(), reduce(value) { media.matches = value; change(); } };
}

test('movimento normal inicia, pausa e retoma com nome acessível coerente', () => {
  const ui = setup();
  assert.equal(ui.button.hidden, false);
  assert.equal(ui.classes.has('is-animated'), true);
  assert.equal(ui.classes.has('is-paused'), false);
  assert.equal(ui.attributes['aria-label'], 'Pausar animação da faixa');
  ui.click();
  assert.equal(ui.classes.has('is-paused'), true);
  assert.equal(ui.attributes['aria-label'], 'Retomar animação da faixa');
  assert.match(ui.button.innerHTML, /^Retomar /);
  ui.click();
  assert.equal(ui.classes.has('is-paused'), false);
  assert.equal(ui.attributes['aria-label'], 'Pausar animação da faixa');
});

test('preferência reduzida inicia estática e reage à troca do sistema', () => {
  const ui = setup(true);
  assert.equal(ui.button.hidden, true);
  assert.equal(ui.classes.has('is-animated'), false);
  ui.reduce(false);
  assert.equal(ui.button.hidden, false);
  assert.equal(ui.classes.has('is-animated'), true);
  ui.reduce(true);
  assert.equal(ui.button.hidden, true);
  assert.equal(ui.classes.has('is-animated'), false);
});

test('pausa escolhida pelo usuário persiste ao alternar preferência de movimento', () => {
  const ui = setup();
  ui.click();
  ui.reduce(true);
  ui.reduce(false);
  assert.equal(ui.classes.has('is-animated'), true);
  assert.equal(ui.classes.has('is-paused'), true);
  assert.equal(ui.attributes['aria-label'], 'Retomar animação da faixa');
});
