var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver');

gulp.task('js', function() {
  gulp.src('public/js/**/*')
});

gulp.task('html', function() {
  gulp.src('public/*.html')
});

gulp.task('css', function() {
  gulp.src('public/css/*.css')
});

// CSS, JS, HTML automation
gulp.task('watch', function() {
  gulp.watch('public/js/**/*', ['js']);
  gulp.watch('public/css/*.css', ['css']);
  gulp.watch(['public/*.html',
    'public/partials/*.html'], ['html']);
});

// LESS automation
gulp.task('build-less', function (){
  return gulp.src('public/less/*.less')
            .pipe(less())
            .pipe(gulp.dest('./public/css'));
});

// Server
gulp.task('webserver', function() {
  gulp.src('/public/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
