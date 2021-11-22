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
const modalClose = document.querySelector('.close');
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// DOM required Inputs
const firstnameInput = document.querySelector('#first');
const lastnameInput = document.querySelector('#last');
const emailInput = document.querySelector('#email');
const birthdateInput = document.querySelector('#birthdate');
const quantityInput = document.querySelector('#quantity');
const rules = document.querySelector('#checkbox1')
const citiesCheckbox = document.querySelectorAll('#select-city .checkbox-input');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
}

// validate modal form
function validate() {
  let isValidForm = true

  // Init objects list with inputs elements and error messages 
  const listInputsRequired = [
    { node: firstnameInput, msg: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", valid: firstnameInput.validity.valid },
    { node: lastnameInput, msg: "Veuillez entrer 2 caractères ou plus pour le champ du nom.", valid: lastnameInput.validity.valid },
    { node: emailInput, msg: "Veuillez saisir une acresse mail valide.", valid: emailInput.validity.valid },
    { node: birthdateInput, msg: "Vous devez entrer votre date de naissance.", valid: birthdateInput.validity.valid },
    { node: quantityInput, msg: "Veuillez renseigner un chiffre entre 0 et 99.", valid: quantityInput.validity.valid },
    { node: citiesCheckbox[0], msg: "Vous devez choisir une option.", valid: validRadioCity(citiesCheckbox) },
    { node: rules, msg: "Vous devez vérifier que vous acceptez les termes et conditions.", valid: rules.validity.valid }
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

  return isValidForm;
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
