// function cartController() {
//   return {
//     index(req,res){
//       res.render('customers/cart')
//     },
//     update(req,res){

//       if(!req.session.cart){
//         req.session.cart = {
//           items:{},
//           totalQty:0,
//           totalPrice:0
//         }
        
//       }

//       let cart=req.session.cart
//       if(!cart.items[req.body._id]){
//         cart.items[req.body._id] = {
//           item:req.body,
//           qty:1,
//         }
//         cart.totalQty = cart.totalQty+1;
//         cart.totalPrice = cart.totalPrice + req.body.price
//       }
//       else {
//         cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
//         cart.totalQty = cart.totalQty+1
//         cart.totalPrice = cart.totalPrice + req.body.price
//       }
//       return res.json({totalQty:req.session.cart.totalQty})
//     }
//   }
// }

// module.exports=cartController
function cartController() {
  return {
    index(req,res){
      res.render('customers/cart')
    },

    update(req,res){

      if(!req.session.cart){
        req.session.cart = {
          items:{},
          totalQty:0,
          totalPrice:0
        }
        
      }

      let cart=req.session.cart;
      console.log('cart 1 : ',cart);
      console.log('req.body is 2 :',req.body);

      if(!cart.items[req.body.name]){
        cart.items[req.body.name] = {
          item:req.body,
          qty:1,
        }
        console.log('cart.items[req.body.name] (inside if ) 3:  ',cart.items[req.body.name]);

        cart.totalQty = cart.totalQty+1;
        cart.totalPrice = cart.totalPrice + req.body.price
      }
      else {
        console.log('cart.items[req.body.name] (inside else) 3: ',cart.items[req.body.name]);
        cart.items[req.body.name].qty=cart.items[req.body.name].qty+1
        console.log('cart.items[req.body.name].qty (inside else) 4 : ',cart.items[req.body.name].qty);
        cart.totalQty = cart.totalQty+1
        cart.totalPrice = cart.totalPrice + req.body.price
      }
      return res.json({totalQty:req.session.cart.totalQty})
    }
  }
}

module.exports=cartController