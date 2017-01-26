/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const del = require('del');
const gzip = require('gulp-gzip');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const webpackConfig = require('./client/webpack.prod.config.js');

const eslintFiles = ['client/src/**/*.jsx', '**/*.js',
  '!node_modules/**', '!client/node_modules/**', '!server/**', '!dist/**'];

gulp.task('clean', () =>
  del([
    'dist/**/*'
  ])
);

gulp.task('js-lint', () =>
    gulp.src(eslintFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('lint-soft', () =>
    gulp.src(eslintFiles)
        .pipe(eslint())
        .pipe(eslint.format())
);

gulp.task('test', ['js-lint']);
