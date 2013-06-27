ReversiJs.Core = {};

ReversiJs.Core.Color = {};
ReversiJs.Core.Color.Dark = "Dark";
ReversiJs.Core.Color.Light = "Light";

ReversiJs.Core.Color.flip = function(color)
{
  return color == ReversiJs.Core.Color.Light
        ? ReversiJs.Core.Color.Dark
        : ReversiJs.Core.Color.Light;  
};

ReversiJs.Core.Game = function(size) {
  this.size = size;
  this.cells = new Array(size * size);

  this._cell(size/2-1, size/2-1, ReversiJs.Core.Color.Light);
  this._cell(size/2-0, size/2-1, ReversiJs.Core.Color.Dark);
  this._cell(size/2-1, size/2-0, ReversiJs.Core.Color.Dark);
  this._cell(size/2-0, size/2-0, ReversiJs.Core.Color.Light);
  this.currentPlayer = ReversiJs.Core.Color.Dark;
};

$.extend(ReversiJs.Core.Game.prototype, {
  getAvailableCells: function()
  {
    
  },
  _getCellsToBeFlipped: function(x, y)
  {
    function _d(dx, dy) { return { dx: dx, dy: dy }; }
    var dirs = [_d(-1, -1), _d(0, -1), _d(1, -1),
                _d(-1, 0), _d(1, 0),
                _d(-1, 1), _d(0, 1), _d(1, 1)];

    function _inBoard(p, size)
    {
      return 0 <= p.x && p.x < size &&
        0 <= p.y && p.y < size;
    }

    function _add(p, d)
    {
      return { x: p.x + d.dx, y: p.y + d.dy };
    }

    var current = this.currentPlayer;
    var enemy = ReversiJs.Core.Color.flip(current);

    var cells = [];

    dirs.forEach(function(d) {
      var state = 0;
      //                       ┌─自分-> (3)
      // ((0)) ─敵─────> (1)─空or端-> (2)
      //   └敵以外-> (2)    └敵┘
      //
      // 3でなければ失敗
      var ps = [];
      for (var p = _add({x: x, y: y}, d); _inBoard(p, this.size); p = _add(p, d))
      {
        var cont = true;
        switch (state)
        {
        case 0:
          switch (this._cell(p.x, p.y))
          {
          case enemy:
            ps.push(p);
            state = 1;
            break;
          default:
            state = 2;
            break;
          }
          break;
        case 1:
          switch (this._cell(p.x, p.y))
          {
          case enemy:
            ps.push(p);
            break;
          case current:
            state = 3;
            break;
          default:
            state = 2;
            break;
          }
          break;
        default:
          cont = false;
          break;
        }
        if (!cont)
        {
          break;
        }
      }

      if (state == 3)
      {
        ps.forEach(function(p) { cells.push(p); });
      }
    }, this);

    return cells;
  },
  putDisk: function(x, y)
  {
    if (this._cell(x, y) === undefined)
    {
      this._cell(x, y, this.currentPlayer);
      this.currentPlayer = ReversiJs.Core.Color.flip(this.currentPlayer);
    }
  },
  _cell: function(x, y, disk)
  {
    if (disk === undefined)
    {
      return this.cells[this._xy(x, y)];
    }
    else
    {
      return this.cells[this._xy(x, y)] = disk;
    }
  },
  _xy: function(x, y) { return Math.floor(y) * this.size + Math.floor(x); }
});
