
/*
 * GET home page.
 */

var mongoose = require('mongoose');
var registrationSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  attending: {type: Boolean, default: false}
});
var Registration = mongoose.model("Registration", registrationSchema);

exports.index = function(req, res){
  Registration.find(function(err, registrations) {
    res.render('index', { title: 'Registrasi Saung Istiqomah', 'registrations': JSON.stringify(registrations)});
  })
};

exports.update = function(req, res){
  Registration.update({_id: req.body._id}, {attending: req.body.attending}, function (err, numberAffected, raw){
    ret = {};
    if (err === null) { ret.status = "updated";} 
    else { ret.status = "error"; }

    ret.new_value = req.body.attending;
    
    res.contentType('json');
    res.send(JSON.stringify(ret));
  });
};