import test from 'node:test';
import assert from 'node:assert/strict';
import { presetAllowed } from '../tool-gate.mjs';
import { createConfirmations } from '../ui-api.mjs';

test('preset gate denies without a preset list or agent scope', () => {
  const ctx = { agentPresets: { composedPreset: () => 'standard' } };
  assert.equal(presetAllowed(ctx, [], { ctx: {} }), false);
  assert.equal(presetAllowed(ctx, ['standard'], undefined), false);
  assert.equal(presetAllowed(ctx, ['standard'], {}), false);
});

test('preset gate admits only listed presets and fails closed', () => {
  const ctx = { agentPresets: { composedPreset: () => 'standard' } };
  assert.equal(presetAllowed(ctx, ['standard'], { ctx: {} }), true);
  assert.equal(presetAllowed(ctx, ['work-assistant'], { ctx: {} }), false);
  assert.equal(presetAllowed({ agentPresets: { composedPreset: () => { throw new Error('gone') } } }, ['standard'], { ctx: {} }), false);
  assert.equal(presetAllowed({ agentPresets: { composedPreset: () => undefined } }, ['standard'], { ctx: {} }), false);
});

test('send confirmation binds scope, peer, content and one use', () => {
  const confirmations = createConfirmations(() => 1000);
  const preview = { draft_id: 'personal_draft_1', version: 2, account_version: 3, to: ['a@b.c'], body: 'hi' };
  const peer = { id: 'peer-1' };
  const id = confirmations.issue('personal', preview, peer);
  assert.equal(confirmations.consume(id, 'work', preview, peer), false);
  assert.equal(confirmations.consume(id, 'personal', preview, {}), false);
  assert.equal(confirmations.consume(id, 'personal', { ...preview, body: 'changed' }, peer), false);
  assert.equal(confirmations.consume(id, 'personal', preview, peer), false);
  const second = confirmations.issue('personal', preview, peer);
  assert.equal(confirmations.consume(second, 'personal', preview, peer), true);
});

test('send confirmation expires', () => {
  let clock = 0;
  const confirmations = createConfirmations(() => clock);
  const preview = { body: 'x' };
  const peer = {};
  const id = confirmations.issue('personal', preview, peer);
  clock = 15 * 60 * 1000 + 1;
  assert.equal(confirmations.consume(id, 'personal', preview, peer), false);
});
