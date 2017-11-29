//生成九宫格
const Toolkit = require("../core/toolkit");
const Sudoku = require("../core/sudoku");

module.exports = class Grid {
    //生成在container里面
    constructor(container) {
        //下划线表示私有变量，在外面尽量不要访问这个变量
        this._$container = container;
    }

    build() {
        //生成数组
        const sudoku = new Sudoku();
        sudoku.make();
        const matrix = sudoku.puzzleMatrix;

        const rowGroupClasses = ["row_g_top","row_g_middle","row_g_bottom"];
        const colGroupClasses = ["col_g_left","col_g_center","col_g_right"];

        //每一行创建一个div(rowValues => 后面的内容)
        //数组将每个元素映射成一个cell
        const $cells = matrix.map(rowValues => rowValues
            .map((cellValue,colIndex) => {
                return $("<span>")
                    .addClass(colGroupClasses[colIndex % 3])
                    .addClass(cellValue ? "fixed" : "empty")
                    .text(cellValue);
            }));  

        const $divArray = $cells.map(($spanArray,rowIndex) => {
            return $("<div>")
                .addClass("row")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });

        this._$container.append($divArray);
    }

    layout() {
        const width = $("span:first",this._$container).width();
        $("span",this._$container)
            .height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width / 2}` : ""
            })
    }

    /**
     * 检查用户解密的结果，成功进行显示，失败则显示错误位置的标记
     */
    check() {

    }

    /**
     * 重置当前迷盘到初始状态
     */
    reset() {

    }

    /**
     * 清楚标记
     */
    clear() {

    }

    rebuild() {
        //清除原有
        this._$container.empty();
        //重建
        this.build();
        this.layout();
    }

    bindPopup(popupNumbers) {
        this._$container.on("click","span", e => {
            const $cell = $(e.target);
            popupNumbers.popup($cell);
        });
    }

}
