import test, { afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { sendReservationReceipt } from '../src/lib/mail';

const originalApiKey = process.env.RESEND_API_KEY;

afterEach(() => {
  mock.restoreAll();
  if (originalApiKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalApiKey;
});

const data = {
  nom: 'Client <Test>',
  email: 'client@example.com',
  date: '2026-11-24',
  service: 'diner',
  personnes: 3,
};

test('customer receives a pending-request acknowledgement, not a confirmed table', async () => {
  process.env.RESEND_API_KEY = 'test-key';
  let payload: Record<string, unknown> | undefined;
  mock.method(globalThis, 'fetch', async (_url: string | URL | Request, options?: RequestInit) => {
    payload = JSON.parse(String(options?.body));
    return new Response(JSON.stringify({ id: 'test' }), { status: 200 });
  });

  assert.deepEqual(await sendReservationReceipt(data), { success: true });
  assert.deepEqual(payload?.to, ['client@example.com']);
  assert.equal(payload?.reply_to, 'lagazelledorgeneva@gmail.com');
  assert.match(String(payload?.subject), /demande de réservation/);
  assert.match(String(payload?.text), /pas encore la disponibilité de la table/);
  assert.match(String(payload?.text), /24 novembre 2026/);
  assert.match(String(payload?.html), /Client &lt;Test&gt;/);
  assert.doesNotMatch(String(payload?.html), /Client <Test>/);
  assert.match(String(payload?.html), /pas encore confirmée/);
});

test('missing Resend API key fails without issuing an outbound request', async () => {
  delete process.env.RESEND_API_KEY;
  let calls = 0;
  mock.method(globalThis, 'fetch', async () => {
    calls += 1;
    return new Response(null, { status: 200 });
  });

  assert.deepEqual(await sendReservationReceipt(data), { success: false });
  assert.equal(calls, 0);
});

test('provider rejection returns a failure rather than claiming an email was sent', async () => {
  process.env.RESEND_API_KEY = 'test-key';
  mock.method(globalThis, 'fetch', async () => new Response(null, { status: 429 }));

  assert.deepEqual(await sendReservationReceipt(data), { success: false });
});
