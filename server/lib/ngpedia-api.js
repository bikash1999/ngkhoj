var db = require('./ngpedia-db');
var randomstring = require("randomstring");
var uuid = require('uuid');
var fs = require('fs');
var request = require('request');

var randomToken = function() {
	return randomstring.generate(7);
}

exports.randomToken = randomToken();

exports.heartbeat = function() {
	return "ngpedia-API: Running";
}
exports.upload = function(reqfile, data, uploadPath, callback) {
	var fileInfo = {};
	fileInfo.title = data.title;
	fileInfo.description = data.description;
	fileInfo.filename = data.filename;
	fileInfo.id = uuid.v4();


	fs.readFile(reqfile.file.path, function(err, data) {
		if (err) {
			callback && callback(err, null);
			return;
		}
		var newPath = uploadPath + fileInfo.id + ".docx";

		fs.writeFile(newPath, data, function(err) {
			if (err) {
				callback && callback(err, null);
				return;
			}

			postToSolr(fileInfo, newPath, function(err, res) {

				if (err) {
					callback && callback(err, null);
					return;
				}

				db.insertFile(fileInfo, function(err, res) {
					callback && callback(err, res);
				});

			});



		});
	});
}

function postToSolr(fileInfo, filePath, callback) {
	var r = request.post('http://qsih-00073.portal01.nextgen.com/:8983/solr/update/extract?literal.id=<UniqueID>&captureAttr=true&defaultField=text&fmap.div=foo_t&capture=div&literal.category=<Tag1,Tag2>');

	var form = r.form();
	form.append('myfile', fs.createReadStream(filePath));

	callback && callback(err, null);

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
}

exports.getfile = function(json, callback) {
	callback && callback(null, "file is here");
}