
const homeController= require('../app/http/controller/homeController');
const authController= require('../app/http/controller/authController');
const cartController= require('../app/http/controller/customers/cartcontroller');

const guest = require('../app/http/middleware/guest');
function initRoutes(app){
    // app.get('/',function(req,res){
    //     res.render('home');
    // })
    app.get('/',homeController().index);

  

    // app.get('/login',function(req,res){
    //     res.render('auth/login');
    // })

    app.get('/login',guest,authController().login);
    // app.get('/login',authController.login);
    app.post('/login',authController().postLogin);


    // app.get('/register',function(req,res){
    //     res.render('auth/register');
    // })
    app.get('/register',guest,authController().register);

  app.post('/register',authController().postRegister);


  app.post('/logout',authController().logout);

      // app.get('/cart',function(req,res){
    //     res.render('customers/cart');
    // })
    app.get('/cart',cartController().index);
    app.post('/update-cart',cartController().update);

}



module.exports=initRoutes