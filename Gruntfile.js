module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    releaseDir: "client",
    buildDate : grunt.template.today(),
	src : {
		js 	 : ["src/controllers/*.js",
		   	    "<%= pkg.name %>.js",
		   	    "src/directives/*.js"] ,
		html : {
			index : "src/index.html",
			views : "src/views",
			templates : "src/templates",
			directives : "src/directives",
		},
		libs : "src/libs",
		swagger : "src/swagger-ui",
		bootstrap : "node_modules/bootstrap/dist",
		css	 : "src/css",
		img  : "src/images",
    tests : "tests"
	},

	clean : {
    	options: {
    		force: true
    	},
    	files: [ "<%= releaseDir %>" ]
    },

    mkdir: {
        all: {
          options: {
            create: ["<%= releaseDir %>"]
          },
        },
      },

	concat: {
		js : {
			src : ["src/<%= pkg.name %>.js",
			       "src/directives/*.js",
			       "src/controllers/*.js"],
			dest : "<%= releaseDir %>/<%= pkg.name %>.js"
		},
	},

	copy: {
		loginHtml : {
			src		: "<%= src.html.index %>",
			dest	: "<%= releaseDir %>/",
            expand : true,
            flatten: true
		},
		libs : {
			files : [ {
				dest: "<%= releaseDir %>/libs/",
				src : "**/*.js",
				cwd : "<%= src.libs %>",
				expand : true,
				flatten: false
			} ]
		},
		views : {
			files : [ {
				dest : "<%= releaseDir %>/views/",
				src : "**/*.html",
				cwd: "<%= src.html.views %>",
				expand : true,
				flatten: false
			} ]
		},
		templates : {
            files : [ {
                dest : "<%= releaseDir %>/templates/",
                src : "**/*.html",
                cwd: "<%= src.html.templates %>",
                expand : true,
                flatten: false
            } ]
		},
        images : {
            expand: true,
            cwd: "<%= src.img %>",
            src: ["**/*.png", "**/*.cur", "**/*.jpg", "**/*.gif", "**/*.ico", "**/*.svg"],
            dest: "<%= releaseDir %>/images"
        },
        css : {
            dest : "<%= releaseDir %>/css",
            cwd : "<%= src.css %>",
            src: ["**/*.css"],
            expand : true,
            flatten: false
        },
        swagger : {
            dest : "<%= releaseDir %>/swagger-ui",
            cwd : "<%= src.swagger %>",
            src: ["**/*.*"],
            expand : true,
            flatten: false
        },
        bootstrap : {
            files : [ {
            	 dest : "<%= releaseDir %>/css",
                 cwd : "<%= src.bootstrap %>/css",
                 src: ["**/*.css"],
                 expand : true,
                 flatten: false
            },{
            	dest : "<%= releaseDir %>/fonts",
                cwd : "<%= src.bootstrap %>/fonts",
                src: ["**/*.*"],
                expand : true,
                flatten: false
            },{
            	dest : "<%= releaseDir %>/libs",
                cwd : "<%= src.bootstrap %>/js",
                src: ["**/bootstrap.min.js"],
                expand : true,
                flatten: false
            }]
		}
	},

    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      },
      build: {
        src: "<%= releaseDir %>/<%= pkg.name %>.js",
        dest: "<%= releaseDir %>/<%= pkg.name %>.js"
      }
    },

    jshint : {
        files : [ "GruntFile.js", "<%= src.js %>" ],
        options : {
            curly           : true,
            eqeqeq          : true,
            immed           : true,
            latedef         : true,
            newcap          : true,
            noarg           : true,
            sub             : true,
            boss            : true,
            eqnull          : true,
            globals         : {
                "angular"   : true,
                "module"    : true,
                "document"  : true,
                "location"  : true,
                "$"         : true,
                "pathfinderApp"    : true
            },
            camelcase       : false,
            noempty         : true,
            nonew           : true,
            quotmark        : "double",
            undef           : true,
            unused          : true,
            trailing        : true,
            "-W099"	        : true
        }
    },
    watch : {
        options : {
            livereload : true
        },
        app : {
            files : [
                      "<%= jshint.files %>",
                      "<%= src.html.index %>",
                      "<%= src.html.views %>/*.html",
                      "<%= src.html.templates %>/*.html",
                      "<%= src.html.directives %>/*.js",
                      "<%= src.css %>/*.css",
                      "<%= tests %>/*.js"
                      ],
            tasks : [ "default" ],
        }
    },

     karma: {
            unit: {
                configFile: "karma.conf.js"
            }
        }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-mkdir");
  grunt.loadNpmTasks("grunt-karma");

  // Default task(s).
  grunt.registerTask("init", ["clean", "mkdir", "concat", "copy"/*, "karma"*/]);
  grunt.registerTask("dev", ["jshint", "init"]);
  grunt.registerTask("default", ["dev"]);
  grunt.registerTask("prod", ["karma", "jshint", "init", "uglify"]);

};