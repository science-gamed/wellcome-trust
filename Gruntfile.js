module.exports = function ( grunt ) {

	'use strict';

	grunt.initConfig({

		// default config
		prod: false,
		min: false,

		// tasks
		watch: {
			options: {
				interrupt: true
			},
			sass: {
				files: 'src/**/*.scss',
				tasks: 'sass'
			},
			root: {
				files: [ 'src/index.html', 'src/main.js' ],
				tasks: 'copy:index'
			},
			assets: {
				files: [ 'src/assets/**/*' ],
				tasks: [ 'clean:assets', 'copy:assets' ]
			}
		},

		sass: {
			main: {
				files: [{
					src: 'src/styles/main.scss',
					dest: 'build/min.css'
				}],
				options: {
					debugInfo: '<%= prod ? false : true %>',
					style: ( '<%= min ? "compressed" : "expanded" %>' )
				}
			}
		},

		copy: {
			index: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: '*',
					dest: 'build/'
				}]
			},
			assets: {
				files: [{
					expand: true,
					cwd: 'src/assets/',
					src: '**/*',
					dest: 'build/assets/'
				}]
			}
		},

		clean: {
			build: [ 'build' ],
			assets: [ 'build/files' ]
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );


	grunt.registerTask( 'build', [
		'clean',
		'copy',
		'sass'
	]);

	grunt.registerTask( 'default', [
		'build',
		'watch'
	]);

};