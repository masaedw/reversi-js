ReversiJs.Core = {};

ReversiJs.Core.Player = function(name) {
  this.name = name;
};

$.extend(ReversiJs.Core.Player.prototype, {
  toString: function() { return this.name; },
  disk: function()
  {
    switch (this)
    {
    case ReversiJs.Core.Player.Dark:  return ReversiJs.Core.Disk.Dark;
    case ReversiJs.Core.Player.Light: return ReversiJs.Core.Disk.Light;
    }
  }
});

ReversiJs.Core.Player.Dark = new ReversiJs.Core.Player("Dark");
ReversiJs.Core.Player.Light = new ReversiJs.Core.Player("Light");

ReversiJs.Core.Disk = {};
ReversiJs.Core.Disk.Dark = "Dark";
ReversiJs.Core.Disk.Light = "Light";

ReversiJs.Core.Game = function(size) {
  this.size = size;
  this.cells = new Array(size * size);

  this.cells[this._xy(size/2-1, size/2-1)] = ReversiJs.Core.Disk.Light;
  this.cells[this._xy(size/2-0, size/2-1)] = ReversiJs.Core.Disk.Dark;
  this.cells[this._xy(size/2-1, size/2-0)] = ReversiJs.Core.Disk.Dark;
  this.cells[this._xy(size/2-0, size/2-0)] = ReversiJs.Core.Disk.Light;
  this.currentPlayer = ReversiJs.Core.Player.Dark;
};

$.extend(ReversiJs.Core.Game.prototype, {
  getAvailableCells: function(){},
  putDisk: function(x, y)
  {
    this.cells[this._xy(x, y)] = this.currentPlayer.disk();
  },
  _xy: function(x, y) { return Math.floor(x) * this.size + Math.floor(y); }
});
