var snakesAndLadders = require('../index');
var chai = require('chai');
var assert = chai.assert;

describe('Snakes and Ladders', function() {
  describe('Roll Dice', function() {
    it('random number is less than or equal to 6', function() {
      var randomNumber = snakesAndLadders.rollDice();
      assert.isAtMost(randomNumber, 6, 'random number is less than or equal to 6');
    });
    it('random number is greater than or equal to 1', function() {
      var randomNumber = snakesAndLadders.rollDice();
      assert.isAtLeast(randomNumber, 1, 'random number is greater than or equal to 1');
    });
  });
});