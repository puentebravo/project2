document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  const createJokeBtn = document.getElementById("create-form");

  if (createJokeBtn) {
    createJokeBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      const newJoke = {
        name: document.getElementById("ca").value.trim(),
        sleepy: document.getElementById("sleepy").checked,
      };

      fetch("/api/jokes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newJoke),
      }).then(() => {
        document.getElementById("ca").value = "";
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
