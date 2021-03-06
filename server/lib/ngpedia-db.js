var mongoose = require('mongoose');
var uuid = require('uuid');
var ngpediaDb;
var RcgModel;
GLOBAL.SysRoles;

var defineMongooseSchema = function() {
    try {
        var FileSchema = new mongoose.Schema({
            id: String,
            title: String,
            description: String,
            filename: String,
            fileExtension: String,
            type: String,
            tags: [String],
            size: String,
            isApproved: {
                type: Boolean,
                default: false
            },
            uploadedDate: {
                type: Date,
                default: Date.now
            }
        });
        NGpediaModel = ngpediaDb.model('ngpedia', FileSchema);
    } catch (e) {
        console.log('ERROR WHILE defineMongooseSchema %s', e);
    }
};

exports.init = function(config) {
    var host = config.ngpediaDb.host || 'localhost';
    var dbName = config.ngpediaDb.dbName || 'ngpedia';
    var username = config.ngpediaDb.username || '';
    var password = config.ngpediaDb.password || '';

    //"mongodb://<user>:<password>@dharma.mongohq.com:10093/ngpedia"
    if (host === 'localhost') {
        ngpediaDb = mongoose.createConnection('mongodb://' + host + '/' + dbName);
    } else {
        ngpediaDb = mongoose.createConnection('mongodb://' + username + ':' + password + '@' + host + '/' + dbName);
    }

    ngpediaDb.on('error', function() {
        console.log("FAILED CREATE A MONGO CONNECTION");
    });
    defineMongooseSchema();
    //sets the system roles in memory;
    setSystemRoles();
    console.log('ngpedia-db init()');
};

//insert a ngpedia file
exports.insertFile = function(file, callback) {
    file.id = file.id || uuid.v4();
    var ngpediaModel = new NGpediaModel(file);
    ngpediaModel.save(function(err, object) {
        callback && callback(err, object);
    });
};

exports.getAllFiles = function(query, callback) {

    var property, pageCount = 0,
        pageNumber = 0,
        realQuery = {}, includes = {};

    for (property in query) {
        switch (property) {
            case 'PageCount':
                pageCount = query[property] || 100;
                break;
            case 'PageNumber':
                pageNumber = query[property] || 1;
                break;
        }
    }

    var skipRecords = pageCount * (pageNumber - 1);

    NGpediaModel.find(realQuery, includes, {
        skip: ((skipRecords === -1) ? 0 : skipRecords),
        limit: pageCount,
        sort: {
            'uploadedDate': -1
        }
    }, callback);
}

//internal method

function setSystemRoles() {
    GLOBAL.SysRoles = [{
        "OWNER": {
            "id": 1,
            "description": "Owner"
        }
    }, {
        "ADMIN": {
            "id": 2,
            "description": "Admin"
        }
    }, {
        "HOST": {
            "id": 3,
            "description": "Host"
        }
    }];

    console.log('Initialize SysRoles:\n' + GLOBAL.SysRoles);
}