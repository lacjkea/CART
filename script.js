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
  console.log(product);
  const tempProd = document.querySelector("#product-template").content;

  const clone = tempProd.cloneNode(true);

  const h2El = clone.querySelector("h2");
  h2El.textContent = product.name;

  const pEl = document.querySelector("p");
  pEl.textContent = product.price;

  btnEl = clone.querySelector("button");
  btnEl.dataset.id += product._id;

  const productsEl = document.querySelector(".products");
  productsEl.appendChild(clone);
}
