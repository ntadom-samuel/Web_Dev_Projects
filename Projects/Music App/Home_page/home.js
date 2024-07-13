"use strict";
const dateElement = document.querySelector(".date");

//////////////////SET AUTOMATIC DATE
const date = new Date();
dateElement.textContent = date.getFullYear();
