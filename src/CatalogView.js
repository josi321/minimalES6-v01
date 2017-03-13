export default class CatalogView{

    constructor(){
        this.carousel = document.getElementsByClassName("owl-carousel");
        this.theApp = null; // this is a property: catalogview.theApp which is null.
    }

   initCarousel(){
        $(document).ready(function() {

            $('.owl-carousel').owlCarousel({
              loop:true,
              margin:10,
              responsiveClass:true,
              responsive:{
                  0:{
                      items:1,
                      nav:true
                  },
                  600:{
                      items:2,
                      nav:false
                  },
                  1050:{
                      items:4,
                      nav:true,
                      loop:false
                    }
                }
            })

        });
       }

    // to add products to the carousel, we call the function to do so, and we pass it poducts (aka product data), and the App
    addProductsToCarousel(products,theApp){
        this.theApp = theApp; // now assigning the catalog.theApp = App.js there by linking app details to catalog

        // if there are no products, then do noting-> nothing to display in carousel
        if (products === undefined || products == null){
            return ; // then do not do anything! there is no data
        }

        // if there are products, then we need to loop thru the product array, and create the html structure to display it
        /* <div class="product-wrapper">
         * <img src="images/stretch-knit-dress.jpg" alt="Image of stretch knit dress" />
         * <p class="product-type">Dresses</p>
         * <h3>Stretch Knit Dress</h3>
         * <p class="price">$169.00</p>
         * </div>
          * */
        for (let p=0; p<products.length; p++){
            let product = products[p];
            // if you console.log(product); you can see an array of product objects

            // create the DIV tag with class 'product-wrapper'
            //this is a new div that goes inside the owl carousel div
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class","item"); //<div class="item">


            // create a new IMG tag. Suggest to add data-sku attribute here too
            // so that if you 'click' on the image, it would pop up a quick-view
            // window and you can use the sku.
            let newImg = document.createElement("div");
            newImg.setAttribute("style",`background-image: url('${product.image}');height:200px; background-size:contain;background-repeat:no-repeat;background-position:center;`);
            newImg.setAttribute("alt", product.name); // this works too
            newImg.setAttribute("data-sku",product.sku);


            // create a new Paragraph to show a description
            // let newPara = document.createElement("p");
            // newPara.setAttribute("class","product-type");
            // let newParaTextNode = document.createTextNode(product.longDescription);
            // newPara.appendChild(newParaTextNode);

            // create a new H3 tag to show the name
            let newH3Tag = document.createElement("h3");
            let newH3TagTextNode = document.createTextNode(product.name);
            newH3Tag.appendChild(newH3TagTextNode);

            let newPricePara = document.createElement("p");
            newPricePara.setAttribute("class","price");
            let newPriceParaTextNode = document.createTextNode("$ "+product.regularPrice);
            newPricePara.appendChild(newPriceParaTextNode);

            let quickviewBtn = document.createElement("button");
            quickviewBtn.setAttribute("id",`qv_${product.sku}`); //target the id qv_sku
            quickviewBtn.setAttribute("data-sku",product.sku);
            quickviewBtn.setAttribute("type","button");
            let quickviewBtnTextNode = document.createTextNode("Quick View");
            quickviewBtn.appendChild(quickviewBtnTextNode);
            //addEventListener-->once you click the button, then do the function aka quickview function
            quickviewBtn.addEventListener("click",this.detailedDescription(products,this.theApp),false);

            let addToCartButton = document.createElement("button");
            addToCartButton.setAttribute("id",`cart_${product.sku}`);
            addToCartButton.setAttribute("data-sku",product.sku);
            addToCartButton.setAttribute("type","button");
            let addToCartButtonTextNode = document.createTextNode("Add to cart");
            addToCartButton.appendChild(addToCartButtonTextNode);
            // <button id='cart_${product.sku}' data-sku="" type='button'> add to cart </button>
            // console.log(newButtonTag);
            //listen to the buttons click event all the time
            addToCartButton.addEventListener("click",this.onClickCartButton(this.theApp), false);//passing the this app to


            // now that we've created the html structure for products display, we need to append the changes
            newDiv.appendChild(newImg);
            // newDiv.appendChild(newPara);
            newDiv.appendChild(newH3Tag);
            newDiv.appendChild(newPricePara);
            newDiv.appendChild(quickviewBtn);
            newDiv.appendChild(addToCartButton);
            this.carousel[0].appendChild(newDiv); //0 bc its in a loop, but want 1 carousel
        }
    // now that we have the products, and structure to display the products, we can initialize the carousel
    this.initCarousel();
  };

    //rmb when we called for event listeners, it runs a function after it hears the prompt.
    //below are the functions that we called

    onClickCartButton(theApp) {

      let eventHandler = function(e){
        // console.log("onClickCartButton");
        // console.log(e); // e is the mouse event. and in it, theres a property called attribute, which has other properties such as data-sku
        // we're getting the sku number and we need to pass it to a variable so that it can be transfered to shopping cart.
        let theSku = e.target.getAttribute("data-sku");

        theApp.shoppingCart.addItemToCart(theSku,theApp); //function in the shoppingCart.js
        theApp.shoppingCart.removeItemFromCart(theSku);
        $(document).on("click",".cartlogo",this,function(){$(".ShoppingCart").show()}); //function here is running a jquery function that just shows the shoppingcart

        if (sessionStorage.getItem("Quantity")==undefined){
          sessionStorage.setItem("Quantity",1);
        } else {
          let newQuantity = sessionStorage.getItem("Quantity");
          newQuantity = parseInt(newQuantity);
          newQuantity +=1;
          sessionStorage.setItem("Quantity",newQuantity);
        }

        $(".itemAddedToCart").fadeIn();
        $("#cartQty").show(); //shows the red circle on cart
        let current_val = sessionStorage.getItem("Quantity"); //shows the number on the red circle based on the value in the sessionStorage -->Quantity is a property in the sessionStorage
        $("#cartQty").val(current_val);
        // console.log("this is where iakjbadfbg");
        // console.log(theApp.shoppingCartView.cartshow);
        theApp.shoppingCartView.cartshow(theApp.products,theApp); //passing the products and the app


        theApp.shoppingCart.updateQuantityofItemInCart(theSku,theQuantity);

         //now this passes the the sku from Catalogview to the app and then to shoppingcart
    // we are going to pass the app from the app.js by sending the app from addprocuctsToCarousel in the app
    }

      // console.log(this);
        return eventHandler;

    }

    //Quickview button's function
    detailedDescription(products,theApp){
      //let self = this; //this is supposed to be this.catalogView  but it wouldnt let him, so he just renamed it to self
      //this.call = this;
       let output =""; //make the output be nothing, then we later appended data to it

      return function(e) {

      let dataSku = e.target.getAttribute("data-sku")

      console.log(e);
      console.log(dataSku);

      for (let p=0;p<products.length;p++) {
        let currentProducts = products[p]; // currentProducts is the jsondata product (all the data bbws)
        let productsSku = currentProducts.sku; // ex productsSku = currentProducts[0].sku --> currentProducts[0].1234455
        if (currentProducts.sku.toString() == dataSku.toString()) {
          //if the skus matches, then let img= to the currentProducts's img, name, price
          let img = currentProducts.image;
          let name = currentProducts.name;
          let price = currentProducts.regularPrice;

        output = `<div class="Item-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div>
                       <img class="cartimage" height="300" width="300" src=${img}>
                    </div >
                    <div class="textcenter">
                        <h3> ${name}</h3>
                        <p>$ ${price}</p>
                        <button class="addToCart" data-sku=${productsSku} >Add to cart</button>
                    </div>
                  </div>`;
            }

    }

    $(".quickView").html(output); //append the quickview display
    $(".quickView").fadeIn(); //display into the quickview
    $(document).on("click",".close",this,function(){$(".quickView").fadeOut()});
        let addToCartButton = document.getElementsByClassName('addToCart');
        // console.log(addToCartButton);
        // console.log(self.onClickCartButton);
        // console.log(self.theApp);
        console.log("quickview add to cart button");
          addToCartButton[0].addEventListener("click",this.catalogView.onClickCartButton(this.catalogView.theApp), false);
    }

    }
};
