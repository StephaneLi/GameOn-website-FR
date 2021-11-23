function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


// DOM Elements
const modalbg = document.querySelector(".bground");
const modalClose = document.querySelectorAll('.close-event');
const modalBody = document.querySelector(".modal-body");
const modalForm = document.querySelector(".modal-body form");
const modalAlert = document.querySelector(".modal-alert");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// DOM required Inputs
const firstnameInput = document.querySelector('#first');
const lastnameInput = document.querySelector('#last');
const emailInput = document.querySelector('#email');
const birthdateInput = document.querySelector('#birthdate');
const quantityInput = document.querySelector('#quantity');
const rules = document.querySelector('#checkbox1');
const citiesCheckbox = document.querySelectorAll('#select-city .checkbox-input');

// Form is send
let formIsSend = false;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.forEach(function (elmnt) {
  elmnt.addEventListener("click", closeModal);
})

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal() {
  modalbg.style.display = "none";

  if (formIsSend) {
    modalForm.classList.remove("form-hidden");
    modalForm.classList.remove("form-fadeout");
    modalAlert.classList.remove("alert-fadein");
    modalForm.reset();
  }
}

// function add data attributes
function addInputError (formData, msg) {
  formData.parentNode.dataset.errorVisible = true;
  formData.parentNode.dataset.error = msg;
}

// function remove data attributes
function removeInputError (formData) {
  delete formData.parentNode.dataset.errorVisible;
  delete formData.parentNode.dataset.error;
}

// function check if 1 radio is selected
function validRadioCity () {  
  let validCity = false;
  
  citiesCheckbox.forEach((elmnt) => {
    // if 1 element is checked return true
    if (elmnt.checked) {
      validCity = true;
    }
  });

  return validCity;
}

// function check characteres min 
function checkInputChar (elmnt, minChar) {
  let validJs = false;
  // check HTML Valid
  const validHtml = elmnt.validity.valid;
  
  // Check JS Valid
  if( elmnt.value.length >= minChar) { 
    validJs = true
  }

  if(validJs && validHtml) {
    return true
  } else {
    return false
  }
}

// function check with regex constraint
function checkInputRegex (elmnt, regex) {
  let validJs = false;
  // check HTML Valid  
  const validHtml = elmnt.validity.valid;

  // Check JS Valid Regex and not empty
  if ( elmnt.value.length >= 0 && regex.test(elmnt.value)) { 
    validJs = true
  }

  if (validJs && validHtml) {
    return true
  } else {
    return false
  }
}

// function check input number 
function checkInputNumber (elmnt) {
  let validJs = false;
  // check HTML Valid  
  const validHtml = elmnt.validity.valid;

  // Check JS Valid Regex and not empty
  if (Number.isInteger(parseInt(elmnt.value))) { 
    validJs = true
  }

  if (validJs && validHtml) {
    return true
  } else {
    return false
  }
}

// function check checkbox 
function checkInputCheckbox (elmnt) {
  let validJs = elmnt.checked;
  // check HTML Valid  
  const validHtml = elmnt.validity.valid;

  if (validJs && validHtml) {
    return true
  } else {
    return false
  }
}

// function send data form 
function sendData() {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const formData = new FormData( modalForm );

  // Set up our request
  XHR.open( "GET", "./index.html" );

  // The data sent is what the user provided in the form
  XHR.send( formData );
}

// validate modal form
function validate(event) {
  event.preventDefault();
  let isValidForm = true;

  // Init objects list with inputs elements and error messages 
  // Double verification : HTML and Javascript
  const listInputsRequired = [
    { node: firstnameInput, msg: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", valid: checkInputChar(firstnameInput, 2) },
    { node: lastnameInput, msg: "Veuillez entrer 2 caractères ou plus pour le champ du nom.", valid: checkInputChar(lastnameInput, 2) },
    { node: emailInput, msg: "Veuillez saisir une adresse mail valide.", valid: checkInputRegex(emailInput, /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) },
    { node: birthdateInput, msg: "Vous devez entrer votre date de naissance.", valid: checkInputRegex(birthdateInput, /^\d{4}[./-]\d{2}[./-]\d{2}$/) },
    { node: quantityInput, msg: "Veuillez renseigner un chiffre entre 0 et 99.", valid: checkInputNumber(quantityInput) },
    { node: citiesCheckbox[0], msg: "Vous devez choisir une option.", valid: validRadioCity(citiesCheckbox) },
    { node: rules, msg: "Vous devez vérifier que vous acceptez les termes et conditions.", valid: checkInputCheckbox(rules) }
  ];

  // Add or Remove data-error attributes
  listInputsRequired.forEach(function (elmnt) {
    if( elmnt.valid === false ) {
      addInputError(elmnt.node, elmnt.msg);
    } else {
      removeInputError(elmnt.node);
    }
  })

  // find if add error in required inputs list 
  listInputsRequired.find(function (elmnt) {
    if(elmnt.valid === false) {
      isValidForm = false;
    }
  })

  // hide modal form and replace by sucessfull message
  // send formData with XMLHttpRequest
  if(isValidForm) {
    modalForm.classList.add("form-fadeout");
    const timer1 = setTimeout(function() {
      modalForm.classList.add("form-hidden");
      modalForm.classList.remove("form-fadeout");
      modalAlert.classList.add("alert-fadein");
      clearTimeout(timer1);
    }, 300)
    formIsSend = true;
    sendData();
  }
  
  return false;
}