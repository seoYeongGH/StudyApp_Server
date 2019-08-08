var express = require('express');
var session = require('express-session');
var userDao = require('./userDAO');
var router = express.Router();

var responseData = {
    code: undefined
}
router.post('/', async function (req, res) {
    await userDao.createDb();

    var idNull = await userDao.idNull(req.body.id);

    if(idNull == true){
        responseData.code = 2;
    }
    else{
        var correctPw = await userDao.examPw(req.body.id, req.body.password);
    
        if(correctPw == true){
            responseData.code = 0;
            session.key = req.body.id;
           
        }
        else{
            responseData.code = 3;
        }
}

    res.send(responseData);
});

module.exports = router;