var db = require('./ngpedia-db');
var randomstring = require("randomstring");

var randomToken = function() {
	return randomstring.generate(7);
}

exports.randomToken = randomToken();

exports.heartbeat = function() {
	return "ngpedia-API: Running";
}
exports.upload = function(file, data, callback) {
	console.log(file);
	console.log(data);
	callback && callback(null, "upload done");
}

exports.approve = function(json, callback) {
	callback && callback(null, "file is here");
}

exports.search = function(json, callback) {
	var searchResult = [{
		"FileName": "File1",
		"FileType": ".txt",
		"Tag": "KBM Doc",
		"Description": "KBM Template description",
		"DateTime": "10/17-2013 03:18:00:00"
	}, {
		"FileName": "File2",
		"FileType": ".txt",
		"Tag": "EHR Doc",
		"Description": "EHR Report description",
		"DateTime": "10/17-2013 03:18:00:00"
	}];

	callback && callback(null, searchResult);
}

exports.getAllfiles = function(json, callback) {
	var searchResult = [{
		"FileName": "File1",
		"FileType": ".txt",
		"Tag": "KBM Doc",
		"Description": "KBM Template description",
		"DateTime": "10/17-2013 03:18:00:00"
	}, {
		"FileName": "File2",
		"FileType": ".txt",
		"Tag": "EHR Doc",
		"Description": "EHR Report description",
		"DateTime": "10/17-2013 03:18:00:00"
	}];

	callback && callback(null, searchResult);
}

exports.getfile = function(json, callback) {
	callback && callback(null, "file is here");
}