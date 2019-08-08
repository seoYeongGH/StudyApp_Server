var express = require('express');
var userDao = require('./userDAO');
var router = express.Router();

var responseData = {
    code: undefined
}
router.post('/', async function (req, res) {
    await userDao.createDb();

    var nameNull = await userDao.nameNull(req.body.name);
    var idNull = await userDao.idNull(req.body.id);
    
    if(nameNull == false){
        responseData.code = 3;
    }
    else if(idNull == false){
        responseData.code = 4;

    }
    else{
        responseData.code = 0;
        userDao.saveInfo(req.body);
    }
    res.send(responseData);
});
module.exports = router;