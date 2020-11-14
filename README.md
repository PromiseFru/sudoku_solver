## Sudoku_solver
### User stories

* You can POST /api/solve with form data containing puzzle which will be a string containing a combination of numbers (1-9) and periods . to represent empty spaces. The returned object will contain a solution property with the solved puzzle.

* If the object submitted to /api/solve is missing puzzle, the returned value will be { error: 'Required field missing' }

* If the puzzle submitted to /api/solve contains values which are not numbers or periods, the returned value will be { error: 'Invalid characters in puzzle' }

* If the puzzle submitted to /api/solve is greater or less than 81 characters, the returned value will be { error: 'Expected puzzle to be 81 characters long' }

* If the puzzle submitted to /api/solve is invalid or cannot be solved, the returned value will be { error: 'Puzzle cannot be solved' }

* You can POST to /api/check an object containing puzzle, coordinate, and value where the coordinate is the letter A-I indicating the row, followed by a number 1-9 indicating the column, and value is a number from 1-9.

* The return value from the POST to /api/check will be an object containing a valid property, which is true if the number may be placed at the provided coordinate and false if the number may not. If false, the returned object will also contain a conflict property which is an array containing the strings "row", "column", and/or "region" depending on which makes the placement invalid.

* If the puzzle submitted to /api/check contains values which are not numbers or periods, the returned value will be { error: 'Invalid characters in puzzle' }

* If the puzzle submitted to /api/check is greater or less than 81 characters, the returned value will be { error&#58; 'Expected puzzle to be 81 characters long' }

* If the object submitted to /api/check is missing puzzle, coordinate or value, the returned value will be { error: Required field(s) missing }

* If the coordinate submitted to api/check does not point to an existing grid cell, the returned value will be { error: 'Invalid coordinate'}

* If the value submitted to /api/check is not a number between 1 and 9, the returned values will be { error: 'Invalid value' }

* All 12 unit tests are complete and passing. See /tests/1_unit-tests.js for the expected behavior you should write tests for.

* All 14 functional tests are complete and passing. See /tests/2_functional-tests.js for the functionality you should write tests for.
