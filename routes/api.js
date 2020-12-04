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

      // check for empty fields
      if (!puzzle || !coordinate || !value) {
        return res.json({
          error: "Required field(s) missing"
        })
      }

      var splitCor = coordinate.split('');
      var row = splitCor[0].toLowerCase();
      var column = splitCor[1];
      var rowH

      // validate puzzle string
      var vString = solver.validate(puzzle);
      if (vString.error) {
        return res.json({
          error: vString.error
        })
      }

      var board = solver.boardParser(vString);

      var rowCheck = row.match(/[^a-i]/g)
      var colCheck = column.match(/[^1-9]/g)
      var valCheck = value.match(/[^1-9]/g)

      if (rowCheck || colCheck) {
        return res.json({
          error: "Invalid coordinate"
        })
      }

      if (valCheck) {
        return res.json({
          error: "Invalid value"
        })
      }

      if (row == 'a') rowH = 0;
      if (row == 'b') rowH = 1;
      if (row == 'c') rowH = 2;
      if (row == 'd') rowH = 3;
      if (row == 'e') rowH = 4;
      if (row == 'f') rowH = 5;
      if (row == 'g') rowH = 6;
      if (row == 'h') rowH = 7;
      if (row == 'i') rowH = 8;

      var conflict = [];

      var CRP = solver.checkRowPlacement(board, rowH, value);
      var CCP = solver.checkColPlacement(board, column - 1, value);
      var CBP = solver.checkRegionPlacement(board, rowH, column - 1, value);
      var CV = solver.checkvalue(board, rowH, column - 1, value);

      if (!CRP.valid) {
        conflict.push(CRP.conflict)
      }
      if (!CCP.valid) {
        conflict.push(CCP.conflict)
      }
      if (!CBP.valid) {
        conflict.push(CBP.conflict)
      }

      if (CV) {
        return res.json({
          valid: true
        })
      }

      return res.json({
        valid: false,
        conflict: conflict
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