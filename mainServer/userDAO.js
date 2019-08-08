var db = require('./database');
var user_db;

var userDAO = {};

userDAO.createDb = async function(){
    if(user_db == undefined){
        user_db = await db.getDb();
    }
}

userDAO.nameNull = async function (name) { 
    var data = await user_db.collection('userInfo').findOne({ name: name });
    return isNull(data);  
}

userDAO.idNull = async function(id){
    var data = await user_db.collection('userInfo').findOne({id:id});
    return isNull(data);
}

userDAO.saveInfo = async function(userData){
    await user_db.collection('userInfo').save(userData, function(err,data){
        if(err)
        console.log('err'+err);
    });
}

userDAO.examPw = async function(id ,pw){
    var dbPw = await user_db.collection('userInfo').findOne({id:id},{password:true});
    
    if(pw == dbPw.password)
        return true;
    else
        return false;
}

userDAO.findData = async function(name,email){
    var id = await user_db.collection('userInfo').findOne({name:name, email:email},{id:true, password:true});
    return id;
}

module.exports = userDAO;

function isNull(data){
    if(data == null)
        flag = true;
    else
        flag = false;

    return flag;
}

