document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  const createJokeBtn = document.getElementById("jokeSubmit");

  createJokeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked.");

    const newJoke = {
      quote: document.getElementById("jokeQuote").value.trim(),
      author: document.getElementById("jokeAuthor").value.trim(),
      origin: document.getElementById("jokeSource").value.trim(),
    };

    fetch("/api/jokes", {
      method: "POST",
      headers: {
        Accept: "text/html",
        "Content-Type": "text/html",
      },

      body: JSON.stringify(newJoke),
    }).then(() => {
      document.getElementById("jokeQuote").value = "";
      console.log("Created a new joke!");
      location.reload();
    });
  });

  const deleteJokeBtns = document.querySelectorAll(".delete-joke");

  deleteJokeBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");

      fetch(`/api/jokes/${id}`, {
        method: "DELETE",
      }).then((res) => {
        console.log(res);
        console.log(`Deleted joke: ${id}`);

        location.reload();
      });
    });
  });

  const logOutBtn = document.querySelector("#logoutBtn");

  logOutBtn.addEventListener("click", (e) => {
    console.log("Clicked");
    e.preventDefault();
    fetch("/logout", {
      method: "GET",
    }).then((res) => {
      console.log(res, "Logging you out, Shepard.");
      window.location.replace("/");
    });
  });

  const jokeButton = document.getElementById("randButton");
  const punchEl = document.getElementById("punchLineTag");

  jokeButton.addEventListener("click", () => {
    console.log("Clicked");
    fetch("https://icanhazdadjoke.com/", {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        punchEl.value = response;
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
