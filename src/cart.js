let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("info")) || [];
let calculation = () => {
  let cartIcon = document.getElementById("cartamount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        let {img,name,price} =search;
        return `
            <div class="cart-item">
            <img width ="100" src=${img} alt="Item">
            <div class="details">
            <div class="title-price-x">
                <h2 class="title-price">
                <p>${name}</p>
                <p class="cart-items-price">$ ${price}</p>
                </h2>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="button">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
            <h3>$ ${item * price}</h3>
            </div>
            </div>
            `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
        <button class="homebtn"> Back to Home</button>
        </a>
        `;
  }
};
generateCartItems();
let increment=(id)=> {
    let selectedItem= id;
    let search = basket.find((x)=> x.id === selectedItem.id );
    if(search === undefined){
        basket.push({
        id:selectedItem.id,
        item:1
    });
    }
    else{
        search.item +=1;
    }
    
    
   generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("info", JSON.stringify(basket));
};
let decrement=(id)=>{
    let selectedItem= id;
    let search = basket.find((x)=> x.id === selectedItem.id );
    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -=1;
    }
   // console.log(basket);
   update(selectedItem.id);
   basket= basket.filter((x)=>x.item !==0);
   generateCartItems();
    localStorage.setItem("info", JSON.stringify(basket));
};
let update=(id)=>{
    let search = basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML =search.item;
    calculation();
    TotalAmount();
};
let removeItem = (id) => {
    let selectedItem =id;
   // console.log(selectedItem.id);
   basket=basket.filter((x)=>x.id !== selectedItem.id);
   generateCartItems();
   TotalAmount();
   calculation();

   localStorage.setItem("info", JSON.stringify(basket));
   
};
let ClearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("info", JSON.stringify(basket));
};
let TotalAmount = ()=>
{
    if(basket.length!==0)
    {
        let amount=basket.map((x)=>{
            let {item,id} =x;
             let search = shopItemsData.find((y) => y.id === id) || [];
             return item * search.price;
        }).reduce((x,y)=>x+y,0);
    
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
   <button onclick="ClearCart()" class="removeall">Clear Cart</button>
    `
    } else return;
};

TotalAmount();