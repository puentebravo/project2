$(document).ready(() => {
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password,
    })
      .then((data) => {
        window.location.replace("/members");
      })
      .catch(handleLoginErr);
  }

  const check = function () {
    if (
      document.getElementById("passCreate").value ==
      document.getElementById("passVerify").value
    ) {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerHTML = "matching";
    } else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTML = "not matching";
    }
  };

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
