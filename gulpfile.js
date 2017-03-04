
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

gulp.task('watch', ['default'], ()=> {
    gulp.watch(
        [
            'client/**/*.js',
            '**/*.js',
            '!node_modules/**/*',
            '!bower_components/**/*',
            '!public/**/*'
        ],
        ['default']
    );
});