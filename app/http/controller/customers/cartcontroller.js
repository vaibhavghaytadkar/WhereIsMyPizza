

function cartController(){
    return {
        index: function(req,res){
             res.render('customers/cart');
        },
        update: function(req,res){
            //checking for cart in sessiom
            // if(!req.session.cart){
            //     //if session does not have cart lets create it
            //     req.session.cart={
            //         items:{},
            //         totalQty:0,
            //         totalPrice:0

            //     }
               
            // }
            // let cart=req.session.cart;

            // //check if item does not exist in cart
            // if(!cart.items[req.body.id]){
            //     cart.items[req.body.id]={
            //         item:req.body,
            //         qty:1
            //     }
            //     cart.totalQty = cart.totalQty+1;
            //     cart.totalPrice=cart.totalPrice + req.body.price 


            // }
            // else{
            //     cart.items[req.body.id].qty= cart.items[req.body.id].qty+1
            //     cart.totalQty = cart.totalQty+1;
            //     cart.totalPrice=cart.totalPrice + req.body.price 
            // }

            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalQty:0,
                    totalPrice:0
                }
                
            }
            let cart=req.session.cart ;
            if(!cart.items[req.body.name]){
                cart.items[req.body.name]={
                    item:req.body,
                    qty:1
                },
                cart.totalQty=cart.totalQty + 1 
                cart.totalPrice= cart.totalPrice + req.body.price 

            }
            else{
                cart.items[req.body.name].qty =  cart.items[req.body.name].qty + 1
                cart.totalQty=cart.totalQty + 1 
                cart.totalPrice= cart.totalPrice + req.body.price 
            }
            // console.log(req.body,_id);
            return res.json({totalQty : req.session.cart.totalQty})
        }

    }
}

module.exports=cartController;

// function cartController() {
//     return {
//       index(req,res){
//         res.render('customers/cart')
//       },
//       update(req,res){
  
//         if(!req.session.cart){
//           req.session.cart = {
//             items:{},
//             totalQty:0,
//             totalPrice:0
//           }
          
//         }
  
//         let cart=req.session.cart
//         if(!cart.items[req.body._id]){
//           cart.items[req.body._id] = {
//             item:req.body,
//             qty:1,
//           }
//           cart.totalQty = cart.totalQty+1;
//           cart.totalPrice = cart.totalPrice + req.body.price
//         }
//         else {
//           cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
//           cart.totalQty = cart.totalQty+1
//           cart.totalPrice = cart.totalPrice + req.body.price
//         }
//         return res.json({totalQty:req.session.cart.totalQty})
//       }
//     }
//   }
  
//   module.exports=cartController