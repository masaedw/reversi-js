ReversiJs.Core = {};

ReversiJs.Core.Player = {};
ReversiJs.Core.Player.Dark = "Dark";
ReversiJs.Core.Player.Light = "Light";

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
  this.currentPlayer = ReversiJs.Core.Player.Light;
};

$.extend(ReversiJs.Core.Game.prototype, {
  getAvailableCells: function(){},
  putDisk: function(x, y){},
  _xy: function(x, y) { return Math.floor(x) * this.size + Math.floor(y); }
});


