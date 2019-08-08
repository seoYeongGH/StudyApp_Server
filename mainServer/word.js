var express = require('express');
var router = express.Router();
var wordDao = require('./wordDAO');

router.get('/study', async function (req, res) {
    await wordDao.createDb();

    var words = await wordDao.getAllWords();
    res.send(words);
});

router.get('/test',async function(req,res){
    await wordDao.createDb();

    var testWords = await wordDao.getTestWords();
    res.send(testWords);
})
module.exports = router;