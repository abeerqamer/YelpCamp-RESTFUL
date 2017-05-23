var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var passport = require("passport");
var methodOverride = require("method-override");
var localStrategy = require("passport-local");
var User = require("./models/user");
var Comment = require("./models/comment");

var commentRoutes    = require("./routes/comments"),
    authRoutes       = require("./routes/auth"),
    campgroundRoutes = require("./routes/campgrounds")

var seedDB = require("./seed")

mongoose.Promise = global.Promise;

app.set("view engine","ejs")

// seedDB();

mongoose.connect("mongodb://localhost/yelp2");


app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({

  secret:"this is yelpcamp",
  resave: false,
  saveUninitialized: false



}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){

  res.locals.current_user = req.user;
  next();

});





app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comment",commentRoutes);
app.use("/",authRoutes);


app.listen(27017,function(){
   
   console.log("I'm here !!!");
   
    
});