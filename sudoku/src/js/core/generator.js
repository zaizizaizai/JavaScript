//生成数独解决方案
const Toolkit = require("./toolkit");


module.exports = class Generator {

    generate() {
        while (!this.interGenerator()) {
            console.warn("try again");
        }
    }

    interGenerator() {
        //生成矩阵
        this.matrix = Toolkit.matrix.makeMatrix();
        //随机序列矩阵(这个写法真不错)
        this.orders = Toolkit.matrix.makeMatrix()
            //生成0到8的矩阵(嵌套循环)
            .map(row => row.map((v,i) => i))
            //将矩阵打乱
            .map(row => Toolkit.matrix.shuffle(row));

        //TODO 入口方法
        for (let n=1; n<=9; n++){
            if (!this.fillNumber(n)) {
                return false;
            }
        }
        return true;
    }

    fillNumber(n){
        return this.fillRow(n,0);
    }

    fillRow(n,rowIndex) {
        if(rowIndex > 8){
            return true;
        }

        const row = this.matrix[rowIndex];
        const orders =this.orders[rowIndex];

        for (let i =0; i < 9; i++){
            const colIndex = orders[i];
            //如果这个位置已经由值，跳过
            if (row[colIndex]) {
                continue;
            }

            //检查这个位置是否可以填(1.看行列，2.看宫)
            if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }

            row[colIndex] = n;

            // 去下一行填写 n，如果没填写进去，就继续寻找当前行的下一个位置
            if (!this.fillRow(n,rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }

            return true;
        }  
        
        return false;
    }
};

// //测试代码
// const generator = new Generator();
// generator.generate();
// console.log(generator.matrix);