document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.log("DOM is loaded");
  }
  const signUpForm = document.getElementById("signBtn");
  const emailInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passVerify");
  const firstPass = document.getElementById("passCreate");
  const matchMessage = document.getElementById("message");

  signUpForm.addEventListener("click", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    fetch("/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(() => {
      window.location.replace("/");
    });
  });

  function check() {
    console.log("hello!");
    if (firstPass.value === passwordInput.value) {
      matchMessage.style.color = "green";
      matchMessage.innerHTML = "Passwords Match";
    } else {
      matchMessage.style.color = "red";
      matchMessage.innerHTML = "Passwords do not match";
    }
  }

  firstPass.addEventListener("keyup", check);
  passwordInput.addEventListener("keyup", check);
});
