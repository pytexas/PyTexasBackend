var gulp = require('gulp');
var concat = require("gulp-concat");
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var exec = require('child_process').exec;
var plumber = require('gulp-plumber');

var dir = 'pytx/static';

function build_js (done) {
  exec(`parcel build ${dir}/src/index.js -d dist -o pytexas.js`, function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    done(err);
  });
}

function create_dist (done) {
  exec(`mkdir dist/`, function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    done();
  });
}

function build_less (done) {
  return gulp
    .src([`${dir}/src/**/*.less`])
    .pipe(plumber())
    .pipe(less({paths: []}))
    .pipe(concat('global.css'))
    .pipe(gulp.dest(`dist`));
}

function watch () {
  gulp.watch(`${dir}/src/**/*.less`, gulp.parallel(build_less));
  gulp.watch([`${dir}/src/**/*.js`, `${dir}/src/**/*.vue`], gulp.parallel(build_js));
}

var defaultTasks = gulp.series(
  create_dist,
  gulp.parallel(build_js, build_less)
);

gulp.task('watch', gulp.series(defaultTasks, watch));

gulp.task('default', defaultTasks);
