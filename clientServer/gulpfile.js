const gulp = require("gulp");
const gulpCssPreprocessor = require("gulp-css-preprocessor");
const gulpConcatCss = require("gulp-concat-css");
const babel = require("gulp-babel");
const refresh = require("gulp-refresh");
const shell = require("gulp-shell");

// gulp.task("run1", shell.task(["gulp watch"]));
// gulp.task("run2", shell.task(["npm start"]));

gulp.task("es6", () => {
  return gulp
    .src("./asset/js/**/*")
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(gulp.dest("./public/js/"))
    .pipe(refresh());
});

gulp.task("css", function() {
  return (gulp
      .src("./asset/css/**/*")
      .pipe(gulpCssPreprocessor())
      // .pipe(gulpConcatCss('style.css'))
      .pipe(gulp.dest("./public/css/**/*"))
      .pipe(refresh()) );
});

gulp.task("watch", () => {
  refresh.listen();
  gulp.watch("./dev/**/*", ["es6", "css"]);
});

gulp.task("default", ["es6", "css","watch"]);
