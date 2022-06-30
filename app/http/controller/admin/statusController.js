
const Order = require('../../../models/order');

function statusController(){
    return {
        update(req,res){
           
            Order.updateOne({_id: req.body.orderId},{status: req.body.status},function(err,data){
                if(err){

                   return  res.redirect('/admin/orders');
                }
                //Emit Event
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderUpdated',{id:req.body.orderId , status:req.body.status});
                
                return res.redirect('/admin/orders');
            })
            // console.log('inside status update controller');

        }
    }
}

module.exports = statusController;
