/* global module:false */
module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		pkg: '<json:package.json>',

		inputJS: 'js/reveal.js',
		inputCSS: 'css/reveal.css',

		outputJS: 'js/reveal.min.js',
		outputCSS: 'css/reveal.min.css',

		meta: {
			version: '2.2',
			banner: 
				'/*!\n' +
				' * reveal.js <%= meta.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://lab.hakim.se/reveal-js\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2011-2012 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		lint: {
			files: [ 'grunt.js', '<%= inputJS %>' ]
		},

		// Tests will be added soon
		qunit: {
			files: [ 'test/**/*.html' ]
		},

		min: {
			dist: {
				src: [ '<banner:meta.banner>', '<%= inputJS %>' ],
				dest: '<%= outputJS %>'
			}
		},

		mincss: {
			compress: {
				files: {
					'<%= outputCSS %>': [ '<%= inputCSS %>' ]
				}
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true
			},
			globals: {
				head: false,
				module: false,
				console: false
			}
		},

		watch: {
			files: [ 'grunt.js', '<%= inputJS %>', '<%= inputCSS %>', 'index.html', '*.css' ],
			tasks: [ 'mincss', 'reload' ]
		},

        reload: {
            port: 6001,
            proxy: {
                host: 'localhost',
                port: 8000 // should match server.port config
            }       
        },
        server: {
            port: 8000
        },

        open: {
            'default': {
                url: 'http://localhost:6001'
            }
        }
	});
	
	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-mincss' );
	grunt.loadNpmTasks( 'grunt-open' );
	grunt.loadNpmTasks( 'grunt-reload' );

    grunt.registerTask('default', [ 'server', 'reload', 'open', 'watch' ] );

	// Default task
	// grunt.registerTask( 'default', [ 'lint', 'mincss', 'min' ] );


};
