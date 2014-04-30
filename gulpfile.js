var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');

gulp.task('default', function(){
    gulp.src(['src/parser.pegjs'])
        .pipe(shell([
            'pegjs <%= file.path%>'
        ]));
});
