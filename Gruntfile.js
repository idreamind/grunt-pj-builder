module.exports = function(grunt) {

    // JS code:
    var now = new Date();
    var date =  now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear() + ' ' +
                now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ';

    var title = "<%= pkg.name %>",

        header = "/* '" + title + "' make by Grunt-Pj-Builder on " + date + " */",

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
    					"      	*title#<%= pkg.name %>*/title#",
    					"      	*link rel='stylesheet' type='text/css' href='css/style.css'#",
    					"      	*link rel='stylesheet' type='text/css' href='css/build/production.min.css'#",
    					"      	*link rel='shortcut icon' type='image/png' href='images/icons/fav.png'#",
    					"		*script type='text/javascript' src='js/build/production.min.js'#*/script#",
						"	*/head#",
    					"	*body#",
    					"       *div#",
    					"       Hellow World!",
    					"       */div#",
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

    // Config:
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Shell:
        shell: {
            multiple: {
                command: [
                    'mkdir css',
                    'mkdir sass',
                    'mkdir fonts',
                    'mkdir js',
                    'mkdir images',
                    'cd css',
                    'mkdir build',
                    'cd ../sass',
                    'echo ' + header + ' >> style.scss',
                    'cd ../js',
                    'mkdir vendors',
                    'mkdir plugins',
                    'mkdir build',
                    'mkdir angular',
                    'echo ' + header + ' >> main.js',
                    'cd ../images',
                    'mkdir build',
                    'mkdir icons',
                    'mkdir data',
                    'cd data',
                    'mkdir general',
                    'mkdir personal',
                    'cd ../../js',
                    printArray( mainJS, 'main.js' ),
                    'cd ../',
                    printArray( indexHtml, 'index.html' ),
                    printArray( gitIgnore, '.gitignore' ),
                    'git init',
                    'git add --all',
                    'git commit -m "The project is initialized."',
                    'git status >> README.md'
                ].join('&&')
            }
        },
		replace: {
		  	html: {
		    	src: ['*.html'], 
		    	overwrite: true,                     
		    	replacements: [{
		      		from: '*',                  
		      		to: '<'
		    	}, {
		      		from: '#',    
		      		to: '>'
		    	}]
		  	}
		}
    });


    // Plugins:
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-text-replace');

    // Default commands:
    grunt.registerTask('default', ['shell', 'replace']);
};