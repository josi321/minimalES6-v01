export default class ShoppingCartView {

	constructor() {

		this.initshoppingCart();
		this.shoppingCartCounter();


	}

	initshoppingCart(){


	}

// SHOPPING CART INFO IN THE CART BASKET!!!!
	cartshow (products,theApp){

		let output ="";
		let Total=parseInt(0);
		let subTotal =parseInt(0);



		for (let i=0; i<sessionStorage.length; i++) {
			let currentSku = sessionStorage.key(i);
			let current_qty = sessionStorage.getItem(currentSku);

			if( currentSku !== "quantity"){
			for (let p=0;p<products.length;p++) {
				let currentProducts = products[p];
				 // console.log(currentProducts);// i'm getting this
				let productsSku = currentProducts.sku;
				// console.log("bjk sdlkfjbsdkjfbbsd");

				if(productsSku.toString() == currentSku.toString()) {
					let img = currentProducts.image;
					// console.log(currentProducts);
					let name = currentProducts.name;
					let price = currentProducts.regularPrice;
					subTotal = price * current_qty;
					// console.log(current_qty);

					output +=
					`
						<div class="modal-body" style="max-height: 500px;overflow-y: auto;">
						<img class='cartimage textcenter' height="200" width="200" src=${img}>
						 			<h3> ${name}</h3>
						 			<p>$ ${price}</p>
						 			<input type="number" value=${current_qty} id="QQv_${productsSku}" class="black shoppingCartInput" min="0" max="100">
						 			<p id=${subTotal} class="subtotal"> Subtotal: $ ${subTotal}</p>
						 			<button	class="delete" type="button" id="delete_${productsSku}" name="${productsSku}" > Remove </button>
						</div>`


					// output += ` <div class="flex">
					// 			<img class='cartimage textcenter' height="200" width="200" src=${img}>
					// 			<h3 class="black"> ${name}</h3>
					// 			<p class="red Myvalue value">$ ${price}</p>
					// 			<input type="number" value=${current_qty} id="QQv_${productsSku}" class="black shoppingCartInput" min="0" max="100">
					// 			<p class="black Myvalued value" id=${subTotal}>$ ${subTotal}</p>
					// 			<button	class="delete" type="button" id="delete_${productsSku}" name="${productsSku}" > Remove </button>
					// 			</div>`;
					}	}

			}
			// the total price goes here??

	}


	$(".shoppingCartInfo").html(output);
	$(document).on("click",".close",this,function(){$(".ShoppingCart").fadeOut()});

	let TotalOfCart = document.getElementsByClassName("subtotal");

	console.log(TotalOfCart);
	let FinalPrice = parseInt(0);
		for (let i=0;i < TotalOfCart.length ;i++) {
			let totalnumber = Number(TotalOfCart[i].getAttribute('id'));
			FinalPrice += totalnumber;
			console.log(totalnumber);
		}
		console.log(FinalPrice);
	let addingFinalPrice = `<p>Total Price: $ ${FinalPrice}</p>`;
	$('.shoppingCartTotal').html(addingFinalPrice);

     $(".itemAddedToCart").fadeOut(2500);
	if (sessionStorage.getItem("Quantity") == null){ return } else {
	let clearButton = document.getElementById('clearSessionStorage');
    clearButton.addEventListener("click",this.clearTheShoppingCart(theApp),false);


    let updateCartButton = document.getElementById('updateCart');
    updateCartButton.addEventListener("click",theApp.shoppingCart.updateQuantityofItemInCart(theApp),false);

    theApp.shoppingCart.removeItemFromCart(theApp);


    }

}

	deleteItem(theSku,theApp) {

		return function(e) {

			theApp.shoppingCart.removeItemFromCart(theSku,theApp);
		}


	}

	clearTheShoppingCart(theApp){

		return function(e) {
			// console.log('idfgjsdnfgjknd');
			theApp.shoppingCart.clearCart();
			theApp.shoppingCartView.cartshow();
			theApp.shoppingCartView.shoppingCartCounter();
			let current_val = sessionStorage.getItem("Quantity");
			$("#counter").val(current_val);
			$("#counter").hide();

			$(document).on("click",".cartlogo",this,function(){$(".ShoppingCart").hide()});

		}

}

	shoppingCartCounter() {
		if ( sessionStorage.getItem("Quantity") !== null) {
		$(document).on("click",".cartlogo",this,function(){$(".ShoppingCart").show()});
		$("#counter").show();
		let current_val = sessionStorage.getItem("Quantity");
		$("#counter").val(current_val);
	}

	}


}
