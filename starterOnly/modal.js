function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function validRadioCity () {  
  let validCity = false;
  
  cityCheckbox.forEach((elmnt) => {
    // if 1 element is checked return true
    if (elmnt.checked) {
      validCity = true;
    }
  });
  return validCity;
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalClose = document.querySelector('.close');
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// DOM Forms inputs
const cityCheckbox = document.querySelectorAll('#select-city .checkbox-input');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
}

// validate modal form
function validate() {
  // All label are controlled by HTML5 validate rules
  // Check if 1 radio is selected
  const validRadio = validRadioCity();

  if(validRadio) {
    return true;
  } else {
    return false;
  }
}