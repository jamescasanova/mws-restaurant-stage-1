/*
 After you have changed the settings under responsive_images
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [{
            /* Change these */
            width: 1024,
            suffix: '-large',
            quality: 50
          },
          {
            width: 640,
            suffix: '-medium',
            quality: 50
          },
          {
          	width: 320,
          	suffix: '-small',
          	quality: 50
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/',
          dest: 'img/new/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['img/new',],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['img/new'],
	  create: ['img/webp']
        },
      },
    },

    cwebp: {
      static: {
        files: { 
         /* 'dist/img-png.webp': 'src/img.png', */
          'img/webp/img-jpg.webp': 'img/new/*.jpg',
         /* 'dist/img-gif.webp': 'src/img.gif' */
        }
      },
      dynamic: {
        options: {
          q: 50
        },
        files: [{
          expand: true,
          cwd: 'img/new', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/webp'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-cwebp');
  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images', 'cwebp']);

};
