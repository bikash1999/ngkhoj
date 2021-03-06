var ngpediaApi = require('./ngpedia-api');

var server = null,
    config = {};

var me = this;
exports.init = function(config, callback) {
    console.log('ngpedia-rest init()');
    me.config = config;

    callback && callback();
};

exports.listen = function(server) {
    console.log('ngpedia-rest listen()');
    me.server = server;

    //Heartbeat service
    me.server.get('/api/heartbeat', function(req, res) {
        res.json(ngpediaApi.heartbeat());
    });
    //authenticate user
    me.server.post('/api/file/upload', function(req, res) {
        ngpediaApi.upload(req.files, req.body, me.config.uploadPath, function(err, data) {
            if (!err) {
                res.json(data);
            } else {
                res.send(500, "ngpedia SERVER ERROR OCCURED: /api/upload :\n" + err);
            }

        });
    });

    me.server.post('/api/file/:id/approve', function(req, res) {
        ngpediaApi.approve(req.body, function(err, data) {
            if (!err) {
                res.json(data);
            } else {
                res.send(500, "ngpedia SERVER ERROR OCCURED: /api/approve :\n" + err);
            }

        });
    });

    me.server.get('/api/files', function(req, res) {
        ngpediaApi.getAllfiles(req.query, function(err, data) {
            if (!err) {
                res.json(data);
            } else {
                res.send(500, "ngpedia SERVER ERROR OCCURED: /api/getfile :\n" + err);
            }

        });
    });

    me.server.get('/api/file/search', function(req, res) {
        console.log(req.query['keyword']);
        ngpediaApi.search(req.query['keyword'], function(err, data) {
            if (!err) {
                res.json(data);
            } else {
                res.send(500, "ngpedia SERVER ERROR OCCURED: /api/search :\n" + err);
            }

        });
    });
};