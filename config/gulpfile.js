var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    babel = require('gulp-babel');

// 清除dist
gulp.task('clean', function() {
    return gulp.src('../dist/*', {read: false})
        .pipe(clean({ force: true }));
});

// js任务处理
gulp.task('scripts', function () {
    gulp.src(['../src/*/*', '../src/*.js'])
        .pipe(babel({
            presets: ['es2015', 'stage-1']
        })) // 转换ES5
        .pipe(uglify())  // 压缩代码
        .pipe(gulp.dest('../dist')) // 定位目录
        .on('end', function () {
            gulp.src('').pipe(notify({ message: "文件已经压缩成功"}))
        });
})

// 默认任务
gulp.task('default', ['clean'], function() {
    gulp.start('scripts')
});