document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.log("DOM is loaded");
  }
  const signUpForm = document.getElementById("signBtn");
  const emailInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passVerify");

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

  // function check() {
  //   if (
  //     document.getElementById("passCreate").value ===
  //     document.getElementById("passVerify").value
  //   ) {
  //     document.getElementById("message").style.color = "green";
  //     document.getElementById("message").innerHTML = "matching";
  //   } else {
  //     document.getElementById("message").style.color = "red";
  //     document.getElementById("message").innerHTML = "not matching";
  //   }
  // }
});
