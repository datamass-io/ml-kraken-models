'use strict';

var modelService = require('../../../services/run-model.service');


module.exports = function (router) {
    router.get('/',getRunner);
    router.post('/',postRunner);
}


function postRunner(req, res) {
    modelService.runModel(req.body).then(results => {
        res.send(`{ results: ${results} }`);
    });
}


function getRunner(req, res) {

    modelService.runModel(req.body).then(results => {
        res.send(results);
    });
}
