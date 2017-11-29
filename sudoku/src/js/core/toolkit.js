/**
 * 矩阵和数组相关工具
 */
const matrixToolkit = {
    
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },

    makeMatrix(v = 0){
        //制作9*9的数组
        return Array.from({length: 9},() => this.makeRow());
    },

    /**
     * Fisher-Yates 洗牌算法
     */
    shuffle(array) {
        const endIndex = array.length -2;
        for(let i =0;i<endIndex;i++) {
            //(array.length-i)控制随机数大小，floor取整
            const j=i + Math.floor(Math.random()*(array.length-i));

            //es6交换选中的两数
            [array[i],array[j]] = [array[j],array[i]];
        }
        return array;
    },   
    
    /**
     * 检查指定位置是否可以填写数字
     * 1.检查行列
     * 2.检查宫内
     */
    checkFillable(matrix, n, rowIndex, colIndex) {
        //取出行列值,宫的值
        const row =matrix[rowIndex];
        const column = this.makeRow().map((v,i) => matrix[i][colIndex]);
        const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex,colIndex);
        const box = boxToolkit.getBoxCells(matrix,boxIndex);
        for (let i = 0; i < 9; i++) {
            if (row[i] === n
                || column[i] === n
                || box[i] === n) 
                return false;
        }
        return true;
    }
};

/**
 * 宫坐标系工具
 */
const boxToolkit = {
    //把确定位置从行列坐标变换为宫和格的坐标
    convertToBoxIndex(rowIndex,colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },

    //把确定位置从宫和格的坐标变换为行列坐标
    convertFromBoxIndex(boxIndex,colIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    },

    //得到宫的9个数
    getBoxCells(matrix,boxIndex) {
        //先获取宫的第一个数的坐标
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        //存放取出来的值
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor( cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    }
};

//工具集

module.exports = class TooKit {
    /**
     * 矩阵和数据相关的工具
     */
    static get matrix() {
        return matrixToolkit;
    }

    /**
     * 宫坐标系相关工具
     */
    static get box() {
        return boxToolkit;
    }
};