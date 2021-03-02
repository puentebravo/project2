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

  $("#password, #confirm_password").on("keyup", () => {
    if ($("#password").val() == $("#confirm_password").val()) {
      $("#message").html("Matching").css("color", "green");
    } else {
      $("#message").html("Not Matching").css("color", "red");
    }
  });

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
