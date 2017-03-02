import BestBuyWebService from './BestBuyWebService';
import CatalogView from './CatalogView';
import ShoppingCart from './ShoppingCart';
import ShoppingCartView from './ShoppingCartView';

export default class App{
  constructor(){
      this.productData = null; // this (App) is null and it will store all our data
      this.products = null; // this (App) will store the products
      this.catalogView = new CatalogView(); // a new instance of the catalogView which will display our data
      this.shoppingCart = new ShoppingCart(); // new instance of shoppingCart, which has cart functions


      this.shoppingCartView = new ShoppingCartView(); //new instance of the shoppingCartView to display cart contents
      this.initBestBuyWebService(); //the App needs to initialize BestBuyWebService to get products when there are products

  }

  initBestBuyWebService(){
      this.bbws = new BestBuyWebService();
      // use your own API key for this (the one from Cody)
      this.bbws.apiKey = "SXkiDh8lcFEAqyG6rDmJjlH4";

      // this uses 'backticks' for long multi-line strings
      this.bbws.url = `https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=${this.bbws.apiKey}&format=json`;

      // pass the reference to this app to store the data
      this.bbws.getData(this);

  }

  prepCatalog(){
      // use this console.log to test the data
      // console.log(this.productData);

      if(this.productData!=null){
          //if there are products, then get the products from bbws
          this.products = this.bbws.getProducts(); // the return value the data is from bbws.js rmb jsonData.product
          //getProducts() is a function which returns the data value in the form of an array

      }
      //once have product data, youre going to need to display the products in the catalog, so we call for a function to do so
      this.showCatalog();
  }

  //initate the fucntion here
  showCatalog() {

      // we can only populate the carousel only if we have products.
      if (this.productData != null) {
        //addProductsToCarousel is a function in catalogView
          this.catalogView.addProductsToCarousel(this.products, this);
          // cartshow is a function we call to display the cart items in the cart
          this.shoppingCartView.cartshow(this.products,this);


          //these are just the click to open popups
        // $(document).on("click",".close",this,function(){$(".itemAddedToCart").fadeOut()});
        // $(document).on("click",".close",this,function(){$(".subcriptionThankyou").fadeOut()});
        // $(document).on("click",".submit",this,function(){$(".subcriptionThankyou").fadeIn()});
        //
        // $(document).on("click",".close",this,function(){$(".ShoppingCart").fadeOut()});
        //
        // $(document).on("click",".close",this,function(){$(".quickView").fadeOut()});

      }

  }

};
