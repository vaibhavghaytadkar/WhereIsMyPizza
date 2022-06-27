
import axios from 'axios';
import Noty from 'noty';
import {initAdmin} from './admin'
import moment from 'moment';

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    //Axios 
    axios.post('/update-cart',pizza).then(function(res){
        // console.log(res);
        cartCounter.innerText = res.data.totalQty ; 
        // console.log(  cartCounter.innerText);
        new Noty({
            type:'success',
            timeout:1000,
            text:'Item added to cart',
            progressBar:false,
            layout:'topRight'
          }).show();
       
    })
    console.log('updating cart......');
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        // console.log('clicked');
        let pizza = JSON.parse(btn.dataset.pizza);
        console.log('pizza is' , pizza);
         updateCart(pizza);

        // console.log('pizza--from app.js' ,pizza);

    })
})

const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove();
    },2000)
}




// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time);
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current');
           }
       }
    })

}

updateStatus(order);

//client side of socket connection
let socket = io()

// join
if(order){
   
    socket.emit('join',`order_${order._id}`)
}
let adminAreaPath = window.location.pathname;
console.log('url name : ',adminAreaPath);
if(adminAreaPath.includes('admin')){
    initAdmin(socket);
    socket.emit('join','adminRoom')
}
socket.on('orderUpdated',(data)=>{
    const updatedOrder = {...order};
    updatedOrder.updatedAt = moment().format();
    updatedOrder.status= data.status ;
    updateStatus(updatedOrder)
    new Noty({
        type:'success',
        timeout:1000,
        text:'Order Updated',
        progressBar:false,
        layout:'topRight'
      }).show();
    console.log(data);
})