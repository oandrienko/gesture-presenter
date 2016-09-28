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

		sass: {
			options: {
				sourcemap: 'none'
			},
			dist: {
				files: [{
					expand: true,
			        cwd: 'assets/scss',
			        src: ['**/*.scss'],
			        dest: 'dist/css',
			        ext: '.css'
				}]
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
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['sass', 'uglify']);
};





// module.exports = function(grunt) {

// 	grunt.initConfig({

// 		pkg: grunt.file.readJSON('package.json'),

// 		watch: {
// 			sass: {
// 				files: ['assets/scss/**/*.scss'],
// 				tasks: ['sass', 'cssmin', 'concat']
// 			},
// 			js: {
// 				files: ['assets/js/**/*.js'],
// 				tasks: ['uglify', 'concat']
// 			}
// 		},

// 		sass: {
// 			options: {
// 				sourcemap: 'none'
// 			},
// 			dist: {
// 				files: [{
// 					expand: true,
// 			        cwd: 'assets/scss',
// 			        src: ['**/*.scss'],
// 			        dest: 'assets/css',
// 			        ext: '.css'
// 				}]
// 			}
// 		},

// 		concat: {
// 			css: {
// 				src: 'assets/css/**/*.css',
// 				dest: 'dist/css/main.css'
// 	        },
// 	        js: {
// 			    src: 'assets/js/**/*.js',
// 			    dest: 'dist/js/main.js'
// 		    }
// 		},

// 		uglify: {
// 			options: {
// 				mangle: false,
// 				banner: '// <%=pkg.name%> - <%=pkg.version%> \n' 
// 						+ '// Oles Andrienko <%= grunt.template.today("yyyy-mm-dd") %> - Minified with Grunt\n\n'
// 			},
// 			dist: {
// 				files: [{
// 					expand: true,
// 			        cwd: 'dist/js',
// 			        src: ['*.js', '!*.min.js'],
// 			        dest: 'dist/js',
// 			        ext: '.min.js'
// 				}]
// 			}
// 		},

// 		cssmin: {
// 			dist: {
// 				files: [{
// 					expand: true,
// 					cwd: 'dist/css/',
// 					src: ['*.css', '!*.min.css'],
// 					dest: 'dist/css/',
// 					ext: '.min.css'
// 				}]
// 			}
// 		}

// 	});
	
// 	grunt.loadNpmTasks('grunt-contrib-watch');
// 	grunt.loadNpmTasks('grunt-contrib-sass');
// 	grunt.loadNpmTasks('grunt-contrib-concat');
// 	grunt.loadNpmTasks('grunt-contrib-uglify');
// 	grunt.loadNpmTasks('grunt-contrib-cssmin');
// 	//grunt.loadNpmTasks('grunt-contrib-htmlmin');

// 	grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'concat']);
// };

