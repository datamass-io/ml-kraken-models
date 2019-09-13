Collects browser modules from `node_modules` and dumps them somewhere as commonjs
Packages/A style packages (note that this is similar to but not the same as
node modules), ready to use with requirejs or other systems.

First, it scans the tree of `node_modules`, detecting and erroring if browser
modules overlap. There is no support for node style nesting dependencies and
search path from each module.

Then it takes that list of modules and copies them to the target directory.

This wraps the `copy-browser-modules` package into a grunt shaped fun time.

An example task:


```
module.exports = function copyto(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-copy-browser-modules');

    // Options
    return {
        build: {
            options: {
                root: path.resolve(__dirname, '..'),
                dest: path.resolve(__dirname, '..', 'public', 'components'),
                basePath: path.resolve(__dirname, '..', 'public')
            }
        }
    };
};
```
