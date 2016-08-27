/* eslint-disable no-sync */

import test from 'tape';
import {stub} from 'sinon';
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
  const path = require('path');
  const babel = require('babel-core');
  const mockInstrumentation = 'foobar';
  const emptyFixtureFilePath = path.resolve('test/fixtures/empty.js');

  t.plan(2);
  const stubbedStdoutWrite = stub(process.stdout, 'write');
  const stubbedBabelTransform = stub(babel, 'transformFileSync')
    .returns({code: mockInstrumentation});

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
    stubbedStdoutWrite.calledWith(mockInstrumentation),
    'wrote instrumented code to stdout'
  );

});
