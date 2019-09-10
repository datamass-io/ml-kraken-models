
var Promise = require('promise');

module.exports = {
    runModel:runModel,
}


function runModel(inputData) {

    let data1 = JSON.stringify(inputData.data1);
    let data2 = JSON.stringify(inputData.data2);

    let inputParam = `'${data1}' '${data2}'`;

    const cmd = `Rscript --vanilla --quiet /app/r-scripts/scripts/runner.R ${inputParam}`;
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            console.log(stdout);
            console.log(stderr);
            resolve(stdout ? stdout : stderr);
        });
    });
}
