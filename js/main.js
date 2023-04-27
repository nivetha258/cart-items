let products=[
	{"id":"1","product":"watch1","price":1000,"picture":"image/watch1.jpg","description":"Piaoma"},
	{"id":"2","product":"watch2","price":1100,"picture":"image/watch2.jpg","description":"Tmeter"},
	{"id":"3","product":"watch3","price":1200,"picture":"image/watch3.jpg","description":"Blue Pearl"},
	{"id":"4","product":"watch4","price":1300,"picture":"image/watch4.jpg","description":"Fastrack"},
	{"id":"5","product":"watch5","price":1400,"picture":"image/watch5.jpg","description":"Flozio"}
];
let cartitems=[];	
						//create products list--------

let productsEle= document.getElementById("watch-products");

	products.forEach(function (product){
		
	let productDivEle=document.createElement("div");
	let productInDivEle=document.createElement("div")
	let productImgEle=document.createElement("img")
	let productHeadingEle=document.createElement("h5")
	let productParaEle=document.createElement("p")
	let productButtonEle=document.createElement("button");
	
	productDivEle.className="item mt-4 col-md-4";
	productInDivEle.className="initem";
	productImgEle.setAttribute("src",product.picture)
	
	productHeadingEle.innerText=product.description;
	productParaEle.innerText="Rs " + product.price;
	productButtonEle.innerText="Add to cart";
		productButtonEle.addEventListener("click",add())
	productInDivEle.append(productImgEle,productHeadingEle,productParaEle,productButtonEle)
	productDivEle.append(productInDivEle);
	productsEle.append(productDivEle);
		
	function add(){		
		let passingid=product.id;
		return 	function (){
				addToCart(passingid)}	
}
})

function addToCart(id){
	let match= cartitems.find((a)=>a.id===id)
	if(match){	
		match.qty++
	}
	else
	{
		let newmatch=products.find((a)=>a.id===id);
		additem={...newmatch,qty:1}
		cartitems.push(additem)
	}
	refreshcart();
}
		// create cart list--------------------
		
let cartproductsEle= document.getElementById("cart-products");
	
function displaycart(){
cartitems.forEach(function (product){
	
	let cartDivEle=document.createElement("div");
	let cartleftDivEle=document.createElement("div");
	let cartrightDivEle=document.createElement("div");
	let cartrightpriceDivEle=document.createElement("div");
	
	cartproductsEle.className="p-3";
	cartDivEle.className="row mb-2 border-bottom border-secondary align-item-center";
	cartleftDivEle.className="col-md-4";
	cartrightDivEle.className="col-md-5";
	cartrightpriceDivEle.className="col-md-3";
	
	let cartImgEle=document.createElement("img");
	let cartleftquantityDivEle=document.createElement("div");
	let cartreduceButtonEle=document.createElement("button")
	let cartnumberEle=document.createElement("button")
	let cartincreaseButtonEle=document.createElement("button")
	let cartitemPriceEle=document.createElement("div");
	
	cartImgEle.setAttribute("src",product.picture);
	cartleftquantityDivEle.setAttribute("class","text-center quantity mt-2")
	cartreduceButtonEle.innerText="-";
	cartnumberEle.innerText= product.qty;
	cartincreaseButtonEle.innerText="+";
	cartitemPriceEle.innerText= "Price"+"\n"+product.qty * product.price;
	
	let cartHeadingEle=document.createElement("h6")
	let cartPriceEle=document.createElement("p")
	let cartremoveButtonEle=document.createElement("button");
		
	cartHeadingEle.innerText=product.description;
	cartPriceEle.innerText=product.price;
	cartremoveButtonEle.innerText="Remove item";

	cartleftquantityDivEle.append(cartreduceButtonEle,cartnumberEle,cartincreaseButtonEle);
	cartleftDivEle.append(cartImgEle,cartleftquantityDivEle)
	
	cartrightDivEle.append(cartHeadingEle,cartPriceEle,cartremoveButtonEle)
	cartrightpriceDivEle.append(cartitemPriceEle)
	cartDivEle.append(cartleftDivEle,cartrightDivEle,cartrightpriceDivEle)
		
	cartproductsEle.append(cartDivEle)
	
	cartreduceButtonEle.addEventListener("click",decrease());
	cartincreaseButtonEle.addEventListener("click",increase());
	cartremoveButtonEle.addEventListener("click",remove());
	
	
	
	function decrease(){
		let id=product.id
		return function(){
			decreaseitem(id)
		}
	}
	function increase(){
		let id=product.id
		return function(){
			increaseitem(id)
		}
	}
	function remove(){
		let id=product.id
		return function(){
			removeitem(id)
		}
	}	
})
}
// decrease cartitem function-------------

function decreaseitem(id){
	let match=cartitems.find((item)=> item.id===id);
		match.qty--;
		if(match.qty>0){			
			refreshcart();		
		}else removeitem(id);	
}

// increase cartitem function-------------

	function increaseitem(id){
		let match=cartitems.find((item)=> item.id===id);
			match.qty++;
			refreshcart();
	}

// remove cartitem function-------------
	function removeitem(id){
		let match=cartitems.find((item)=> item.id===id);
		match.qty=0;
		cartitems=cartitems.filter((item)=>item.id!==id);
		refreshcart();
	}
//update count in cart----------
	let cartcountEle=document.getElementById("cartcount")
	cartcountEle.innerText=0;
	function cartcount(){
		cartcountEle.innerText= cartitems.reduce((function (total,a){
			return total +a.qty
		}),0)
	}

//refresh cart items-------------
function refreshcart(){
	cartproductsEle.innerHTML="";
	displaycart();
	cartcount();
	let inside=document.getElementById("totalamount");
	let x=cartitems.reduce(function(total,a){
		return total +=(a.qty*a.price)
			//return "total" + total
			// console.log("Total Amount"+ total)
			 //return "Total Amount"+ total
			
	},0)
	inside.innerText= "Total Amount is " + x;
}
