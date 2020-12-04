/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });

  app.route('/api/solve')
    .post((req, res) => {
      var puzzleString = req.body.puzzle

      // empty puzzle string
      if (!puzzleString) {
        return res.json({
          error: "Required field missing"
        })
      }

      // validate puzzle string
      var vString = solver.validate(puzzleString);
      if (vString.error) {
        return res.json({
          error: vString.error
        })
      }

      if (solver.solve(vString).error) {
        return res.json({
          error: solver.solve(vString).error
        })
      }

      return res.json({
        solution: solver.solve(vString)
      })
    });
};