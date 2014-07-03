var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

var src = 'assets/';
var dest = 'assets/';

gulp.task('css', function() {

  return gulp.src(src + 'scss/app.scss')
    .pipe(sass({style: 'compressed'}).on('error', gutil.log))
    .pipe(autoprefix('last 10 versions'))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(dest + 'css'))
    .pipe(livereload());
    //.pipe(notify('CSS compiled, prefixed and minified.'));

});

gulp.task('scripts', function() {

  return gulp.src([
      /*'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
      'bower-components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js',
      */
      src+'js/plugins/*.js',
      src+'js/main.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest+'js'));

});

gulp.task('lint', function() {

  return gulp.src(src+'js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('images', function() {
  return gulp.src(src + 'img/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(dest + 'img'));
});

gulp.task('fonts', function() {
  return gulp.src(src + 'font/*')
    .pipe(gulp.dest(dest + 'font'));
});

gulp.task('watch', function () {

  gulp.watch(src + 'scss/**/*.scss', ['styles']);
  gulp.watch(src + 'js/**/*.js', ['scripts']);
  gulp.watch(src + 'img/**/*', ['images']);

});

gulp.task('default', ['css', 'scripts', 'images', 'fonts']);
