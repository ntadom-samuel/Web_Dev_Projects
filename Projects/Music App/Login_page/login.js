//MODULES
const User = require("../app");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const loginHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Lato&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,600&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Tilt+Neon&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="login.css" />
    <script defer src="login.js"></script>
    <!-- <script type="module" src="login.js"></script> -->

    <title>Login Page</title>
  </head>
  <body>
    <main class="container main-container">
      <article class="login-container">
        <header class="brand-title">SpotyGram</header>
        <p class="welcoming-text">Stram music with firends</p>
        <form class="form">
          <input
            class="inputs"
            id="username-input"
            placeholder="username"
            type="text"
          />
          <input
            class="inputs"
            id="password-input"
            placeholder="password"
            type="password"
          />
          <button class="advance-button" data-advance-type="login">
            login
          </button>
          <a class="advance-type">sign up</a>
        </form>
      </article>
    </main>
    <footer class="footer container">
      <div class="footer-items-container">
        <span class="footer-text">Music App</span>
        <span class="footer-text"
          >Samuel Ntadom's Hackathon Project. &copy;
          <span class="date">DATE</span></span
        >
      </div>
    </footer>
  </body>
</html>

<!-- uncomment code above -->
`;

//DOME ELEMENTS
//TODO: FIX THIS
const input_username = new JSDOM(loginHtml).window.document.querySelector(
  "#username-input"
);
const input_password = new JSDOM(loginHtml).window.document.querySelector(
  "#password-input"
);
const form = new JSDOM(loginHtml).window.document.querySelector(".form");
const advance_button = new JSDOM(loginHtml).window.document.querySelector(
  ".advance-button"
);
const advance_type = new JSDOM(loginHtml).window.document.querySelector(
  ".advance-type"
);
const dateElement = new JSDOM(loginHtml).window.document.querySelector(".date");

console.log(advance_button);

//////////////////SET AUTOMATIC DATE
const date = new Date();
dateElement.textContent = date.getFullYear();

////////////////INPUTS

////Retrieving inputs
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (input_username.value != "" && input_password.value != "") {
    //open user's page

    //create user profiile in database
    input_username.value = "";
    input_password.value = "";
    console.log("done!");
  }
});

///////////////LOGIN BUTTON
//LOGIN BUTTON
advance_button.addEventListener("click", function (e) {
  if (advance_button.dataset.advanceType == "login") {
    console.log(input_password);
    console.log(input_username);
    //check if user has an account
    //if yes
    //Send users stored data to web page
  }

  if (advance_button.dataset.advanceType == "sign up") {
    //check if user has an account
    //if yes
    //send an alert
    // else
    //Create a database
    // controllers.createUserProfile(input_username.value, input_password.value);
    //open user's page);
    //send user to the web page for selecting songs
  }
});

//Takes user to login or sign up page
advance_type.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("clicked", advance_type.textContent.toLowerCase());

  advance_button.textContent = advance_type.textContent;
  advance_type.textContent = advance_button.dataset.advanceType;
  advance_button.dataset.advanceType = advance_button.textContent;
});

//TODO: Save data on click login then login
//TODO: Save data on appropriate sign up then login.
