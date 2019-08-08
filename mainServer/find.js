var express = require('express');
var userDao = require('./userDAO');
var router = express.Router();

var responseData = {
    code: undefined,
    data: undefined
}

router.post('/findId',async function(req,res){
    await userDao.createDb();

    var data = await userDao.findData(req.body.name, req.body.email);
    if(data==null){
        responseData.code = 3;
        responseData.data = null;
    }
    else{
        responseData.code = 0;
        responseData.data = data.id;
    }

    res.send(responseData);
});

router.post('/findPw',async function(req,res){
    await userDao.createDb();

    var dbId = await userDao.findData(req.body.name, req.body.email);
    if(dbId == null){
        responseData.code = 3;
        responseData.data = null;
        res.send(responseData);

        return ;
    }

    var data = await userDao.findData(req.body.name, req.body.email);
    if(req.body.id == data.id){
        responseData.code = 0;
        responseData.data = data.password;
    }
    else{
        responseData.code = 2;
        responseData.data = null;
    }
    res.send(responseData);
});

module.exports = router;
