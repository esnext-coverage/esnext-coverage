/* eslint-disable no-sync */

import test from 'tape';
import {stub} from 'sinon';
import formatAction from '../../lib/actions/format';

test('formatAction should be a function', t => {
  t.plan(1);
  t.equal(
    typeof formatAction,
    'function',
    'formatAction is a function'
  );
});

test('formatAction should output JSON-formatted code to stdout', t => {
  // Given
  const fs = require('fs');
  const path = require('path');
  const emptyFormattedFixtureFilePath = path.resolve('test/fixtures/empty-coverage.formatted.json');
  const emptyFormattedFixture = fs.readFileSync(emptyFormattedFixtureFilePath, 'utf8').trim();

  t.plan(1);
  stub(process.stdout, 'write');
  const stubbedStdoutWrite = process.stdout.write;

  // When
  formatAction('test/fixtures/empty-coverage.json');

  // Then
  process.stdout.write.restore();

  t.ok(
    stubbedStdoutWrite.calledWith(emptyFormattedFixture),
    'wrote JSON-formatted coverage data to stdout'
  );

});
