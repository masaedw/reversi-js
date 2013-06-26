var ReversiJs = {};

// Gameオブジェクト
ReversiJs.Game = function(display, gameSize) {
  this.gameSize = gameSize;
  this.display = display;

  var cells = this.initializeBoard(display, gameSize);

  this.cells = cells;
};

$.extend(ReversiJs.Game.prototype, {
  initializeBoard: function(display, size)
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
        }
      }
    }

    body.forEach(function(i){
      display.append(i);
    });

    return cells;
  }
});
