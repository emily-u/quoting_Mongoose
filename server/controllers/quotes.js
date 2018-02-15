let mongoose = require('mongoose');
var Quote = mongoose.model('Quote');
var dateFormat = require('dateformat');

module.exports={
    show:(req,res)=>{
        Quote.find({}, function(err, results){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                console.log(results);
                res.render('index', {data: results});
            }
        })
    },
    create:(req,res)=>{
        console.log(req.body);
        let new_Quote = new Quote(req.body);
        new_Quote.save(function(err, results){
        if(err){
            console.log(err);
            // res.send(err);
            res.render('index', {errors: new_Quote.errors})
        }else{
            console.log(results);
            res.redirect('/quotes');
        }
    })
    },
    show2:(req,res)=>{
        Quote.find({}).sort({createdAt: "desc"}).exec(function(err, quote) {
            if(err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.render('quotes', {data: quote});
            }
        })
    }
    
}