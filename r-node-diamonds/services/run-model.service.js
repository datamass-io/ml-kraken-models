
var Promise = require('promise');
const uuid = require('uuid');
const request = require('request')

module.exports = {
    runModel:runModel,
}


function runModel(inputData) {

    let modelData = JSON.stringify(inputData.modelData);
    let metaData = JSON.stringify(inputData.metaData);

    //let inputParam = `'${data1}'`;
    let actionId = uuid.v1();

    return new Promise((resolve, reject) => {
        request.post('https://r2bp2xn5b2.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-action-log', {
        json: {
            modelId: metaData.modelId,
            actionId: actionId,
            actionType: "REQUEST",
            body: modelData
        }
        }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`);
        console.log(body);
        })
    }).then(() => {
        const cmd = `Rscript --vanilla --quiet /Users/jwszol/Documents/workspace-git/ml-kraken-models/r-node-diamonds/r-scripts/scripts/runner.R ${inputParam}`;
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
    ).then((response)=> {
        console.log(response);
        resolve(response);
    })

    // const cmd = `Rscript --vanilla --quiet /app/r-scripts/scripts/runner.R ${inputParam}`;
    // const cmd = `Rscript --vanilla --quiet /Users/jwszol/Documents/workspace-git/ml-kraken-models/r-node-diamonds/r-scripts/scripts/runner.R ${inputParam}`;
    // const exec = require('child_process').exec;
    // return new Promise((resolve, reject) => {
    //     exec(cmd, (error, stdout, stderr) => {
    //         if (error) {
    //             console.warn(error);
    //         }
    //         console.log(stdout);
    //         console.log(stderr);
    //         resolve(stdout ? stdout : stderr);
    //     });
    // });

    
}
