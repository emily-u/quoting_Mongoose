// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
var dateFormat = require('dateformat');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// ===============================



// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quotingDojoDB');
mongoose.Promise = global.Promise;


let QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2},
    quote: { type: String, required: true, minlength: 6, maxlength: 500}
}, {timestamps: true})

// mongoose.model("User", UserSchema);
// let User = mongoose.model("User");

let Quote = mongoose.model("Quote", QuoteSchema);
// ==============================




// ===== ROUTES! ======
app.get('/', function(req, res){
    Quote.find({}, function(err, results){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(results);
            res.render('index', {data: results});
        }
    })
})

app.post('/submit', function(req, res){
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
})

app.get('/quotes', function(req, res){
    Quote.find({}).sort({createdAt: "desc"}).exec(function(err, quote) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.render('quotes', {data: quote});
        }
    })
})
    // Quote.find({}, function(err, results){
    //     if(err){
    //         console.log(err);
    //         res.send(err);
    //     }else{
    //         console.log(results);
    //         res.render('quotes', {data: results});
    //     }
    // })
// })
// ======================




// ==== SERVER LISTENER! =======
app.listen(8000, function(){
    console.log("Express on port 8000!")
});
// =============================




// ======= HERE BE DRAGONS (or possibly socket code) ========

// ==========================================================