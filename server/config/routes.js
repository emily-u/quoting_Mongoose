var quotes = require('../controllers/quotes.js');
module.exports = function(app){
    app.get('/',(req,res)=>{
        quotes.show(req,res)
    })
    app.post('/submit',(req,res)=>{
        quotes.create(req,res)
    })
    app.get('/quotes',(req,res)=>{
        quotes.show2(req,res)
    })
}