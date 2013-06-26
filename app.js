var Application;

$(function () {
  var gameSize = 4;
  Application = new ReversiJs.Application($("#display"), gameSize);
});
