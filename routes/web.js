
const homeController= require('../app/http/controller/homeController');
const authController= require('../app/http/controller/authController');
const cartController= require('../app/http/controller/customers/cartcontroller');


function initRoutes(app){
    // app.get('/',function(req,res){
    //     res.render('home');
    // })
    app.get('/',homeController().index);

    // app.get('/cart',function(req,res){
    //     res.render('customers/cart');
    // })
    app.get('/cart',cartController().index);


    // app.get('/login',function(req,res){
    //     res.render('auth/login');
    // })

    app.get('/login',authController().login);

    // app.get('/login',authController.login);


    // app.get('/register',function(req,res){
    //     res.render('auth/register');
    // })
    app.get('/register',authController().register);
}



module.exports=initRoutes