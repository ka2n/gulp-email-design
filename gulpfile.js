var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var inlineCss = require('gulp-inline-css');

gulp.task('default', ['email']);

gulp.task('styles', function() {
  return gulp.src(['src/styles/*.scss', '!src/styles/_*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('.build/'));
});

gulp.task('html', function() {
  return gulp.src(['src/emails/*.jade', '!src/emails/_*.jade'])
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('.build/'));
});

gulp.task('email', ['html', 'styles'], function() {
  return gulp.src('.build/*.html')
    .pipe(plumber())
    .pipe(inlineCss({
      preserveMediaQueries: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['email'], function() {
  gulp.watch('src/**/*', ['email']);
});

