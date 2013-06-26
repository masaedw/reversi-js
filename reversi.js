var ReversiJs = {};

ReversiJs.Application = function(display, gameSize) {
  this.gameSize = gameSize;
  this.display = display;
  this.game = new ReversiJs.Core.Game(gameSize);

  // jQuery Objects
  // the text output area
  this.message = $("<p class='message'/>").appendTo(display);
  // the array of cells on the game board
  this.board = this._initializeBoard(display, gameSize);

  this.update();
};

$.extend(ReversiJs.Application.prototype, {
  _initializeBoard: function(display, size)
  {
    var body = [];

    var cells = [];

    var tr = $("<tr/>");
    body.push(tr);
    for (var x = 0; x < size + 1; x++)
    {
      var th = $("<th>");
      if (x > 0)
      {
        var code = 'a'.charCodeAt(0) + x - 1;
        th.text(String.fromCharCode(code));
      }
      th.appendTo(tr);
    }

    for (var y = 0; y < size; y++)
    {
      var tr = $("<tr/>");
      body.push(tr);
      for (var x = 0; x < size+1; x++)
      {
        if (x == 0)
        {
          var th = $("<th/>");
          th.text(y);
          th.appendTo(tr);
        }
        else
        {
          var td = $("<td class='cell'/>");
          td.appendTo(tr);
          cells.push(td);
          td.click((function(x, y, self) {
            return function() {
              console.log({x:x, y:y});
              self.putDisk(x, y);
            };
          })(x - 1, y, this));
        }
      }
    }

    var table = $("<table />").appendTo(display);
    body.forEach(function(i){
      table.append(i);
    });

    return cells;
  },
  update: function()
  {
    this.message.text(this.game.currentPlayer.toString() + " player's turn");
    var cells = this.game.cells;
    for (var i = 0; i < cells.length; i++)
    {
      switch (cells[i])
      {
      case ReversiJs.Core.Disk.Dark:
        this.board[i].text("kuro");
        this.board[i].css("color", "black");
        break;
      case ReversiJs.Core.Disk.Light:
        this.board[i].text("siro");
        this.board[i].css("color", "white");
        break;
      }
    }
  },
  putDisk: function(x, y)
  {
    this.game.putDisk(x, y);
    this.update();
  },
});
