module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    wiredep: {
      target: {
        src: 'app/index.html' // point to your HTML file.
      }
    },
    watch: {
      scripts: {
        files: 'bower.json',
        tasks: 'wiredep'
      }
    },
    connect: {
      server: {
        options: {
          keepalive: true,
          port: 9000,
          open: true,
          base: {
            path: 'app',
            options: {
              index: 'index.html',
              maxAge: 300000
            }
          }
        }
      }
    }
  });

  // Load npm tasks
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');


  // Define tasks.
  grunt.registerTask('default', ['connect']);
  grunt.registerTask('watch', ['watch']);

};