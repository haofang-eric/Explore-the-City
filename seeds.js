var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://cn.opendesktop.org/img/7/f/c/c/f0ac7ca03719850262ff9b213b6c46c5ca4f.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "http://wallpapertop.net/wp-content/uploads/2018/02/Camping%20Ultra%20HD%20Wallpaper.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://images.wallpaperscraft.com/image/trees_forest_vans_camping_111480_3840x2400.jpg",
        description: "blah blah blah"
    },
    
    {
        name: "Magic Sunset", 
        image: "http://mynatour.org/sites/default/files/field/image/blog_post/Holiday-camping.jpg",
        description: "blah blah blah"
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;