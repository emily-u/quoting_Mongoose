let mongoose = require('mongoose');
let fs = require('fs');
let path = require('path');
mongoose.connect('mongodb://localhost/quotingDojoDB');
mongoose.Promise = global.Promise;

let models_path = path.join(__dirname,'../models');
fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
      // require the file (this runs the model file which registers the schema)
      require(models_path + '/' + file);
    }
  });

