
const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('client', ()=> {
    gulp.src(['client/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/'))
        .on('error', gutil.log)
});

gulp.task('default', ['client']);