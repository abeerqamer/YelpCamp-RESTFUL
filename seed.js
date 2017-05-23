
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");




var data = [


	{
		name:"abeer's place",
		image:"https://farm9.staticflickr.com/8086/8500579154_5350408dc9.jpg",
		description:"packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	},
	{
		name:"mother's inn",
		image:"https://farm3.staticflickr.com/2950/15232292419_e3b1846217.jpg",
		description:"packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	},
	{
		name:"frere hall",
		image:"https://farm4.staticflickr.com/3953/15613249585_d1e45f2ee5.jpg",
		description:"packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	}



]


function seedDB() {

	
	Campground.remove({},function(err){


	// 	if(err){

	// 		console.log(err);
	// 	}

	// 	console.log("removed");

	// 	data.forEach(function(seed){


	// 	Campground.create(seed,function(err,campground){

	// 		if(err){

	// 			console.log(err);
	// 		}

	// 		console.log("added");
	// 		Comment.create({

	// 			text:"this is awesome cannot believe I was here",
	// 			author:"abeer qamer"
	// 		},function(err,comment){

	// 			if(err){
	// 				console.log(err);
	// 			}
	// 			else{



	// 				campground.comments.push(comment);
	// 				campground.save();
	// 				console.log("comment created")


	// 			}


				

	// 		});


	// 	});


	// });






	});






	
}

module.exports = seedDB;