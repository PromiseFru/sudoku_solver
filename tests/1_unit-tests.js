/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('UnitTests', () => {
  suiteSetup(done => {
    solver = new Solver();
    done();
  });

  suite('Function validate()', () => {
    test('Valid Characters, length of 81', (done) => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      var result = solver.validate(input);

      assert.equal(result, input);
      done();
    });

    // Invalid characters or numbers are not accepted 
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9" or "."") are not accepted', (done) => {
      const input = '..X..5.1.85.4....2432.HI...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const error = "Invalid characters in puzzle";

      var result = solver.validate(input);

      assert.equal(result.error, error);
      done();
    });

    // Puzzles that are not 81 numbers/periods long show the message 
    test('Shows an error for puzzles that are not 81 numbers long', done => {
      const shortStr = '83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const longStr = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...';
      const errorMsg = 'Expected puzzle to be 81 characters long';

      assert.equal(solver.validate(shortStr).error, errorMsg)
      assert.equal(solver.validate(longStr).error, errorMsg)
      done();
    });
  });

  suite('Function checkRowPlacement()', () => {
    test('Valid placement for a row', done => {
      const string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const input = solver.boardParser(string);
      const row = 0;
      const col = 0;
      const value = 3;

      var result = solver.checkRowPlacement(input, row, col, value)

      assert.equal(result.valid, true)
      done();
    });

    test('Invalid placement for a row', done => {
      const string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const input = solver.boardParser(string);
      const row = 0;
      const col = 0;
      const value = 9;

      var result = solver.checkRowPlacement(input, row, col, value);

      assert.equal(result.valid, false)
      done();
    });

  });

  suite('Function checkColPlacement()', () => {
    test('Valid placement for a column', done => {
      const string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const input = solver.boardParser(string);
      const row = 0;
      const col = 0;
      const value = 3;

      var result = solver.checkColPlacement(input, row, col, value)

      assert.equal(result.valid, true)
      done();
    });

    test('Invalid placement for a column', done => {
      const string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const input = solver.boardParser(string);
      const row = 0;
      const col = 0;
      const value = 1;

      var result = solver.checkColPlacement(input, row, col, value)

      assert.equal(result.valid, false)
      done();
    });

  });

  suite('Function checkRegionPlacement()', () => {
    test('Valid placement for a region', done => {
      const string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const input = solver.boardParser(string);
      const row = 4;
      const col = 4;
      const value = 3;

      var result = solver.checkRegionPlacement(input, row, col, value)

      assert.equal(result.valid, true)
      done();
    });

    test('Invalid placement for a region', done => {
      const string = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
      const input = solver.boardParser(string);
      const row = 4;
      const col = 4;
      const value = 7;

      var result = solver.checkRegionPlacement(input, row, col, value)

      assert.equal(result.valid, false)
      done();
    });

  });

  suite('Function solvePuzzle()', () => {
    // Valid complete puzzles pass
    test('Valid puzzles pass', done => {
      const input = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';

      // done();
    });

    // Invalid complete puzzles fail
    test('Invalid puzzles fail', done => {
      const input = '779235418851496372432178956174569283395842761628713549283657194516924837947381625';

      // done();
    });

    // Returns the expected solution for a valid, incomplete puzzle
    test('Returns the expected solution for an incomplete puzzle', done => {
      const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

      // done();
    });
  });
});