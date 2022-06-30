
const LocalStrategy = require('passport-local').Strategy
const User=require('../models/user');
const bcrypt = require('bcrypt');
const user = require('../models/user');

//configuration of passport


function init(passport){
    passport.use(new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        //Logic of login

        //check if email exist 
        const user = await User.findOne({email:email});
        if(!user){
            return done(null,false,{message:'No user with this email'});
        }

        bcrypt.compare(password,user.password).then(match=>{
            if(match){
                return done(null,user,{message:'Logged in Successfully'});

            }
            return done(null,false,{message:'Wrong Username or Password'})
        }).catch(err=>{
            return done(null,false,{message:'Something went Wrong'})

        })

    }) )

    passport.serializeUser(function(user,done){
        done(null,user._id)
    })

    passport.deserializeUser(function(id,done){
        //User.findOne({_id:id});
        user.findById(id,function(err,user){
            done(err,user);
        })
    })
    

}
module.exports = init;
