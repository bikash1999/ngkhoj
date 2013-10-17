var mongoose= require('mongoose');
var uuid = require('uuid');
var ngpediaDb;
var RcgModel;
GLOBAL.SysRoles;
 
var defineMongooseSchema = function(){
    try {
        var RoleSchema = new mongoose.Schema({
            id:String,
			description:String
		});
        var UserSchema = new mongoose.Schema({
            id:String,
            rcgId: String,
            userName:String,
			password:String,
            role:  {type: mongoose.Schema.ObjectId, ref: 'RoleSchema'},
            active:Boolean,
            createDate:  { type: Date, default: Date.now },
		});
        var RestaurantSchema = new mongoose.Schema({
            id:String,
            rcgId: String,
            name:String,
            address1:String,
            address2:String,
            location:String,
            reservationNumber:String,
            email: String,
            createDate:  { type: Date, default: Date.now },
		});
		var RcgSchema = new mongoose.Schema({
			id: String,
			users: [UserSchema],
            restaurant: {type: mongoose.Schema.ObjectId, ref: 'RestaurantSchema'},
            createDate:  { type: Date, default: Date.now },
		});
		RcgModel = ngpediaDb.model('ngpedia', RcgSchema);        
	} catch (e) {
		console.log('ERROR WHILE defineMongooseSchema %s', e);
	}
};
 
exports.init= function (config) {
    var host = config.ngpediaDb.host || 'localhost';
    var dbName = config.ngpediaDb.dbName || 'ngpedia';
    var username = config.ngpediaDb.username || '';
    var password = config.ngpediaDb.password || '';
 
    //"mongodb://<user>:<password>@dharma.mongohq.com:10093/ngpedia"
    if (host === 'localhost') {
        ngpediaDb = mongoose.createConnection('mongodb://'+ host + '/' + dbName);
    }else {
        ngpediaDb = mongoose.createConnection('mongodb://'+ username + ':' + password + '@'+ host + '/' + dbName);
    }
    
    ngpediaDb.on('error', function () {
        console.log("FAILED CREATE A MONGO CONNECTION");
    });
    defineMongooseSchema();
    //sets the system roles in memory;
    setSystemRoles();
    console.log('ngpedia-db init()');
};
//get User document by user name
exports.getUserByUserName = function(data, callback){
    callback && callback(null, data);
};

//insert a ngpedia 
exports.insertRcg = function(ngpedia, callback){
    ngpedia.id = ngpedia.id || ngpedia.v4();
    var rcgModel = new RcgModel(ngpedia);    
    rcgModel.save(function(err, object) {	
        callback && callback(err, object);
	});    
};

//insert a user
exports.insertUser = function(rcgId, user, callback){    
    RcgModel.findOne({
        'id': rcgId
	}, function(err, rcgObject) {
        
        user.id = user.id || uuid.v4();
        user.rcgId = user.rcgId || rcgId;
		rcgObject.users.push(user);
        
        var rcgModel = new RcgModel(rcgObject);            
        rcgModel.save(function(err, object) {    
            callback && callback(err, object);
        }); 
	});    
};

//insert a resturant
exports.insertResturant = function(rcgId, resturant, callback){    
    RcgModel.findOne({
        'id': rcgId
    }, function(err, rcgObject) {
        
        resturant.id = resturant.id || uuid.v4();
        resturant.rcgId = resturant.rcgId || rcgId;
		rcgObject.restaurant = resturant;
        
        var rcgModel = new RcgModel(rcgObject);            
        rcgModel.save(function(err, object) {    
            callback && callback(err, object);
        }); 
	});    
};

//internal method
function setSystemRoles(){
    GLOBAL.SysRoles = [
    {"OWNER": {
        "id": 1,
		"description": "Owner"
	}},
    {"ADMIN": {
        "id": 2,
        "description": "Admin"
	}},
    {"HOST": {
        "id": 3,
        "description": "Host"
	}}];
    
    console.log('Initialize SysRoles:\n' + GLOBAL.SysRoles);
}