
function authController(){
    return {
        login: function (req,res){
            return res.render('auth/login');

        },

        register:function(req,res){
           return  res.render('auth/register');
        }
    }
}

module.exports = authController;


//another way 
// module.exports.login=function(req,res){
//     res.render('auth/login');
// }