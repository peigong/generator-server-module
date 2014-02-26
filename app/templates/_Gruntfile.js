
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['dist']
    },
    copy: {
      dist: {
        files: [ 
          { expand: true, cwd: "bower_components/node-server/lib", src: ['**'], dest: 'dist/server' },
          { expand: true, cwd: "bower_components/node-server/lib/config", src: ['package.json'], dest: 'dist/server' },
          { expand: true, cwd: "lib", src: ['**'], dest: 'dist/server' }
        ]
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Default task.
  grunt.registerTask('default', ['clean', 'copy']);

};
