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
      var puzzle = req.body.puzzle;
      var coordinate = req.body.coordinate;
      var value = req.body.value;
      var splitCor = coordinate.split('');
      var row = splitCor[0].toLowerCase();
      var column = splitCor[1];

      // empty puzzle string
      if (!puzzle) {
        return res.json({
          error: "Required field missing"
        })
      }

      // validate puzzle string
      var vString = solver.validate(puzzle);
      if (vString.error) {
        return res.json({
          error: vString.error
        })
      }

      var rowCheck = row.match(/[^a-i]/g)
      var colCheck = column.match(/[^1-9]/g)

      if (colCheck && rowCheck) {
        return res.json({
          error: "Invalid row and column cordinate"
        })
      }

      if (rowCheck) {
        return res.json({
          error: "Invalid row cordinate"
        })
      }

      if (colCheck) {
        return res.json({
          error: "Invalid column cordinate"
        })
      }

      switch (row) {
        case 'a': {
          var conflict= [];

          if (solver.checkRowPlacement(vString, 0, column - 1, value)) {
            return res.json({
              valid: true
            })
          }

          if (solver.checkvalue(vString, 0, column - 1, value)) {
            return res.json({
              valid: true
            })
          }

          if (solver.checkvalue(vString, 0, column - 1, value)) {
            return res.json({
              valid: true
            })
          }

          if (solver.checkvalue(vString, 0, column - 1, value)) {
            return res.json({
              valid: true
            })
          }

          return res.json({
            valid: false,
            conflict: conflict
          })
        }
      }

      return res.json({
        row: row,
        col: column
      })
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