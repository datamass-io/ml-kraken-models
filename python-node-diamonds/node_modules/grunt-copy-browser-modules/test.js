'use strict';
var grunt = require('grunt');
var test = require('tap').test;
var rimraf = require('rimraf');
var path = require('path');
var fs = require('fs');

grunt.loadNpmTasks('grunt-force-task');
test('Grunt-localizr', function (t) {
    grunt.task.init = function() {};
    require('./tasks')(grunt);

    t.test('test a localizr build', function(t) {
        grunt.initConfig({
            "copy-browser-modules": {
                target: {
                    options: {
                        root: path.resolve(__dirname, "test-fixtures/trivial"),
                        dest: path.resolve(__dirname, "tmp/components")
                    }
                }
            }
        });

        grunt.tasks(['copy-browser-modules'], {}, function(){
            //verify the files exist
            t.ok(fs.existsSync(path.resolve("tmp/components/component1/component1.js")));
            t.ok(fs.existsSync(path.resolve("tmp/components/component1/package.json")));

            rimraf('tmp', function() {
                t.end();
            });

        });
    });

});
