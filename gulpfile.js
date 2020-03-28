const gulp = require("gulp");
var rimraf = require('rimraf');
var panini = require("panini");
var browser = require("browser-sync").create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const ts = require('gulp-typescript');
gulp.task('compile', function() {
    var tsconfig = require("./tsconfig.json");
    return gulp.src('src/main/resources/src/ts/*.ts')
        .pipe(ts(tsconfig.compilerOptions))
        .pipe(gulp.dest('src/main/resources/src/js'));
});
gulp.task("panini", function (done) {
  gulp
    .src("src/main/resources/src/html/pages/*.html")
    .pipe(
      panini({
        root: "src/main/resources/src/html/pages/",
        layouts: "src/main/resources/src/html/layouts/",
        partials: "src/main/resources/src/html/partials/",
        helpers: "src/main/resources/src/helpers/",
        data: "src/main/resources/src/data/"
      })
    )
    .pipe(gulp.dest("src/main/resources/static"));
  done();
});
gulp.task("copy:css", function () {
  return gulp.src("src/main/resources/src/css/*.css").pipe(gulp.dest("src/main/resources/static/css/"));
});
gulp.task('ts', () => {
  return gulp.src('src/main/resources/src/ts/app.ts')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('src/main/resources/static'));
});
gulp.task('clean', function (cb) {
  rimraf('src/main/resources/static', cb);
});
gulp.task("build", gulp.series("clean", "copy:css", "ts", "panini"));
function resetPages(done) {
  panini.refresh();
  done();
}
function reload(done) {
  browser.reload();
  done();
}
function watch() {
  gulp
    .watch("src/main/resources/src/html/{layouts,partials,pages}/*.html")
    .on("all", gulp.series(resetPages, "build", reload));
  gulp
    .watch("src/main/resources/src/css/*.css")
    .on("all", gulp.series(resetPages, "copy:css", reload));
  gulp
    .watch("src/main/resources/src/ts/*.ts")
    .on("all", gulp.series(resetPages, "ts", reload));
}
gulp.task("watch", watch);

gulp.task("default", gulp.series("build"));
