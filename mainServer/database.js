var database = {};

const mongo = require('mongodb').MongoClient;
var s_db;

mongo.connect('mongodb://127.0.0.1:27017/studyDB',function(err,db){
    if (err){
        console.log('err' + err);
    }
    else {
        s_db = db;
    }
});


database.getDb = async function() {
        return s_db;
}

module.exports = database;
