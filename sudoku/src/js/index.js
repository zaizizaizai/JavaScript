//主程序

const Grid = require("./ui/grid");
const PopupNumbers = require("./ui/popupnumbers");

const grid = new Grid($("#container"));
grid.build();
grid.layout();

//弹出面盘 事件
const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

//底部四个按钮 事件
$("#check").on("click", e => {
    grid.check();
});
$("#reset").on("click", e => {
    grid.reset();
});
$("#clear").on("click", e => {
    grid.clear();
});
$("#rebuild").on("click", e => {
    grid.rebuild();
});