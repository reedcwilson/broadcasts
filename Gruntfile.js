module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    output: {
      // configurable paths
      dev: 'public',
      prod: 'build'
    },
    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
      },
      // Environment targets
      development: {
        options: {
          dest: '<%= output.dev %>/javascripts/config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            root_uri: 'http://localhost:3000'
          }
        }
      },
      production: {
        options: {
          dest: '<%= output.prod %>/javascripts/config.js'
        },
        constants: {
          ENV: {
            name: 'production',
            root_uri: 'http://broadcasts.reedcwilson.com'
          }
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', []);

  // Custom tasks
  grunt.loadNpmTasks('grunt-ng-constant');

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }
    grunt.task.run([
      'ngconstant:development',
    ]);
  });

  grunt.registerTask('build', [
    'ngconstant:production',
  ]);

};
