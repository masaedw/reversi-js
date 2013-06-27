ReversiJs.Core = {};

ReversiJs.Core.Color = {};
ReversiJs.Core.Color.Dark = "Dark";
ReversiJs.Core.Color.Light = "Light";

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
  getAvailableCells: function(){},
  putDisk: function(x, y)
  {
    if (this._cell(x, y) === undefined)
    {
      this._cell(x, y, this.currentPlayer);
      this.currentPlayer = this.currentPlayer == ReversiJs.Core.Color.Dark
        ? ReversiJs.Core.Color.Light
        : ReversiJs.Core.Color.Dark;
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
