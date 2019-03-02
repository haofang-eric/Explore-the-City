var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),    
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // renew database content

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");   
   next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});




// app.get("/", function(req, res){
//     res.render("landing");
// });


// // ====================
// // Campgrounds ROUTES
// // ====================

// //INDEX - show all campgrounds
// app.get("/campgrounds", function(req, res){
//     Campground.find({}, function(err, allCampgrounds){
//       if(err){
//           console.log(err);
//       } else {
//           res.render("campgrounds/index",{campgrounds:allCampgrounds});
//       }
//     });    
    
// });

// //CREATE - add new campground to DB
// app.post("/campgrounds", isLoggedIn, function(req,res){
//     var name = req.body.name;
//     var image = req.body.image;
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     };    
//     var newCampground = {name:name, image:image, author:author};
    
//     Campground.create(newCampground, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to campgrounds page
//             res.redirect("/campgrounds");
//         }
//     });    
    
// });

// //NEW - show form to create new campground
// app.get("/campgrounds/new", isLoggedIn, function(req,res){
//     res.render("campgrounds/new.ejs");
// });


// // SHOW - shows more info about one campground
// app.get("/campgrounds/:id", function(req, res){
//     //find the campground with provided ID
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log(foundCampground)
//             //render show template with that campground
//             res.render("campgrounds/show", {campground: foundCampground});
//         }
//     });
// })



// // ====================
// // COMMENTS ROUTES
// // ====================

// app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
//     // find campground by id
//     Campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//              res.render("comments/new", {campground: campground});
//         }
//     })
// });

// app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
//   //lookup campground using ID
//   Campground.findById(req.params.id, function(err, campground){
//       if(err){
//           console.log(err);
//           res.redirect("/campgrounds");
//       } else {
//         Comment.create(req.body.comment, function(err, comment){
//           if(err){
//               console.log(err);
//           } else {
//               comment.author.id = req.user._id;
//               comment.author.username = req.user.username;
//               //save comment
//               comment.save();
//               campground.comments.push(comment);
//               campground.save();
//               res.redirect('/campgrounds/' + campground._id);
//           }
//         });
//       }
//   });
//   //create new comment
//   //connect new comment to campground
//   //redirect campground show page
// });


// //  ===========
// // AUTH ROUTES
// //  ===========

// // show register form
// app.get("/register", function(req, res){
//   res.render("register"); 
// });
// //handle sign up logic
// app.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//           res.redirect("/campgrounds"); 
//         });
//     });
// });


// // show login form
// app.get("/login", function(req, res){
//   res.render("login"); 
// });
// // handling login logic
// app.post("/login", passport.authenticate("local", 
//     {
//         successRedirect: "/campgrounds",
//         failureRedirect: "/login"
//     }), function(req, res){
// });

// // logout route
// app.get("/logout", function(req, res){
//   req.logout();
//   res.redirect("/campgrounds");
// });


// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }