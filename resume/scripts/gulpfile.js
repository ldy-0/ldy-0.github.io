const gulp = require('gulp');

gulp.task('default', ()=>{
	gulp.src('./ie.js').pipe(gulp.dest('./dest/ie.js'));
});