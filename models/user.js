var mongoose = require("mongoose");
var passport_local_mongoose = require("passport-local-mongoose");


var user_schema = mongoose.Schema({

	username:String,
	password:String


});



user_schema.plugin(passport_local_mongoose);
module.exports = mongoose.model("User",user_schema);