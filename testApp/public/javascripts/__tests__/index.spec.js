var snakesAndLadders = require('../index');
var chai = require('chai');
var assert = chai.assert;
var expect = require('chai').expect;
var request = require('supertest');

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
  describe('Checking boundary conditions', function() {
     before(function(){
       snakesAndLadders.init();
    });
    it('new pos is greater than or equal 0', function() {
      var newPos = snakesAndLadders.findPos(1,"roll1");
      assert.isAtLeast(newPos, 1, 'new pos is greater than or equal to 0');
    });
    it('new pos is less than 106', function() {
     var newPos = snakesAndLadders.findPos(99,"roll1");
     assert.isAtMost(newPos, 105, 'new pos is less than 106');
    });
  });
/*describe('Check a turn', function(){
  it('should check if all the new positions are correct', function() {
    var curPos = 50;
    var rolledNumber = snakesAndLadders.rollDice();
    var newPos = curPos + rolledNumber;
    var checkPos = snakesAndLadders.findPos(newPos, "roll1");
    console.log(curPos,rolledNumber,newPos,checkPos);
    if(rolledNumber == 1){
      expect(checkPos).to.equal(68);
    }
    else if(rolledNumber == 6){
      expect(checkPos).to.equal(53);
    }
    else{
      expect(checkPos).to.equal(newPos);
    }
  });
});*/

  describe('Check correctness of a cell', function(){
    before(function(){
     snakesAndLadders.init();
    });
    [56,87,2,65,75,15].forEach(function(value){
      it('Check if a randomly generated point is corretly identified', function(){
        var checkPos = snakesAndLadders.findPos(value, "roll1");
        console.log(value,checkPos);
        var flag = 0;
        for(i=0;i<snakesAndLadders.snakes.length;i++){
          if(value == snakesAndLadders.snakes[i].start){
            flag = 1;
            assert.isBelow(checkPos,value,'It is a snake');
            expect(checkPos).to.equal(snakesAndLadders.snakes[i].end);
            console.log('This is a snake');
          }
        }
        for(i=0;i<snakesAndLadders.ladders.length;i++){
          if(value == snakesAndLadders.ladders[i].start){
            flag = 1;
            assert.isAbove(checkPos,value,'It is a ladder');
            expect(checkPos).to.equal(snakesAndLadders.ladders[i].end);
            console.log('This is a ladder');
          }
        }
        if(!flag){
          expect(checkPos).to.equal(value);
          console.log('Not a snake or ladder');
        }
      });
    });
  });
});

