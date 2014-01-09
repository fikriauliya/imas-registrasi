
/*
 * GET home page.
 */

var mongoose = require('mongoose');
var registrationSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String
});
var Registration = mongoose.model("Registration", registrationSchema);

exports.index = function(req, res){
  Registration.find(function(err, registrations) {
    res.render('index', { title: 'Registrasi Saung Istiqomah', 'registrations': JSON.stringify(registrations)});
  })
};