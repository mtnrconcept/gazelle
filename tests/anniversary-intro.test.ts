import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ANNIVERSARY_INTRO_MEDIA,
  introLayoutFor,
  isAnniversaryIntroActive,
} from '../src/lib/anniversary-intro';

test('intro is shown until Sunday 29 November 2026 included, Geneva time', () => {
  assert.equal(isAnniversaryIntroActive(Date.parse('2026-11-21T12:00:00+01:00')), true);
  assert.equal(isAnniversaryIntroActive(Date.parse('2026-11-28T23:30:00+01:00')), true);
  assert.equal(isAnniversaryIntroActive(Date.parse('2026-11-29T23:59:59+01:00')), true);
  assert.equal(isAnniversaryIntroActive(Date.parse('2026-11-30T00:00:00+01:00')), false);
  assert.equal(isAnniversaryIntroActive(Date.parse('2026-12-15T10:00:00+01:00')), false);
});

test('picks the 16:9 video on landscape screens and the 9:16 video on portrait screens', () => {
  assert.equal(introLayoutFor(1920, 1080).orientation, 'landscape');
  assert.equal(introLayoutFor(1440, 900).orientation, 'landscape');
  assert.equal(introLayoutFor(390, 844).orientation, 'portrait');
  assert.equal(introLayoutFor(768, 1024).orientation, 'portrait');
});

test('fills the screen only when at most 10% of the picture would be cropped', () => {
  assert.equal(introLayoutFor(1920, 1080).fit, 'cover');
  assert.equal(introLayoutFor(1440, 900).fit, 'cover');
  assert.equal(introLayoutFor(1080, 1920).fit, 'cover');
  // Phones taller than 9:16 and ultra-wide monitors keep the whole picture (prices, phones, logo).
  assert.equal(introLayoutFor(390, 844).fit, 'contain');
  assert.equal(introLayoutFor(2560, 1080).fit, 'contain');
  assert.equal(introLayoutFor(768, 1024).fit, 'contain');
});

test('every orientation offers an AV1 source with an H.264 fallback', () => {
  for (const media of [ANNIVERSARY_INTRO_MEDIA.landscape, ANNIVERSARY_INTRO_MEDIA.portrait]) {
    assert.match(media.av1, /-av1\.mp4$/);
    assert.match(media.h264, /-h264\.mp4$/);
  }
});
