var express = require("express");

var router = express.Router();

var User = require("../models/user")

var passport = require("passport")



router.get("/",function(req,res){
   
   res.render("yelp");
   
    
});



// to handle sign up part

router.get("/register",function(req,res){

  res.render("register")


});


router.post("/register",function(req,res){

  var new_user = new User({username: req.body.username});
  User.register(new_user,req.body.password,function(err,body){

      if(err){

        console.log(err)
        return res.render("register")
      }else{

        passport.authenticate("local")(req,res,function(){

            res.redirect("/campground")

        });
      }


  });


});


// LOGIN PART

router.get("/login",function(req,res){

  res.render("login");

});

router.post("/login",passport.authenticate("local",{

    successRedirect: "/campground",
    failureRedirect: "/login"

}),function(req,res){





});

//LOG OUT LOGIC
router.get("/logout",function(req,res){


    req.logout();
    res.redirect("/campground");



});

// middleware for checking if user is logged in or not
function isLoggedIn(req,res,next){

  if(req.isAuthenticated()){

    return next();
  }

  res.redirect("/login")

}


module.exports = router;

