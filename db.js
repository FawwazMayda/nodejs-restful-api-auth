var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/redix')

mongoose.connection.on('connected', function(){
  console.log("Abang Bola")
});