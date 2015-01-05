'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var stylish = require('jshint-stylish');

var dieOnError = true;


gulp.task('sass', function () {
  return gulp.src(['sass/*.{sass,scss}', '!sass/_*.{sass,scss}'])
    .pipe(plugins.rubySass())
    .pipe(plugins.plumber())
    .pipe(plugins.autoprefixer())
//    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('./demo/build'));
});

gulp.task('default', ['sass'], function () {
  dieOnError = false;

  browserSync.init([
    'demo/**/*.css',
    'demo/*.html'
  ], {
    server: {
      baseDir: '.'
    },
    startPath: '/demo/index.html',
    ghostMode: {
      scroll: false,
      links: false,
      forms: false
    }
  });

  gulp.watch('sass/**/*.{sass,scss}', ['sass']);
});
