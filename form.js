// "x-apikey": "60efbcdbcc80e60e1e3b9d4c6803c8b70d0b1",
fetch("https://s2021-8556.restdb.io/rest/testing", {
  method: "GET",
  headers: {
    "x-apikey": "6034ed655ad3610fb5bb655d",
  },
})
  .then((res) => res.json())
  .then((response) => {
    // console.log(response);
    showUsers(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showUsers(users) {
  console.log(users);
  users.forEach((user) => {
    console.log(user);
  });
}

const form = document.querySelector("form");
console.log(form.elements);
form.name.focus();

form.addEventListener("submit", sub);

function sub(e) {
  e.preventDefault();
  form.elements.submit.disabled = true;

  const now = new Date();

  const payload = {
    username: form.elements.name.value,
    email: form.elements.email.value,
  };

  console.log(payload);
  fetch("https://s2021-8556.restdb.io/rest/testing", {
    method: "POST",
    headers: {
      "x-apikey": "6034ed655ad3610fb5bb655d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}
