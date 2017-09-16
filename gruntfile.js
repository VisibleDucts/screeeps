module.exports = function(grunt) {

	var config = require('./.screeps.json')
    var branch = grunt.option('branch') || config.branch;
    var email = grunt.option('email') || config.email;
    var password = grunt.option('password') || config.password;
    var ptr = grunt.option('ptr') ? true : config.ptr


    grunt.loadNpmTasks('grunt-screeps');
    grunt.initConfig({
        screeps: {
            options: {
                email: config.email,
                password: config.password,
                branch: config.branch,
                ptr: config.ptr
            },
			dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['src/*.js'],
                        flatten: true
                    }
                ]
            }
        }
    });
}
