var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/redix')

mongoose.connection.on('connected', function(){
  console.log("Abang Bola")
});

//try {
    //await mongoose.connect('mongodb+srv://m001-student:abangbola@sandbox-wtclz.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
  //} catch (error) {
    //handleError(error);
  //}