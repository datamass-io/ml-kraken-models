
var Promise = require('promise');
const uuid = require('uuid');
const request = require('request')

module.exports = {
    runModel:runModel,
}


function runModel(inputData) {

    let modelData = inputData.modelData;
    let metaData = (inputData.metaData);

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
            reject(error);
        }
        console.log(`statusCode: ${res.statusCode}`);
        console.log(body);
        resolve();
        })
    }).then(() => {
        const cmd = `python ./py-scripts/scripts/runner.py ${"'" + JSON.stringify(modelData) + "'"}`;
        const exec = require('child_process').exec;
        return new Promise((resolve, reject) => {
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.warn(error);
                    reject(error);
                }
                console.log(stdout);
                console.log(stderr);
                resolve(stdout ? stdout : stderr);
            });
        });
        }
    ).then((response)=> {
        console.log(response);
        return new Promise((resolve, reject) => {
            request.post('https://r2bp2xn5b2.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-action-log', {
                json: {
                    modelId: metaData.modelId,
                    actionId: actionId,
                    actionType: 'RESPONSE',
                    body: response
                }
            }, (error, res, body) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                console.log(`statusCode: ${res.statusCode}`);
                console.log(body);
                resolve(response);
            });
        });
    });
}
