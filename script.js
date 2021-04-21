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
  btnEl.dataset.id += product._id;

  const productsEl = document.querySelector(".products");
  productsEl.appendChild(clone);
}

const CART = {
  contents: [],
  init() {
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
        _id: "2",
        img: "nonoe",
        qty: 2,
        name: "Hej there",
        price: 500,
      },
    ];
    this.updateDOM();
  },
  updateDOM() {
    CART.contents.forEach((element) => {
      console.log(element);

      const tempItem = document.querySelector("#cart-item-template").content;
      const itemcopy = tempItem.cloneNode(true);

      const labelEl = itemcopy.querySelector("label");
      labelEl.textContent = element.name;
      labelEl.setAttribute("for", element.name);

      const inputEl = itemcopy.querySelector("input");
      inputEl.id += element.id;
      inputEl.name = element.name;

      inputEl.value = element.qty;

      const priceEl = itemcopy.querySelector(".price-each span");
      priceEl.textContent = element.price;

      const cartcontentEl = document.querySelector(".cart-content");
      cartcontentEl.appendChild(itemcopy);
    });
  },
};

CART.init();
