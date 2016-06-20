'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

gulp.task('default', ['css', 'watch']);

gulp.task('css', function(){
    return gulp.src('./assets/css/app.scss')
        .pipe(sass())
        .pipe(rename('combined.css'))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function (){
    browserSync.init({
        proxy: 'localhost:8880',
        port: 3001,
        open: false,
        notify: false
    });
    // gulp.watch([
    //    './assets/css/**/*.scss'
    // ], ['css']); //не отслеживает новые и удаленные файлы
    gulp.watch([
        'css/*',
        'css/**',
        'css/**/*.scss'
     ], {cwd: './assets'}, ['css']);
});
