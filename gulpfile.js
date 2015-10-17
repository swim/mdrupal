/**
 * @file
 * gulpfile.js
 *
 * @project, mdrupal
 */

var gulp = require('gulp');
// var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var assign = require('lodash.assign');
var babel = require('babelify');

// For niceness later.
/*var babel = require('gulp-babel');*/
/*gulp.task('es6', function() {
  return gulp.src('core/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./src'));
});*/

function compile(watch) {
  var bundler = watchify(browserify({
      entries: ['./build.js'],
      debug: true,
      standalone: 'md'
    }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('mdrupal.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
