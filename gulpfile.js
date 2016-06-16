'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const livereload = require('gulp-livereload'); // Requires special Chrome extension
const http = require('http');
const st = require('st'); //A module for serving static files. Does etags, caching, etc.
const replace = require('gulp-replace');

const VERSION = require('./package.json').version;
const JS_LIST = ['./js/**/*.js'];
const LESS_LIST = ['./less/**/*.less'];

gulp.task('less', () => {
  return gulp.src(LESS_LIST)
    .pipe(less())
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});

gulp.task('babel', () => {
  return gulp.src(JS_LIST)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('version', () => {
  gulp.src('index.html')
    .pipe(replace('@version', `v.${VERSION}`))
    .pipe(gulp.dest('dist'));
});

gulp.task('server', ['less', 'babel', 'version'], done => {
  // gulp.src('index.html').pipe(gulp.dest('dist'));

  http.createServer(
    st({
      path: `${__dirname}/dist`,
      index: 'index.html',
      cache: false
    })
  ).listen(8080, done);
});

gulp.task('watch', ['server'], () => {
  livereload.listen({
    basePath: 'dist'
  });
  livereload.reload('dist/index.html');
  gulp.watch(LESS_LIST, ['less']);
  gulp.watch(JS_LIST, ['babel']);
});
