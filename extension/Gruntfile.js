module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			sass: {
				files: ['assets/scss/**/*.scss'],
				tasks: ['sass']
			},
			js: {
				files: ['assets/js/**/*.js'],
				tasks: ['uglify']
			}
		},

		uglify: {
			options: {
				mangle: false,
				banner: '// <%=pkg.name%> - <%=pkg.version%> \n' 
						+ '// Oles Andrienko <%= grunt.template.today("yyyy-mm-dd") %> - Minified with Grunt\n\n'
			},
			dist: {
				files: [{
					expand: true,
			        cwd: 'assets/js',
			        src: ['*.js', '!*.min.js'],
			        dest: 'dist/js',
			        ext: '.min.js'
				}]
			}
		}


	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['sass', 'uglify']);
};
