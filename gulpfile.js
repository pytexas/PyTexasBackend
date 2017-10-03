var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require("gulp-concat");
var less = require('gulp-less');
var rollup = require('rollup').rollup;
var buble = require('rollup-plugin-buble');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

var build_tasks = ['build-js', 'build-css', 'copy-md'];

var frontdir = process.env.FRONTEND_DIR || './node_modules/pytexas';

gulp.task('build-js', function () {
  return rollup({
    input: `${frontdir}/app/pytx.js`,
    plugins: [
      resolve({ jsnext: true }),
      commonjs(),
      buble()
    ],
    external: ['vue', 'vue-router', 'vue-material']
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      file: './frontend/2017-dist/pytx.js',
      globals: {
        "vue": 'Vue',
        "vue-router": 'VueRouter',
        "vue-material": 'VueMaterial'
      },
    });
  });
});

gulp.task('build-css', function () {
  return gulp.src(`${frontdir}/app/**/*.less`)
    .pipe(plumber())
    .pipe(less({paths: [`${frontdir}/less`]}))
    .pipe(concat('pytx.css'))
    .pipe(gulp.dest("frontend/2017-dist"));
});

gulp.task('copy-md', function () {
  return gulp.src(`${frontdir}/app/md/**/*.md`)
    .pipe(plumber())
    .pipe(gulp.dest("frontend/2017-dist/md"));
});

gulp.task('watch', build_tasks, function () {
  gulp.watch(`${frontdir}/app/md/**/*.md`, ['copy-md']);
  gulp.watch(`${frontdir}/app/**/*.js`, ['build-js']);
  gulp.watch(`${frontdir}/**/*.less`, ['build-css']);
});

gulp.task('default', build_tasks);
