var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    babel = require('gulp-babel');

// 清除dist
gulp.task('clean', function() {
    return gulp.src('../dist/*', {read: false})
        .pipe(clean({ force: true }));
});

// js任务处理
gulp.task('scripts', function () {
    gulp.src('../src/*.js')
        .pipe(concat('bundle.js')) // 与打包文件合并
        .pipe(rename({ suffix: '.min' })) // 重命名
        .pipe(babel({
            presets: ['es2015']
        })) // 转换ES5
        .pipe(uglify())  // 压缩代码
        .pipe(gulp.dest('../dist')) // 定位目录
        .pipe(notify({ message: "文件已经压缩成功"}));
})

// 默认任务
gulp.task('default', ['clean'], function() {
    gulp.start('scripts')
});