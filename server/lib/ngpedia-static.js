var nodeStatic = require('node-static');
var server = null,
	config = {},
    count = 0;
    
var me = this;
exports.init = function(config, callback){
	console.log('ngpedia-static init()');
	me.config = config;

	callback && callback();
};

exports.listen = function(server){
	console.log('ngpedia-static listen()');
	me.server = server;
	
	var file = new (nodeStatic.Server)(me.config.webroot,{
		cache: false,
		headers:{"X-Powered-By": "ngpedia-static",
			"Pragma": "no-cache",
			"Cache-Control": "no-cache"
		}
	});

    server.get('/web/Index.html', function(req, res, next){
        count += 1;
        //console.log(req);
        next();
    });
	server.get(/^\/web\//, function(req, res, next){        
		req.on('end', function(){
			//console.log('request url: ' + req.url);
			file.serve(req, res, function(err, result){
				if (err) {
					res.writeHead(err.status, err.headers);
					res.end();
				};
			});
		});
	});

//listen ends//
};