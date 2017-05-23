var express = require("express");

var router = express.Router();

var Campground = require("../models/campground")



router.get("/",function(req,res){



  Campground.find({},function(err,allCamps){

    if(err){

      console.log("something bad has happened error 404")

    }else{

         res.render("index",{campground:allCamps})

    }



  });


 
   
    
});

router.post("/",isLoggedIn,function(req,res){
   
   console.log(req.user);
  
   
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;

   var author = {

      id: req.user._id,
      username:req.user.username


   }
   
   var new_campground = {name: name,image: image,description:desc,author:author}

   Campground.create(new_campground,function(err,campground){

      if(err){

        console.log("something went wrong")

      }else{


          console.log(campground)
          res.redirect("/campground")
   
      }


   });
   
   
   
    
});

router.get("/new",isLoggedIn,function(req,res){
   
  
  res.render("new"); 
  
   
    
});



// show will show a campground with thier unique id


router.get("/:id",function(req,res){

  
  Campground.findById(req.params.id).populate("comments").exec(function(err,found_camp){


    if(err){

      console.log(err);
    }else{


    	console.log(found_camp)
        res.render("show",{campground:found_camp})

    }

  });






});


// EDIT ROUTE
router.get("/:id/edit",checkAuthorization,function(req,res){




    Campground.findById(req.params.id,function(err,campground){


           res.render("edit",{campground:campground})
        
       
    });


 
  
});




// UPDATE CAMPGROUDN ROUTE
router.put("/:id",checkAuthorization,function(req,res){

  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){

    if(err){

      res.redirect("/campground");
    }else{

      res.redirect("/campground/"+req.params.id);
    }


  })

  


});

//DELETE CAMPGRUND ROUTE
router.delete("/:id",checkAuthorization,function(req,res){

  Campground.findByIdAndRemove(req.params.id,function(err){

    if(err){

       res.redirect("/campground")
    }else{

       res.redirect("/campground")
    }


  });

   


});






function checkAuthorization(req,res,next){

    if(req.isAuthenticated()){


      Campground.findById(req.params.id,function(err,campground){

      if(err){

        console.log(err);
        res.redirect("/campground")
      }else{

          if(campground.author.id.equals(req.user._id)){

             next();
          }else{

            res.redirect("back")
          }

         
      }


    });

  }else{

        res.redirect("back")
  }

  
}





// MIDDLEWARE
function isLoggedIn(req,res,next){

  if(req.isAuthenticated()){

    return next();
  }

  res.redirect("/login")

}


module.exports = router;
