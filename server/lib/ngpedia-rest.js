var ngpediaApi = require('./ngpedia-api');

var server = null,
	config = {};

var me = this;
exports.init = function(config, callback){
	console.log('ngpedia-rest init()');
	me.config = config;

	callback && callback();
};

exports.listen = function(server){
	console.log('ngpedia-rest listen()');
	me.server = server;

	//Heartbeat service
	me.server.get('/api/heartbeat', function(req, res){
		res.json(ngpediaApi.heartbeat());		
	});
    //authenticate user
	me.server.post('/api/file/upload', function(req, res){
        console.log(req.body);
        console.log(req.files);
		ngpediaApi.upload(req.files, req.body, function(err, data){
			if (!err) {
				res.json(data);
			} else{
				res.send(500, "ngpedia SERVER ERROR OCCURED: /api/upload :\n" + err);
			}
			
		});
	}); 

    me.server.post('/api/file/:id/approve', function(req, res){
        ngpediaApi.approve(req.body, function(err, data){
            if (!err) {
                res.json(data);
            } else{
                res.send(500, "ngpedia SERVER ERROR OCCURED: /api/approve :\n" + err);
            }
            
        });
    });     

    me.server.get('/api/files', function(req, res){
        ngpediaApi.getAllfiles(req.body, function(err, data){
            if (!err) {
                res.json(data);
            } else{
                res.send(500, "ngpedia SERVER ERROR OCCURED: /api/getfile :\n" + err);
            }
            
        });
    });  

    me.server.get('/api/file/search', function(req, res){
        ngpediaApi.search(req.body, function(err, data){
            if (!err) {
                res.json(data);
            } else{
                res.send(500, "ngpedia SERVER ERROR OCCURED: /api/search :\n" + err);
            }
            
        });
    });    
};

