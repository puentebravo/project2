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
});
jokeButton.addEventListener("click", () => {
    fetch("https://dad-jokes.p.rapidapi.com/random/joke", {
      method: "GET",
      headers: {
        "x-rapidapid-key": "7ff492a3a5msh5f48e3b32ea7c17p1dcc86jsn96453095ee3b",
        "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
        useQueryString: true,
      },
    }).then((response) => {
      setupEl.value = response.setup;
      punchEl.value = response.punchline;
    });

