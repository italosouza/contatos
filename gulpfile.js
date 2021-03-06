var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var nano = require('gulp-cssnano');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var minifyHTML = require('gulp-minify-html');

gulp.task('images', function() {
  gulp.src('./client/static/images/**/*')
    // .pipe(cache(imagemin({
    //   optimizationLevel: 3,
    //   progressive: true,
    //   interlaced: true
    // })))
    .pipe(gulp.dest('./dist/public/static/images/'));

  gulp.src('./client/static/**/*.svg')
    .pipe(gulp.dest('./dist/public/static/assets/'));
});

gulp.task('styles', function() {
  gulp.src(['./client/**/*.scss', '!./client/vendor/**/*.scss', '!./client/vendor/**/*.css', './client/**/*.css'])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    // .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(nano())
    .pipe(gulp.dest('./dist/public'))
});

gulp.task('copyfonts', function() {
  // gulp.src('./client/static/**/*.{eot,ttf,woff,woff2,eof,svg}')
  //   .pipe(gulp.dest('./dist/public/static'));
});

gulp.task('copyhtml', function() {
  gulp.src('./client/**/*.html')
    .pipe(gulp.dest('./dist/public/'));
});

gulp.task('copyhtmlmin', function() {
  gulp.src('./client/**/*.html')
    .pipe(minifyHTML({empty: true}))
    .pipe(gulp.dest('./dist/public/'));
});

gulp.task('copyvendor', function() {
  gulp.src(['./client/vendor/**/*.js', './client/vendor/**/*.map'])
    .pipe(gulp.dest('./dist/public/vendor/'));

  gulp.src('./client/vendor/**/*.css')
    .pipe(gulp.dest('./dist/public/vendor/'));
});

gulp.task('scripts', function() {
  return gulp.src(['./client/**/*.js', '!./client/vendor/**/*.js', '!./client/**/*_test.js'])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/public/'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/public/'))
});

gulp.task('server', function() {
  return gulp.src(['./server/**/*.js', '!./server/vendor/**/*.js', '!./server/**/*_test.js'])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

// Static server
gulp.task('browser-sync', function() {

  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  gulp.watch("*.html").on("change", reload);

});

gulp.task('default', function() {
  // gulp.watch("./server/**/*.js", ['server']);
  // gulp.watch("./client/**/*.css", ['styles']);
  gulp.watch("./client/**/*.js", ['scripts']);
  gulp.watch("./client/**/*.html", ['copyhtml']);
});

gulp.task('build', ['images', 'styles', 'copyhtml', 'scripts', 'copyvendor', 'server']);
