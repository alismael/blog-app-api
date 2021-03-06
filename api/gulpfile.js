const gulp = require('gulp')
const ts = require('gulp-typescript')

// pull in the project Typescript config
const tsProject = ts.createProject('tsconfig.json');

//task to be run when the watcher detects changes
gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dest'));
});

//set up a watcher to watch over changes
gulp.task('watch', ['scripts'], () => 
  gulp.watch('./src/**/*.ts', ['scripts'])
)

gulp.task("copy-folders", () =>
  gulp
    .src(["./src/uploads"])
    .pipe(gulp.dest("./dest"))
)

gulp.task('default', ['watch', 'copy-folders']);