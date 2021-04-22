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

    if (_contents) {
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
    CART.contents.forEach((element) => {
      // console.log(element);

      const tempItem = document.querySelector("#cart-item-template").content;
      const itemcopy = tempItem.cloneNode(true);

      const id = element._id;
      const labelEl = itemcopy.querySelector("label");
      labelEl.textContent = element.name;
      labelEl.setAttribute("for", "fid-" + id);

      const inputEl = itemcopy.querySelector("input");
      inputEl.id += id;
      inputEl.name += id;
      inputEl.value = element.qty;

      inputEl.addEventListener("blur", () => {
        const itemQty = inputEl.valueAsNumber;
        element.qty = itemQty;
        console.log("element");
        console.log(element);
        CART.update(element);
      });

      inputEl.addEventListener("focus", (e) => {
        e.target.select();
      });

      const priceEl = itemcopy.querySelector(".price-each span");
      priceEl.textContent = element.price;

      cartcontentEl.appendChild(itemcopy);
    });
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
    //we'll have to read the data from the input field
    /* const inputEl = document.querySelector("#fid-" + obj._id);
    CART.contents[index].qty = inputEl.valueAsNumber; */
    CART.contents[index].qty = obj.qty;
    CART.sync();
  },
};

CART.init();
