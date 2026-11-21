import test from 'node:test';
import assert from 'node:assert/strict';
import { swissToday, validateReservationInput } from '../src/lib/reservation-validation';

const valid = {
  nom: 'Cliente Genève',
  email: 'cliente@example.com',
  telephone: '+41 22 340 33 50',
  date: '2026-11-23',
  service: 'diner',
  personnes: 2,
  message: 'Près de la fenêtre',
};

const validate = (change: Record<string, unknown> = {}) =>
  validateReservationInput({ ...valid, ...change }, '2026-11-21');

test('accepts a valid request with normalized fields', () => {
  const result = validate({ nom: '  Cliente Genève  ', personnes: '2', message: '  calme  ' });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.nom, 'Cliente Genève');
    assert.equal(result.data.personnes, 2);
    assert.equal(result.data.message, 'calme');
  }
});

test('rejects missing and malformed reservation bodies', () => {
  assert.equal(validateReservationInput(null).ok, false);
  assert.equal(validateReservationInput([]).ok, false);
  assert.equal(validateReservationInput({}).ok, false);
});

test('rejects invalid contact details', () => {
  assert.equal(validate({ nom: '' }).ok, false);
  assert.equal(validate({ email: 'invalid-email' }).ok, false);
  assert.equal(validate({ telephone: 'no number' }).ok, false);
});

test('rejects dates in the past and invalid calendar dates', () => {
  assert.equal(validate({ date: '2026-11-20' }).ok, false);
  assert.equal(validate({ date: '2026-02-30' }).ok, false);
  assert.equal(validate({ date: 'not-a-date' }).ok, false);
});

test('enforces Sunday closure but accepts Saturday', () => {
  assert.equal(validate({ date: '2026-11-22' }).ok, false);
  assert.equal(validate({ date: '2026-11-21' }).ok, true);
});

test('rejects incorrect services and party sizes', () => {
  assert.equal(validate({ service: 'brunch' }).ok, false);
  assert.equal(validate({ personnes: 0 }).ok, false);
  assert.equal(validate({ personnes: 21 }).ok, false);
  assert.equal(validate({ personnes: 2.5 }).ok, false);
});

test('limits special requests', () => {
  assert.equal(validate({ message: 'x'.repeat(2001) }).ok, false);
  assert.equal(validate({ message: null }).ok, true);
});

test('uses Geneva calendar date around UTC midnight', () => {
  assert.equal(swissToday(new Date('2026-12-31T23:30:00Z')), '2027-01-01');
  assert.equal(swissToday(new Date('2026-07-31T22:30:00Z')), '2026-08-01');
});
