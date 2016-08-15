/* eslint-disable no-sync */

import test from 'tape';
import {stub, spy} from 'sinon';
import instrumentAction from '../../lib/actions/instrument';

test('instrumentAction should be a function', t => {
  t.plan(1);
  t.equal(
    typeof instrumentAction,
    'function',
    'instrumentAction is a function'
  );
});

test('instrumentAction should output instrumented code to stdout', t => {
  // Given
  const fs = require('fs');
  const path = require('path');
  const babel = require('babel-core');
  const emptyFixtureFilePath = path.resolve('test/fixtures/empty.js');
  const emptyFixtureInstrumented = fs.readFileSync(path.resolve('test/fixtures/empty.instrumented.js'), 'utf8');

  t.plan(2);
  stub(process.stdout, 'write');
  spy(babel, 'transformFileSync');
  const stubbedStdoutWrite = process.stdout.write;
  const stubbedBabelTransform = babel.transformFileSync;

  // When
  instrumentAction('test/fixtures/empty.js');

  // Then
  process.stdout.write.restore();
  babel.transformFileSync.restore();

  t.ok(
    stubbedBabelTransform.calledWith(emptyFixtureFilePath),
    'applied transformation to the correct file'
  );
  t.ok(
    stubbedStdoutWrite.calledWith(emptyFixtureInstrumented),
    'wrote instrumented code to stdout'
  );

});
