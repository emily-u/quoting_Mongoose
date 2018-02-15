let mongoose = require('mongoose');

let QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2},
    quote: { type: String, required: true, minlength: 6, maxlength: 500}
}, {timestamps: true})

// mongoose.model("User", UserSchema);
// let User = mongoose.model("User");

let Quote = mongoose.model("Quote", QuoteSchema);