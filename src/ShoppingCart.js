export default class ShoppingCart{

    constructor(){
        // console.log("creating shopping cart");
        this.itemskunumber = null;
        this.theDeleteButton =null;
        // this.updateCartQuantity;
        //// creating the variable to input the this.theApp = the
        if(Storage){
            // you can create a shoppingCart!
            this.initShoppingCart();
        } else
        {
            console.log("Error! SessionStorage not supported in your browser!");
        }

    }

    initShoppingCart(){
        // console.log("fipnished creating shopping cart");

    }

    addItemToCart(sku,theApp){

        // $(".itemAddedToCart").fadeOut();
        // console.log("im adding sku to the cart");
        // console.log(sku);
        let theSku = sku;
        if (sessionStorage.getItem(theSku)==undefined){
            sessionStorage.setItem(theSku,1);
            return
        }

        for (let i=0; i<sessionStorage.length; i++){
            let currentsku = sessionStorage.key(i);

            if (currentsku.toString() == theSku.toString()) {
                let currentValue = sessionStorage.getItem(currentsku);
                currentValue = parseInt(currentValue);
                currentValue = currentValue +1;
                sessionStorage.setItem(currentsku,currentValue);
            }
        }


}


    removeItemFromCart(theApp){
 console.log("going to remove item! ");


     for (let i=0; i<sessionStorage.length; i++) {
            // let the product sku aka currentSku be the session storage KEY
            //look in ss it gets the key's value so in this case key is the data sku and the value is the quantity. so we're getting the value quantity here
            let currentSku = sessionStorage.key(i);
            // make the session storage get the currentSku which is the key, and display the value in current_qty
            let current_qty = sessionStorage.getItem(currentSku);
            let theDeleteButton =document.getElementById("delete_"+currentSku);
            if(theDeleteButton !== null){
             theDeleteButton.addEventListener('click', this.deleteItems(theApp),false);}
            console.log(theDeleteButton);

}}
        deleteItems(theApp){
            let products = theApp.products;
return function(e) {
   let theSku =e.target.getAttribute("name");
console.log(theSku);
    let removedItem = sessionStorage.getItem(theSku);
    sessionStorage.removeItem(theSku);
    theApp.shoppingCartView.cartshow(products,theApp);
    let newQuantity = sessionStorage.getItem("Quantity");
    newQuantity = newQuantity - removedItem;

    sessionStorage.setItem("Quantity",newQuantity);
    let current_val = sessionStorage.getItem("Quantity");
    $("#cartQty").val(current_val);
    if (parseInt(current_val) == 0){
        sessionStorage.clear();
        $("#cartQty").hide();
        $(".ShoppingCart").hide();
        $(document).on("click",".cartlogo",this,function(){$(".ShoppingCart").hide()});
    }

}

  }


    updateQuantityofItemInCart(theApp){

      let self= this;
       return function(e){

        self.updateCartQuantity(theApp);

        }
    }

    updateCartQuantity(theApp,sku){
      console.log('update function');

     let products = theApp.products;

     for (let i=0; i<sessionStorage.length; i++) {
            let currentSku = sessionStorage.key(i);
            let current_qty = sessionStorage.getItem(currentSku);
            // console.log(currentSku);
        if (currentSku !== "Quantity"){
            let inputvalue= document.getElementById("Qv_"+currentSku).value;
            this.theDeleteButton = document.getElementById(currentSku);
            console.log(this.theDeleteButton);
            // console.log(inputvalue);

            if (current_qty.toString() !== inputvalue.toString()){
                sessionStorage.setItem(currentSku,inputvalue);
                let newQuantity = sessionStorage.getItem("Quantity");
                newQuantity = parseInt(newQuantity);
                inputvalue = parseInt(inputvalue);
                current_qty = parseInt(current_qty);
                newQuantity = newQuantity + inputvalue - current_qty;
                console.log(newQuantity);
                sessionStorage.setItem("Quantity",newQuantity);
                let current_val = sessionStorage.getItem("Quantity");
                $("#cartQty").val(current_val);
                theApp.shoppingCartView.cartshow(products,theApp);


            }

            }

            }


}

    clearCart(e){
        // clear the entire cart
        console.log('im clearing the cart');
        sessionStorage.clear();
        console.log(this);
        // this.addItemToCart;
        $('.ShoppingCart').fadeOut();
    }

}
