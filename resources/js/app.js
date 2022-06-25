
import axios from 'axios';


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    //Axios 
    axios.post('/update-cart',pizza).then(function(res){
        // console.log(res);
        cartCounter.innerText = res.data.totalQty ; 
    })
}
addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        // console.log('clicked');
        let pizza = JSON.parse(btn.dataset.pizza);
         updateCart(pizza);

        console.log('pizza--from app.js' ,pizza);

    })
})