/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 矩阵和数组相关工具
 */
var matrixToolkit = {
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(9);
        array.fill(v);
        return array;
    },
    makeMatrix: function makeMatrix() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        //制作9*9的数组
        return Array.from({ length: 9 }, function () {
            return _this.makeRow();
        });
    },


    /**
     * Fisher-Yates 洗牌算法
     */
    shuffle: function shuffle(array) {
        var endIndex = array.length - 2;
        for (var i = 0; i < endIndex; i++) {
            //(array.length-i)控制随机数大小，floor取整
            var j = i + Math.floor(Math.random() * (array.length - i));

            //es6交换选中的两数
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }
        return array;
    },


    /**
     * 检查指定位置是否可以填写数字
     * 1.检查行列
     * 2.检查宫内
     */
    checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
        //取出行列值,宫的值
        var row = matrix[rowIndex];
        var column = this.makeRow().map(function (v, i) {
            return matrix[i][colIndex];
        });

        var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
            boxIndex = _boxToolkit$convertTo.boxIndex;

        var box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (var i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n) return false;
        }
        return true;
    }
};

/**
 * 宫坐标系工具
 */
var boxToolkit = {
    //把确定位置从行列坐标变换为宫和格的坐标
    convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },


    //把确定位置从宫和格的坐标变换为行列坐标
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, colIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    },


    //得到宫的9个数
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        //先获取宫的第一个数的坐标
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        //存放取出来的值
        var result = [];
        for (var _cellIndex = 0; _cellIndex < 9; _cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(_cellIndex / 3);
            var colIndex = startColIndex + _cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    }
};

//工具集

module.exports = function () {
    function TooKit() {
        _classCallCheck(this, TooKit);
    }

    _createClass(TooKit, null, [{
        key: "matrix",

        /**
         * 矩阵和数据相关的工具
         */
        get: function get() {
            return matrixToolkit;
        }

        /**
         * 宫坐标系相关工具
         */

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return TooKit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//主程序

var Grid = __webpack_require__(2);
var PopupNumbers = __webpack_require__(5);

var grid = new Grid($("#container"));
grid.build();
grid.layout();

//弹出面盘 事件
var popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

//底部四个按钮 事件
$("#check").on("click", function (e) {
    grid.check();
});
$("#reset").on("click", function (e) {
    grid.reset();
});
$("#clear").on("click", function (e) {
    grid.clear();
});
$("#rebuild").on("click", function (e) {
    grid.rebuild();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成九宫格
var Toolkit = __webpack_require__(0);
var Sudoku = __webpack_require__(3);

module.exports = function () {
    //生成在container里面
    function Grid(container) {
        _classCallCheck(this, Grid);

        //下划线表示私有变量，在外面尽量不要访问这个变量
        this._$container = container;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build() {
            //生成数组
            var sudoku = new Sudoku();
            sudoku.make();
            var matrix = sudoku.puzzleMatrix;

            var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
            var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

            //每一行创建一个div(rowValues => 后面的内容)
            //数组将每个元素映射成一个cell
            var $cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
                });
            });

            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
            });

            this._$container.append($divArray);
        }
    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._$container).width();
            $("span", this._$container).height(width).css({
                "line-height": width + "px",
                "font-size": width < 32 ? "" + width / 2 : ""
            });
        }

        /**
         * 检查用户解密的结果，成功进行显示，失败则显示错误位置的标记
         */

    }, {
        key: "check",
        value: function check() {}

        /**
         * 重置当前迷盘到初始状态
         */

    }, {
        key: "reset",
        value: function reset() {}

        /**
         * 清楚标记
         */

    }, {
        key: "clear",
        value: function clear() {}
    }, {
        key: "rebuild",
        value: function rebuild() {
            //清除原有
            this._$container.empty();
            //重建
            this.build();
            this.layout();
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popupNumbers) {
            this._$container.on("click", "span", function (e) {
                var $cell = $(e.target);
                popupNumbers.popup($cell);
            });
        }
    }]);

    return Grid;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独游戏

//1.生成完成的解决方案： Generator
//2.随机去除部分数据： 按比例

var Generator = __webpack_require__(4);

module.exports = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        //生成完整解决方案
        var generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    _createClass(Sudoku, [{
        key: "make",
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

            //const shouldRid = Math.random() * 9 <level;
            //生成迷盘
            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Sudoku;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独解决方案
var Toolkit = __webpack_require__(0);

module.exports = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (!this.interGenerator()) {
                console.warn("try again");
            }
        }
    }, {
        key: "interGenerator",
        value: function interGenerator() {
            //生成矩阵
            this.matrix = Toolkit.matrix.makeMatrix();
            //随机序列矩阵(这个写法真不错)
            this.orders = Toolkit.matrix.makeMatrix()
            //生成0到8的矩阵(嵌套循环)
            .map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            })
            //将矩阵打乱
            .map(function (row) {
                return Toolkit.matrix.shuffle(row);
            });

            //TODO 入口方法
            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) {
                return true;
            }

            var row = this.matrix[rowIndex];
            var orders = this.orders[rowIndex];

            for (var i = 0; i < 9; i++) {
                var colIndex = orders[i];
                //如果这个位置已经由值，跳过
                if (row[colIndex]) {
                    continue;
                }

                //检查这个位置是否可以填(1.看行列，2.看宫)
                if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                    continue;
                }

                row[colIndex] = n;

                // 去下一行填写 n，如果没填写进去，就继续寻找当前行的下一个位置
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }

                return true;
            }

            return false;
        }
    }]);

    return Generator;
}();

// //测试代码
// const generator = new Generator();
// generator.generate();
// console.log(generator.matrix);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//处理弹出的操作面板

module.exports = function () {
    function popupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, popupNumbers);

        //去掉hidden这个样式
        this._$panel = $panel.hide().removeClass("hidden");

        //弹出框点击事件
        this._$panel.on("click", "span", function (e) {
            var $cell = _this._$targetCell;

            var $span = $(e.target);
            if ($span.hasClass("mark1")) {
                //mark1 回填样式
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2").addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                //mark2 回填样式
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1").addClass("mark2");
                }
            } else if ($span.hasClass("empty")) {
                //empty，取消数字填写，取消mark
                $cell.text(0).addClass("empty");
            } else {
                //1-9 回填数字
                $cell.removeClass("empty").text($span.text());
            }

            _this.hide();
        });
    }

    _createClass(popupNumbers, [{
        key: "popup",
        value: function popup($cell) {
            this._$targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;
            //点击的方格定位


            this._$panel.css({
                left: left + "px",
                top: top + "px"
            }).show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this._$panel.hide();
        }
    }]);

    return popupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map