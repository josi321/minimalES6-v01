export default class BestBuyWebService{

    constructor(){
        this.url ="";
        this.apiKey = "";
        this.productData = null;
        this.products = null;
    }


    getData(theApp){
        //theApp is the main app

        let serviceChannel = new XMLHttpRequest();
        let url = this.url;

        // bbws gets the data, and to pass the data to the App and to the catalogView.
        // to pass the data, we can use event listeners (middleman of drug dealer story) to listen to changes
        // this middle man will listen to a statechange aka there are products/drugs
        // then whe it knows theres product, it needs to get the products and then send it

        serviceChannel.addEventListener("readystatechange",this.resultsPreprocessor(theApp),false);
        serviceChannel.open("GET",url,true);
        serviceChannel.send();
    }

    resultsPreprocessor(theApp){
        /*the addEventListener function near line 22 requires a proper function (an event handler) to be returned so we can create one to be returned.
        */
        let thisService = this; // a reference to the instance created from this class
        let eventHandler = function(evt){
            thisService.results(evt,theApp);
        };
        return eventHandler
    };

    results(evt,theApp){

        if (evt.target.readyState == 4 && evt.target.status == 200){
            // assign this instance's productData to be the responseText
            this.productData = evt.target.responseText;
            // assign the app's productData to be the responseText too
            theApp.productData = evt.target.responseText;
            // tell the app to prepare the catalog
            // there is another way to do it, with custom
            // events. but this will work for now.
            theApp.prepCatalog();
            // console.log(evt.target.responseText);
            // return evt.target.responseText;
        }
    }

    //we know there are prducts (product data= jsonData), now we need to actually get the products (Json object)
    getProducts(){
        //if there are products, then let jsonData be the product data
        if(this.productData!=null){
           let jsonData = JSON.parse(this.productData);
          //  console.log(jsonData); when you look at console, youll see the a object, and in there youll see products array
          // so this.product = to just that jsonData.product only not the entire object and all the properties
           this.products = jsonData.products;
           return this.products;
        }

        return; // if we have no data, return nothing
    }
  };


//now that we have data from bestbuy, we need to display it in the catalog. So, let's go and work on catalogview
