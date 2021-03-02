document.addEventListener("DOMContentLoaded", (event) => {
  const passport = require("passport");
  if (event) {
    console.info("DOM loaded");
  }
  console.log(passport.id);

  const createJokeBtn = document.getElementById("create-form");

  if (createJokeBtn) {
    createJokeBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      const newJoke = {
        quote: document.getElementById("jokeQuote").value.trim(),
        origin: document.getElementById("jokeSource").value.trim(),
      };

      fetch("/api/jokes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newJoke),
      }).then(() => {
        document.getElementById("jokeQuote").value = "";
        console.log("Created a new joke!");
        location.reload();
      });
    });
  }

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
});
