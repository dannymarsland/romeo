module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: [
            'public/static/**/*'
        ],

        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: '**/*.!(scss|png|gif|jpg)',
                    dest: 'public/static'
                }]
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: 'assets/',
                    src: '**/*.!(ts|scss|png|gif|jpg)',
                    dest:'public/static'
                }]
            }
        },

        imagemin: {
            all: {
                expand: true,
                cwd: 'assets/images',
                src: '**/*.{png,jpg,gif}',
                dest: 'public/static/images/'
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'assets/scss/',
                    cssDir: 'public/static/css',
                    imagesDir: 'assets/images',
                    generatedImagesDir: 'public/static/images',
                    httpImagesPath: '/static/images',
                    httpGeneratedImagesPath: '/static/images',
                    assetCacheBuster: false,
                    trace: true
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            vendor: {
                src: [
                    'assets/js/vendor/jquery.js',
                ],
                dest: 'public/static/js/vendor.js'
            }
        },

        uglify: {
            main: {
                src: 'public/static/js/all.js',
                dest: 'public/static/js/all.js'
            },
            vendor: {
                src: 'public/static/js/vendor.js',
                dest: 'public/static/js/vendor.js'
            }
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8,
                reverse: true
            },
            assets: {
                src: [
                    'public/static/js/**/*.js',
                    'public/static/css/**/*.css'
                    //'public/static/images/**/*.jpg'
                ]
            }
        },

        userev: {
            options: {
                hash: /(\.[a-f0-9]{8})\.[a-z]+$/
            },
            templates: {
                src: [
                    'src/Application/Entity/templates/**/*.tpl'
                    //'data/locale/*.php'
                ],
                options: {
                    patterns: {
                        'js': /(js\/[\/0-9a-zA-Z\.\-]*\.js)/g,
                        'css': /(css\/[\/0-9a-zA-Z\.\-]*\.css)/g
                        //'img': /([\/0-9a-zA-Z\.\-]*\.jpg)/g
                    }
                }
            }
        },

        ts: {
            // use to override the default options, See: http://gruntjs.com/configuring-tasks#options
            // these are the default options to the typescript compiler for grunt-ts:
            // see `tsc --help` for a list of supported options.
            options: {
                compile: true, // perform compilation. [true (default) | false]
                comments: false, // same as !removeComments. [true | false (default)]
                target: 'es3', // target javascript language. [es3 (default) | es5]
                sourceMap: true, // generate a source map for every output js file. [true (default) | false]
                sourceRoot: '/static/typescript',                // where to locate TypeScript files. [(default) '' == source ts location]
                mapRoot: '', // where to locate .map.js files. [(default) '' == generated js location.]
                declaration: false // generate a declaration .d.ts file for every output js file. [true | false (default)]
            },
            // a particular target
            main: {
                src: ["assets/typescript/main.ts"], // The source typescript files, http://gruntjs.com/configuring-tasks#files
                //reference: 'assets/typescript/reference.ts', // If specified, generate this file that you can use for your reference management
                out: 'public/static/js/all.js' // If specified, generate an out.js file which is the merged js file
            },
            test: {
                src: ["assets/typescript/test/**/*.ts"], // The source typescript files, http://gruntjs.com/configuring-tasks#files
                //reference: 'assets/typescript/test/reference.ts', // If specified, generate this file that you can use for your reference management
                out: 'public/static/js/test.js' // If specified, generate an out.js file which is the merged js file
            }
        },

        cssmin: {
            main: {
                files: {
                    'public/static/css/main.css': ['public/static/css/main.css']
                }
            }
        },

        watch: {
            ts: {
                files: ['assets/typescript/**/*.ts'],
                tasks: [
                    'ts:main'
                ]
            },
            typescript_annotations: {
                files: ['assets/typescript/**/*.ts'],
                tasks: [
                    'typescript_annotations'
                ]
            },
            js: {
                files: ['assets/js/**/*.js'],
                tasks: [
                    'concat:vendor'
                ]
            },
            scss: {
                files: ['assets/scss/**/*.scss'],
                tasks: [
                    'compass:dev'
                ]
            },
            image: {
                files: ['assets/images/**/*.(jpg|png|gif)'],
                tasks: [
                    'newer:imagemin'
                ]
            },
            copy: {
                files: ['assets/**/*'],
                tasks: [
                    'newer:copy:dev'
                ]
            }
        },

        typescript_annotations: {
            main: {
                "input": "assets/typescript/main.ts",
                "output": "public/static/js/annotations.js"
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-userev');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-typescript-annotations');


    grunt.registerTask('default', ['dev']);
    grunt.registerTask('dev', ['development']);
    grunt.registerTask('prod', ['production']);
    grunt.registerTask('rev', ['filerev:assets', 'userev']);
    grunt.registerTask('development', [
        'concat:vendor',
        'ts',
        'typescript_annotations',
        'compass:dev',
        'imagemin',
        'copy:dev'
    ]);
    grunt.registerTask('production', [
        'concat:vendor',
        'ts',
        'typescript_annotations',
        'compass:dev',
        'imagemin',
        'copy:prod',
        'uglify',
        'cssmin',
        'rev'
    ]);
    grunt.registerTask('staging', [
        'production'
    ]);
    grunt.registerTask('test', ['mocha']);

};