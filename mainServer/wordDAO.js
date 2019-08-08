var db = require('./database');
var word_db;

var wordDAO = {};

wordDAO.createDb = async function(){
    if(word_db == undefined)
        word_db = await db.getDb();
}

wordDAO.getAllWords = async function(){
    var words = new Array();
    words = await word_db.collection('words').find({},{_id:false}).toArray();
    return words;
    
}

wordDAO.getTestWords = async function(){
    var words =  await word_db.collection('words').find({},{_id:false}).toArray();
    var count = await words.length;
    var index = new Array();
    var testWord  = new Array();
    var random;

    for(var i=0; i<5; i++){
        random = Math.floor(Math.random()*count);

        if(index.indexOf(random) == -1){
            index[i]= random;
            testWord[i] = words[random];
        }
        else
            i--;
    }
    console.log(testWord);

    return testWord;
}

module.exports = wordDAO;
