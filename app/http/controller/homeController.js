const Menu= require('../../models/menu');
function homeController(){
    return {
        index: async function(req,res){
            // Menu.find().then(function(pizzas){
            //     console.log("pizzas are",pizzas);

            //     return res.render('home',{pizzas:pizzas});
            // })
            const pizzas = await Menu.find();
            return res.render('home',{pizzas: pizzas});
        }
    }
}


module.exports = homeController;