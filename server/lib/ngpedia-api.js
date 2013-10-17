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
	var fileInfo = {};
	fileInfo.title = data.title;
	fileInfo.description = data.description;
	fileInfo.filename = data.filename;

	db.insertFile(fileInfo, function(err, res) {
		callback && callback(err, res);
	});


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

exports.getAllfiles = function(searchTerms, callback) {
	var searchResult;
	var results = [];
	db.getAllFiles(searchTerms,
		function(err) { // error
			callback && callback(err, searchResult);
		},
		function(matchingDocument) { // stream the results
			results.push(matchingDocument);
		},
		function() { // on close or end of results
			searchResult = {};
			searchResult.aaData = results;
			callback && callback(null, searchResult);
		});

	// var searchResult = {
	// 	"aaData": [{
	// 		"FileName": "File1",
	// 		"FileType": ".txt",
	// 		"Tag": "KBM Doc",
	// 		"Description": "KBM Template description",
	// 		"DateTime": "10/17-2013 03:18:00:00"
	// 	}, {
	// 		"FileName": "File2",
	// 		"FileType": ".txt",
	// 		"Tag": "EHR Doc",
	// 		"Description": "EHR Report description",
	// 		"DateTime": "10/17-2013 03:18:00:00"
	// 	}]
	// };	
}

exports.getfile = function(json, callback) {
	callback && callback(null, "file is here");
}