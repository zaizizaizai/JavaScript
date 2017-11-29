const gulp = require("gulp");

//转译JavaScript
gulp.task("webpack", () => {
    const webpack= require("webpack-stream");
    //进行webpack配置
    const config = require("./webpack.config.js");
    gulp.src("./js/**/*.js")
        //输送到webpack
        .pipe(webpack(config))
        //返回的结果给到/www/js
        .pipe(gulp.dest("../www/js"));
});

//编译 less -> css
gulp.task("less", () => {
    const less= require("gulp-less");
    gulp.src("./less/*.less")
    //输送到less
    .pipe(less())
    //返回的结果给到/www/css
    .pipe(gulp.dest("../www/css"));
});

gulp.task("default",["webpack","less"]);

//自动编译
gulp.task("watch", () => {
    //监视less下的所有less文件,并执行less任务
    gulp.watch("less/**/*.less",["less"]);
    //监视js下的所有js文件。并webpack执行任务
    gulp.watch("js/**/*.js",["webpack"]);
});