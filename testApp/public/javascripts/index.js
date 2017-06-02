var snakesAndLadders = {
  point: function (startPoint, endPoint) {
    this.start = startPoint;
    this.end = endPoint;
  },
  init: function () {

    this.snakes = [
      new this.point(41, 20),
      new this.point(87, 15),
      new this.point(56, 53),
      new this.point(33, 6),
      new this.point(49, 9)
    ];
    this.ladders = [
      new this.point(2, 37),
      new this.point(10, 32),
      new this.point(27, 46),
      new this.point(51, 68),
      new this.point(61, 79),
      new this.point(65, 84),
      new this.point(71, 91),
      new this.point(81, 100)
    ];
    this.myMap = new Map();
    this.makeMap();
  },
  printMsg: function (msg, elemId) {
    document.getElementById(elemId).innerHTML = msg;
  },
  makeMap: function () {
    for (i = 0; i < this.snakes.length; i++) {
      this.myMap.set(this.snakes[i].start, this.snakes[i]);
    }
    for (i = 0; i < this.ladders.length; i++) {
      this.myMap.set(this.ladders[i].start, this.ladders[i]);
    }
  },
  rollDice: function () {
    var x = Math.floor((Math.random() * 6) + 1);
    return x;
  },
  enableBtn: function (buttonId) {
    document.getElementById(buttonId).disabled = false;
  },
  disableBtn: function (buttonId) {
    document.getElementById(buttonId).disabled = true;
  },
  takeTurn: function (buttonId, no, x) {

    this.printMsg(x, "position" + no);
    var cp1 = Number(document.getElementById("pos" + no).innerHTML);
    this.printMsg(cp1, "oldpos" + no);
    var newPos = this.findPos(cp1 + x, buttonId);
    this.printMsg(newPos, "pos" + no);
    if (no == 1) {

      this.enableBtn("roll" + 2);

    }
    else {
      this.enableBtn("roll" + 1);
    }
    this.disableBtn("roll" + no);
    this.checkForWinner(newPos, buttonId);
  },
  turn: function (buttonId) {
    this.init();
    var x = this.rollDice();

    if (buttonId == "roll1") {
      this.takeTurn(buttonId, 1, x);
    }
    else {
      this.takeTurn(buttonId, 2, x);
    }
  },
  checkForWinner: function (pos, buttonId) {

    if (pos >= 100) {
      if (buttonId == "roll1") {
        this.printMsg("Player 1", "winner");
        this.disableBtn("roll1");
        this.disableBtn("roll2");
      }
      else {
        this.printMsg("Player 2", "winner");
        this.disableBtn("roll1");
        this.disableBtn("roll2");
      }
    }

  },
  findPos: function (currPos, buttonId) {
    if (buttonId == "roll1") {
      var divId = "status1";

    }
    else {
      var divId = "status2";

    }

    var found_pos = this.myMap.get(currPos);
    if (found_pos) {
      newPos = found_pos.end;
      if (newPos < currPos) {
        //snake
        this.printMsg("Snake bit you", divId);

      }
      else {
        //ladder
        this.printMsg("climb up the ladder", divId);

      }
      return newPos;
    }
    this.printMsg("no snake or ladder", divId);
    return currPos;


  }
};


module.exports = snakesAndLadders; 