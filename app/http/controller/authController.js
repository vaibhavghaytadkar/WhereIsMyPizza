const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../../models/user');

function authController(){

    const _getRedirectUrl = (req)=>{
        return  req.user.role === 'admin' ? '/admin/orders':'/customer/orders' ;
    }

    return {
        login: function (req,res){
            return res.render('auth/login');

        },
        postLogin:function(req,res,next){
            passport.authenticate('local',function(err,user,info){
                if(err){
                    req.flash('error',info.message)
                    return next(err);
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('/login');
                }
                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err);
                    }

                    return res.redirect(_getRedirectUrl(req));
                })
            })(req,res,next)
        },

        register:function(req,res){
           return  res.render('auth/register');
        },
        postRegister:async function(req,res){
            const {name,email,password} = req.body;
            //validate request
            if(!name || !email || !password){
                req.flash('error','All fields are required');
                req.flash('name',name);
                req.flash('email',email);
                return res.redirect('/register'); 
            }
            //check if email exist

            User.exists({email: email},(err,result)=>{
                if(result){
                    req.flash('error','Email already Registered');
                    req.flash('name',name);
                    req.flash('email',email);
                    return res.redirect('/register'); 
                }
            })

            //hash password
            const hashedPassword = await bcrypt.hash(password,10);
            //create user
            const user= new User({
                name:name,
                email: email,
                password: hashedPassword
            })

            user.save().then(()=>{
                //Login

                return res.redirect('/login');
            }).catch(err=>{
                req.flash('error','Something went wrong');
               
                return res.redirect('/register'); 
            })
            console.log(req.body);

          
        },
        logout:function(req,res){
            req.logout()
            return res.redirect('/login');
            
        }
    }
}

module.exports = authController;


//another way 
// module.exports.login=function(req,res){
//     res.render('auth/login');
// }