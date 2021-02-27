const loginButton = document.querySelector(".");
const searchButton = document.querySelector(".");
const addButton = document.querySelector(".");
const authorCheck = document.querySelector(".");
const saveButton = document.querySelector(".");
const deleteButton = document.querySelector(".");

loginButton.addEventListener("click", () => {
  fetch("/api/login",{
    email: email,
    password:password
  }).then(() => {
    window.location.replace("/");
  }).catch((err) => {
      console.log(err);
  });
});

searchButton.addEventListener("click", () => {
  const id = e.targetGetAttribute()
  fetch(`/api/joke/${id}`,{
    method: "GET",
  }).then(() => {
      
  });
});

addButton.addEventListener("submit", (e) => {
  e.preventDefault();

  const newJoke = {};

  fetch("/api/joke", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJoke),
  }).then(() => {
    document.getElementById("").value = "";
    console.log("Created new joke!");
    location.reload();
  });
});

authorCheck.addEventListener("click", () => {});

saveButton.addEventListener("click", () => {});

deleteButton.addEventListener("click", (e) => {
  const id = e.targetGetAttribute();

  fetch(`/api/jokes/${id}`, {
    method: "DELETE",
  }).then((res) => {
    console.log(res);
    console.log(`Deleted Joke: ${id}`);
  });
  location.reload();
});
