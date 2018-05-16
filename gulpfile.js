var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

//bundling all browserify task 
gulp.task('browserify', function() {
    return browserify('./app/app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./app/build/'));
});

gulp.task('default',['browserify'],function(){
    //watching all the changes and triggering appropriate function
    gulp.watch('./app/app.js',['browserify'])
});