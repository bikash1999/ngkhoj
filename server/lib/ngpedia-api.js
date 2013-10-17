var db = require('./ngpedia-db');
var randomstring = require("randomstring");

var randomToken = function(){
    return randomstring.generate(7);
}

exports.randomToken = randomToken();

exports.heartbeat = function(){
	return "ngpedia-API: Running";
}
exports.upload = function(json, callback){
	callback && callback(null, "upload done");
}

exports.approve = function(json, callback){
    callback && callback(null, "file is here");
}

exports.search = function(json, callback){
    callback && callback(null, "search done");
}

exports.getfile = function(json, callback){
    callback && callback(null, "file is here");
}