'use strict';


module.exports = function (router) {

    var jsonObjectTest = {"asd":"aaaa"}

    router.get('/', function (req, res) {
        
        res.send(jsonObjectTest);
    });

};
