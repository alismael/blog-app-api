const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsfmt = require('gulp-tsfmt')
const changedInPlace = require('gulp-changed-in-place')
// pull in the project Typescript config
const tsProject = ts.createProject('tsconfig.json');


gulp.task('format', () => {
  gulp.src('**/*.ts')
    .pipe(changedInPlace())
    .pipe(tsfmt({
      IndentSize: 2,
      TabSize: 2,
      NewLineCharacter: "\n",
      ConvertTabsToSpaces: true,
      InsertSpaceAfterCommaDelimiter: true,
      InsertSpaceAfterSemicolonInForStatements: true,
      InsertSpaceBeforeAndAfterBinaryOperators: true,
      InsertSpaceAfterKeywordsInControlFlowStatements: true,
      InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
      InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
      PlaceOpenBraceOnNewLineForFunctions: false,
      PlaceOpenBraceOnNewLineForControlBlocks: false
    }))
    .pipe(gulp.dest(file => path.dirname(file.path)));
});

//task to be run when the watcher detects changes
gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dest'));
});

//set up a watcher to watch over changes
gulp.task('watch', ['scripts'], () => {
  gulp.watch('**/*.ts', ['scripts']);
});

gulp.task('run', ['watch']);