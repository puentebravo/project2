document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.log("DOM loaded");
  }
  const loginForm = document.querySelector("#loginButton");
  const emailInput = document.querySelector("#usernameInput");
  const passwordInput = document.querySelector("#passInput");

  loginForm.addEventListener("click", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };
    if (!userData.email || !userData.password) {
      return;
    }
    fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(() => {
        window.location.replace("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
