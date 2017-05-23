var express = require("express");

var router = express.Router({mergeParams:true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");





// COMMENT ROUTES
router.get("/new",isLoggedIn,function(req,res){

	Campground.findById(req.params.id,function(err,campground){

		if(err){

			console.log(err);
		}else{

			res.render("new_comment",{campground:campground})
		}


	});
	


});


router.post("/",isLoggedIn,function(req,res){

	Campground.findById(req.params.id,function(err,campground){

		if(err){

			console.log(err);
			res.redirect("/campground")
		}else{

			Comment.create(req.body.comment,function(err,comment){

				if(err){

					console.log(err);
				}else{

					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					
					comment.save();

					//save author

					campground.comments.push(comment);
					campground.save();
					res.redirect("/campground/" +campground._id)
				}

			});

		}

	});


});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit",function(req,res){

	Comment.findById(req.params.comment_id,function(err,foundComment){

		if(err){

			res.redirect("back")
		}else{

			res.render("edit_comment",{campground_id:req.params.id,comment:foundComment});
		}


	});

  


});

//COMMENT UPDATE ROUTE
router.put("/:comment_id",function(req,res){

	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){

		if(err){

			res.redirect("back");
		}else{

			res.redirect("/campground/" +req.params.id);
		}


	});

});


function isLoggedIn(req,res,next){

  if(req.isAuthenticated()){

    return next();
  }

  res.redirect("/login")

}

module.exports = router;
