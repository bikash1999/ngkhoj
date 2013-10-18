var db = require('./ngpedia-db');
var ngSocket = require('./ngpedia-socket');
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

	var filenameWithOutExtension = reqfile.file.name.substr(0, reqfile.file.name.lastIndexOf('.')) || reqfile.file.name;
	var extn = getExtension(reqfile.file.name);

	fileInfo.id = uuid.v4();
	fileInfo.title = data.title ? data.title : filenameWithOutExtension;
	fileInfo.tagsCsv = data.tags;
	fileInfo.description = data.description ? data.description : filenameWithOutExtension;;
	fileInfo.filename = reqfile.file.name;
	fileInfo.fileExtension = extn;
	fileInfo.type = reqfile.file.type;
	fileInfo.size = reqfile.file.size;

	console.log("File information to be uploaded:\n" + fileInfo);


	fs.readFile(reqfile.file.path, function(err, data) {
		if (err) {
			callback && callback(err, null);
			return;
		}
		var newPath = uploadPath + fileInfo.id + fileInfo.fileExtension;

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
					//ngSocket.sendNotificationForApproval("1", res);
					callback && callback(err, res);
				});

			});

		});
	});
}

function getExtension(filename) {
	var i = filename.lastIndexOf('.');
	return (i < 0) ? '' : filename.substr(i);
}

function postToSolr(fileInfo, filePath, callback) {
	var uri = 'http://qsih-00073.portal01.nextgen.com:8983/solr/update/extract?literal.id=' + fileInfo.id + '&captureAttr=true&defaultField=text&fmap.div=foo_t&capture=div&commit=true&literal.category=' + fileInfo.tagsCsv + '&literal.title=' + fileInfo.title + '&literal.description=' + fileInfo.description + '&literal.file_extension=' + fileInfo.fileExtension;
	fs.stat(filePath, function(err, stats) {
		restler.post(uri, {
			multipart: true,
			data: {
				"myfile": restler.file(filePath, null, stats.size, null, stats.type)
			}
		}).on("complete", function(data) {
			console.log("Solr POST done\n" + data);
			callback && callback(null, data);
		});
	});
}

function searchFromSolr(keyword, callback) {
	var uri = 'http://qsih-00073.portal01.nextgen.com:8983/solr/collection1/select?q=' + keyword + '&wt=json&indent=true';
	restler.get(uri).on('complete', function(data) {
		callback && callback(null, data);
	});
}

exports.approve = function(json, callback) {
	callback && callback(null, "file is here");
}

exports.search = function(keyword, callback) {

	var searchResult = [];
	console.log('searching keyword:\n' + keyword);
	searchFromSolr(keyword, function(err, data) {
		var json = JSON.parse(data);
		if (json.response.docs) {
			var docs = json.response.docs;
			makeSearchResult(docs.slice(), searchResult, function() {
				console.log('keyword searched:"%s" result found: "%s"' + searchResult.length, keyword);
				callback && callback(null, searchResult);
			});
		};
	});
}

function makeSearchResult(docs, results, cb) {
	var doc = docs.pop();
	if (doc) {
		var result = {
			"id": doc.id,
			"url": "uploads/" + doc.id + "" + doc.file_extension,
			"extension": doc.file_extension,
			"description": doc.description ? doc.description : "",
			"content_type": doc.content_type[0],
			"dateTime": doc.last_modified,
			"author": doc.author
		};
		results.push(result);
		makeSearchResult(docs, results, cb);
	} else {
		cb && cb();
	};
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