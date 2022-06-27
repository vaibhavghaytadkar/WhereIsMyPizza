
const homeController= require('../app/http/controller/homeController');
const authController= require('../app/http/controller/authController');
const cartController= require('../app/http/controller/customers/cartcontroller');
const orderController=require('../app/http/controller/customers/orderController');
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');
const adminOrderController = require('../app/http/controller/admin/orderController');
const statusController = require('../app/http/controller/admin/statusController');
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

  // CUSTOMERS ROUTE
    app.post('/orders', auth ,orderController().store);

    app.get('/customer/orders', auth,orderController().index);
    app.get('/customer/orders/:id', auth,orderController().show);
    

    //admin routes
    
    app.get('/admin/orders', admin,adminOrderController().index);
    app.post('/admin/order/status', admin,statusController().update);

}



module.exports=initRoutes