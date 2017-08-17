const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');

gulp.task('default', () => 
	gulp.src('precompiled/binary-animation.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(minify()
		)
		.pipe(gulp.dest('js'))
	);
