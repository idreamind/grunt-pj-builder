module.exports = function(grunt) {

    // JS code:
    var now = new Date();
    var date =  now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear() + ' ' +
                now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ';

    var header = "/* Make by Grunt-Pj-Builder on " + date + " */",

    title = "",

    mainJS = [	"(function ($) {",
    			"	$(document).ready(function () {",
    			"      //",
    			"      //",
    			"      //",
    			"	});",
				"})(jQuery);" ],

    gitIgnore = [	"node_modules/*",
    				"node_modules/",
                	".idea/*",
                	".idea/",
                	".gitignore",
                	"*.gitignore",
                	"gitignore",
                	"Gruntfile.js",
                	"package.js"	],

    indexHtml = [	"*!DOCTYPE html#",
					"*html#",
					"	*head lang='en'#",
					"      	*meta charset='UTF-8'#",
					"      	*title#{{{}}}*/title#",
					"      	*link rel='stylesheet' type='text/css' href='css/style.css'#",
					"      	*link rel='stylesheet' type='text/css' href='css/build/production.min.css'#",
					"      	*link rel='shortcut icon' type='image/png' href='images/icons/fav.png'#",
					"		*script type='text/javascript' src='js/build/production.min.js'#*/script#",
					"	*/head#",
					"	*body#",
					"       *div#",
					"       Hellow World!",
					"       */div#",
					"		*script type='text/javascript' src='js/angular/angular.min.js'#*/script#",
					"		*script type='text/javascript' src='js/angular/angular-animate.min.js'#*/script#",
					"		*script type='text/javascript' src='js/angular/angular-route.min.js'#*/script#",
					"		*script type='text/javascript' src='js/angular/angular-touch.min.js'#*/script#",
					"		*script type='text/javascript' src='js/vendors/jquery-2.1.1.min.js'#*/script#",
					"		*script type='text/javascript' src='js/main.js'#*/script#",
					"   */body#",
					"*/html#"	];

    function printArray( array, file ) {
    	var newArr = [];
    	for( var i = 0; i < array.length; i++ ) {
    		newArr[i] = 'echo ' + array[i] + ' >> ' + file;
    	}
    	newArr = newArr.join('&&');
    	return newArr;
    };

    function dirName () {
    	var fs = require('fs');
    	title = fs.readFileSync('../grunt-pj-builder/name.json', {encoding: 'utf8', flags: 'r' });
    	return title;
    }

    function titleName () {
    	var fs = require('fs');
    	return "/* Project: '" + title  + "'. */";
    };

    function cleanName () {
    	return title;
    }

    // Config:
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Shell:
        shell: {
            multiple: {
                command: [
                	'cd ../',
                	'mkdir ' + dirName(),
                	'cd ' + dirName(), 
                    'mkdir css',
                    'mkdir sass',
                    'mkdir fonts',
                    'mkdir js',
                    'mkdir images',
                    'cd css',
                    'mkdir build',
                    'cd ../sass',
                    'echo ' + titleName() + ' >> style.scss',
                    'echo ' + header + ' >> style.scss',
                    'cd ../js',
                    'mkdir vendors',
                    'mkdir plugins',
                    'mkdir build',
                    'mkdir angular',
                    'echo ' + titleName() + ' >> main.js',
                    'echo ' + header + ' >> main.js',
                    'cd ../images',
                    'mkdir build',
                    'mkdir icons',
                    'cd ../',
                    'mkdir data',
                    'cd data',
                    'mkdir general',
                    'mkdir personal',
                    'cd ../js',
                    printArray( mainJS, 'main.js' ),
                    'cd ../',
                    printArray( indexHtml, 'index.html' ),
                    printArray( gitIgnore, '.gitignore' ),
                    'cd ../grunt-pj-builder/js_plugins',
                    'move angular.min.js ../../' + cleanName() + '/js/angular/',
                    'move angular-animate.min.js ../../' + cleanName() + '/js/angular/',
                    'move angular-route.min.js ../../' + cleanName() + '/js/angular/',
                    'move angular-touch.min.js ../../' + cleanName() + '/js/angular/',
                    'move jquery-2.1.1.min.js ../../' + cleanName() + '/js/vendors/',
                    'cd ../../' + cleanName(),
                    'git init',
                    'git add --all',
                    'git commit -m "The project is initialized."',
                    'git status >> README.md'
                ].join('&&')
            }
        },
		replace: {
		  	html: {
		    	src: ['../' + cleanName() + '/*.html'],
		    	overwrite: true,                     
		    	replacements: [{
		      		from: '*',                  
		      		to: '<'
		    	}, {
		      		from: '#',    
		      		to: '>'
		    	}, {
		    		from: '{{{}}}',
		    		to: cleanName()
		    	}]
		  	}
		}
    });

    // Plugins:
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-text-replace');

    // Default commands:
    grunt.registerTask('default', ['shell', 'replace']);
    // Rename command:
    grunt.registerTask('name', 'Set the project name.', function( arg ) {
    	var name = arg || "<%= pkg.name %>";
    	name = name.toString();

    	// Node.js
    	var fs = require('fs');
    	fs.writeFileSync('name.json', name, {flags: 'w'});

		grunt.task.run(['shell::multiple','replace:html']);
    	
    });
};