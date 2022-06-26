
import axios from 'axios';
import Noty from 'noty';


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
