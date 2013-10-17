var db = require('./ngpedia-db');
var randomstring = require("randomstring");
var uuid = require('uuid');
var fs = require('fs');
var restler = require('restler');

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
	fileInfo.tagsCsv = data.tags;
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
	var uri = 'http://qsih-00073.portal01.nextgen.com:8983/solr/update/extract?literal.id=' + fileInfo.id + '&captureAttr=true&defaultField=text&fmap.div=foo_t&capture=div&literal.category=' + fileInfo.tagsCsv + '&literal.title=' + fileInfo.title + '&literal.description=' + fileInfo.description;
	fs.stat(filePath, function(err, stats) {
		restler.post(uri, {
			multipart: true,
			data: {
				"myfile": restler.file(filePath, null, stats.size, null, stats.type)
			}
		}).on("complete", function(data) {
			console.log(data);
			callback && callback(null, data);
		});
	});
}

exports.approve = function(json, callback) {
	callback && callback(null, "file is here");
}

exports.search = function(keyword, callback) {


	searchFromSolr(keyword, function(err, res) {
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
	});


}

function searchFromSolr(keyword, callback) {
	var uri = 'http://qsih-00073.portal01.nextgen.com:8983/solr/collection1/select?q='+ keyword + '&df=attr_content&wt=json&indent=true';
	restler.get(uri).on('complete', function(data) {
		console.log(data);
		callback && callback(null, data);
	});
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