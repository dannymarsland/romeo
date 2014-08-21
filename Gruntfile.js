var nodePath = require('path');
module.exports = function (grunt) {
    var base = '';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

//        clean: [
//            staticDir + '/**/*'
//        ],

        typescript: {
          dev: {
            src: ['src/**/*.ts'],
            dest: '',
            options: {
              target: 'es3',
              sourceMap: true
            }
          }
        },

        watch: {
          annotate: {
            files: ['src/*.ts', 'example/*.ts'],
            tasks: [
              'typescript_annotations'
            ]
          }
        },

      typescript_annotations: {
          example: {
              "input": "example/main.ts",
              "output": "example/annotations.js"
          }
      }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-typescript-annotations');
  grunt.file.setBase(base);
  grunt.registerTask('default', ['watch']);


};