const fetch_url = "https://s2021-8556.restdb.io/rest/t9products?max=20";

fetch(fetch_url, {
  method: "GET",
  headers: {
    "x-apikey": "6034ed655ad3610fb5bb655d",
  },
})
  .then((res) => res.json())
  .then((response) => {
    // console.log(response);
    showproducts(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showproducts(data) {
  // console.table(data);
  data.forEach((product) => {
    showproduct(product);
  });
}

//loop
function showproduct(product) {
  //   console.log(product);
  const tempProd = document.querySelector("#product-template").content;

  const clone = tempProd.cloneNode(true);

  const h2El = clone.querySelector("h2");
  h2El.textContent = product.name;

  const pEl = clone.querySelector("p");
  pEl.textContent = product.price;

  btnEl = clone.querySelector("button");
  // btnEl.dataset.id += product._id;

  btnEl.addEventListener("click", () => {
    // alert("hey");
    // console.log(product);
    CART.add(product);
  });

  const productsEl = document.querySelector(".products");
  productsEl.appendChild(clone);
}

const CART = {
  KEY: "basket",
  contents: [],
  init() {
    //_contents is a temporary string
    let _contents = localStorage.getItem(CART.KEY);

    if (_contents.length == 0) {
      //if there's anything there, turn it into JS objects, that we can access with the dot . notation
      CART.contents = JSON.parse(_contents);
    } else {
      CART.contents = [
        {
          _id: "607f216322a6f434000e601e",
          img: "http://Kari.ca/",
          qty: 5,
          name: "Ut dolores",
          price: 730,
        },
        {
          _id: "2",
          img: "nonoe",
          qty: 3,
          name: "Hej there",
          price: 500,
        },
        {
          _id: "3",
          img: "nonoe",
          qty: 2,
          name: "Hej there",
          price: 500,
        },
      ];
    }
    //I want to update the
    //this.updateDOM(); //lacj!!! use this when we're not hardcoding the contents, and the content is read from localStorage
    CART.sync();
  },
  sync() {
    //turn CART contents array of objects into a string that we can write in localStorage
    let _cart = JSON.stringify(CART.contents);
    localStorage.setItem(CART.KEY, _cart);
    CART.updateDOM();
  },
  updateDOM() {
    const cartcontentEl = document.querySelector(".cart-content");
    cartcontentEl.innerHTML = "";

    //If we have an empty array / an array with the length of 0
    if (CART.contents.length === 0) {
      cartcontentEl.innerHTML = "<h4>The cart is empty</h4>";
    } else {
      CART.contents.forEach((element) => {
        // console.log(element);

        const tempItem = document.querySelector("#cart-item-template").content;
        const itemcopy = tempItem.cloneNode(true);

        const id = element._id;
        const labelEl = itemcopy.querySelector("label");
        labelEl.textContent = element.name;
        labelEl.setAttribute("for", "fid-" + id);

        const minusBtn = itemcopy.querySelector(".minus");
        minusBtn.addEventListener("click", () => {
          CART.minusOne(id);
        });

        const inputEl = itemcopy.querySelector("input");
        inputEl.id += id;
        inputEl.name += id;
        inputEl.value = element.qty;

        inputEl.addEventListener("input", () => {
          const itemQty = inputEl.valueAsNumber;
          element.qty = itemQty;
          /*  console.log("element");
          console.log(element); */
          CART.update(element);
        });

        inputEl.addEventListener("focus", (e) => {
          e.target.select();
        });

        const plusBtn = itemcopy.querySelector(".plus");
        plusBtn.addEventListener("click", () => {
          CART.plusOne(id);
        });

        const priceEl = itemcopy.querySelector(".price-each span");
        priceEl.textContent = element.price;

        cartcontentEl.appendChild(itemcopy);
      });
    }
  },
  add(obj) {
    const index = CART.contents.findIndex((element) => element._id == obj._id);
    if (index == -1) {
      console.log(obj);
      obj.qty = 1;
      console.log(CART.contents);
      CART.contents.push(obj);
    } else {
      CART.contents[index].qty += 1;
    }
    console.log(CART.contents);
    this.sync();
  },
  update(obj) {
    //find the index of the object
    const index = CART.contents.findIndex((element) => element._id == obj._id);

    //If the qty is 0 we'll remove from the CART.contens array of objects, so that it's nol onger show in the cart
    if (obj.qty === 0) {
      //The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      //1. parameter start (index in the array), 2. paramter: how many? - here 1
      CART.contents.splice(index, 1);
    } else {
      //we'll have to read the data from the input field
      /* const inputEl = document.querySelector("#fid-" + obj._id);
    CART.contents[index].qty = inputEl.valueAsNumber; */
      CART.contents[index].qty = obj.qty;
    }

    CART.sync();
  },
  minusOne(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    indexObj.qty--;
    console.log(indexObj);
    CART.update(indexObj);
  },
  plusOne(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    indexObj.qty++;
    console.log(indexObj);
    CART.update(indexObj);
  },
};

CART.init();
