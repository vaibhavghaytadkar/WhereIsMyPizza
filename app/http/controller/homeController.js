const Menu= require('../../models/menu');
function homeController(){
    return {
        index: async function(req,res){
          
            const pizzas = await Menu.find();
            // console.log('pizzas are ',pizzas);
            return res.render('home',{pizzas: pizzas});
        }
    }
}


module.exports = homeController;