module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Javascript EVERYWHERE
        concat: {
            // This just moves modernizr to a usuable place
            modernizr: {
                src: 'bower_components/foundation/js/vendor/custom.modernizr.js',
                dest: '../public/media/javascript/custom.modernizr.js'
            },
            // This grabs all of our libraries and makes one file
            libs: {
                src: [
                    'bower_components/jquery/jquery.js',
                    'javascript/lib/jquery.pubsub.js',

                    'bower_components/foundation/js/foundation/foundation.js',
                    'bower_components/foundation/js/foundation/foundation.alerts.js',
                    'bower_components/foundation/js/foundation/foundation.clearing.js',
                    'bower_components/foundation/js/foundation/foundation.cookie.js',
                    'bower_components/foundation/js/foundation/foundation.dropdown.js',
                    'bower_components/foundation/js/foundation/foundation.forms.js',
                    'bower_components/foundation/js/foundation/foundation.joyride.js',
                    'bower_components/foundation/js/foundation/foundation.magellan.js',
                    'bower_components/foundation/js/foundation/foundation.orbit.js',
                    'bower_components/foundation/js/foundation/foundation.placeholder.js',
                    'bower_components/foundation/js/foundation/foundation.reveal.js',
                    'bower_components/foundation/js/foundation/foundation.section.js',
                    'bower_components/foundation/js/foundation/foundation.tooltips.js',
                    'bower_components/foundation/js/foundation/foundation.topbar.js',

                    'bower_components/knockout/build/output/knockout-latest.js',
                    'bower_components/finchjs/scripts/finch.js'
                ],
                dest: '../app/www/media/javascript/libs.js'
            },
            app: {
                src: [
                    'javascript/setup.js',
                    'javascript/scenes/*.js',
                    'javascript/models/*.js',
                    'javascript/viewmodels/*.js',
                    'javascript/functions.js',
                    'javascript/app.js'
                ],
                dest: '../app/www/media/javascript/app.js'
            }
        },

        // Compass Style
        compass: {
            // Grab the foundation scss and make a foundation file
            libs: {
                options: {
                    sassDir: 'bower_components/foundation/scss/',
                    cssDir: '../app/www/media/stylesheets/'
                }
            },
            // Grab our application SCSS and make that file
            app: {
                options: {
                    sassDir: 'sass/',
                    cssDir: '../app/www/media/stylesheets/'
                }
            }
        },

        // Template concatination and manipulation
        htmlbuild: {
            dist: {
                src: 'templates/index.html',
                dest: '../app/www/',
                options: {
                    beautify: false,
                    sections: {
                        views: 'templates/views/*.html'
                    }
                }
            }
        },

        // General files folder, used for images, static files.
        copy: {
            app: {
                files: [
                    {
                        expand: true,
                        cwd: 'files/',
                        src: ['**'],
                        dest: '../app/www/files/'
                    }
                ]
            }
        },

        // For watching we specifically look for non-library changes. If you update your
        // libraries run 'grunt init' from the command line to include your changes
        watch: {
            copy: {
                files: [
                    'files/**/*'
                ],
                tasks: ['copy:app']
            },
            scripts: {
                files: [
                    'javascript/*',
                    'javascript/scenes/*',
                    'javascript/models/*',
                    'javascript/viewmodels/*'
                ],
                tasks: ['concat:app']
            },
            sass: {
                files: [
                    'sass/*'
                ],
                tasks: ['compass:app']
            },
            templates: {
                files: [
                    'templates/*',
                    'templates/views/*'
                ],
                tasks: ['htmlbuild:dist']
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('init', ['concat', 'compass', 'htmlbuild']);
};