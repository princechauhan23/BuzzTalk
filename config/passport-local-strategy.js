const User = require("../models/user");


const passport = require("passport");


const LocalStrategy = require("passport-local").Strategy;

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: "email"
    },
    function(email, password, done){
        User.findOne({email: email}, function(err, user){
            if (err){
                console.log("Error in finding user --> Passport");
                return done(err);
            }

            if(!user || user.password != password){
                console.log("invalid Username/password");
                return done(null, false);
            }

            return done(null, user);
        });
    }
));



// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done){
     done(null, user.id);
});

// deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done){
    // console.log(id)
    User.findById(id, function(err, user){
        if(err){
            console.log("Error in finding the user  --> passport");
            return done(err);
        }

        return done(null, user);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    };

    // if the user is not signed in 
    return res.redirect("/users/sign-in");

};
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // console.log(req.cookies)
        // req.user contains the currunt signed in user froomthe session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user
    }
    next();

}

module.exports = passport;