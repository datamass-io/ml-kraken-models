'use strict';

var modelService = require('../../../services/run-model.service');

// MDB-core-api (AWS-dev)
// Acxiom.web-v3 (AWS-dev)

module.exports = function (router) {
    router.get('/',getRunner);
    router.post('/',postRunner);
}


function postRunner(req, res) {
    modelService.runModel(req.body).then(results => {
        res.send(JSON.parse(`{ "results": ${results} }`));
    });
}


function getRunner(req, res) {

    modelService.runModel(req.body).then(results => {
        res.send(results);
    });
}
