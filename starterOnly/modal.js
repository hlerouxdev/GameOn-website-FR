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
const modal = modalbg.querySelector(".content")
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.querySelector(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
};

// Closes modal event
modal.addEventListener("click", (e) => {
  if(e.target.className === "close" || e.target.classList.contains("btn-modal-close")) closeModal();
});

// Closes modal form
function closeModal() {
  modalbg.style.display = "none";
};

// regex list 
const regexList = {
  name: /^[A-Za-zÀ-ÿ]{2,}(([',. -][A-Za-zÀ-ÿ])?[A-Za-zÀ-ÿ]*)$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  date: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
  number: /^[0-9][0-9]?$|^99$/
};

// error handling
function removeError(domElem) {
  domElem.removeAttribute("data-error")
  domElem.removeAttribute("data-error-visible")
};

function createError(domElem, errorMessage) {
  domElem.removeAttribute("data-validated")
  domElem.setAttribute("data-error", errorMessage)
  domElem.setAttribute("data-error-visible", "true")
}

function handleTypeError(domElem, regex, errorMessage) {
  const value = domElem.querySelector(".text-control").value
  if(regex.test(value) && value) {
    removeError(domElem)
    domElem.setAttribute("data-validated", "true")
    return true
  } else {
    createError(domElem, errorMessage);
    return false
  }
};

const inputsArray = [...formData];
//indivudual input declaration
const form = {
  firstName: {
    input: inputsArray[0],
    errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
  },
  lastName:  {
    input: inputsArray[1],
    errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom."
  },
  email: {
    input: inputsArray[2],
    errorMessage: "Veuillez entrer une adresse mail valide."
  },
  date: {
    input: inputsArray[3],
    errorMessage: "Veuillez entrer une date valide."
  },
  number: {
    input: inputsArray[4],
    errorMessage: "Vous devez entrer un nombre entre 0 et 99"
  },
  city: {
    input: inputsArray[5],
    errorMessage: "Veuillez sélectionner une ville"
  },
  read: {
    input: inputsArray[6],
    errorMessage: "Vous devez avoir lu et approuvé les conditions d'utilisation"
  }
}
// form input check
function checkInputs(){
  let valid = true;

  // Checks each field for regex validation
  if(!handleTypeError(form.firstName.input, regexList.name, form.firstName.errorMessage)) valid = false
  if(!handleTypeError(form.lastName.input, regexList.name, form.lastName.errorMessage)) valid =false
  if(!handleTypeError(form.email.input, regexList.email,form.email.errorMessage)) valid = false
  if(!handleTypeError(form.date.input, regexList.date, form.date.errorMessage)) valid = false
  if(!handleTypeError(form.number.input, regexList.number, form.number.errorMessage)) valid = false

  // city checkbox check
  let citySelected = false
  form.city.input.querySelectorAll("input").forEach(input => {
    if(input.checked) citySelected = true
  })
  if(!citySelected) {
    createError(form.city.input, form.city.errorMessage)
  } else {
    removeError(form.city.input)
  }

  // read & agree check
  let readArgreement = false
  console.log(form.read.input.querySelector("input").checked);
  if(!form.read.input.querySelector("input").checked) {
    createError(form.read.input, form.read.errorMessage)
  } else {
    readArgreement = true
    removeError(form.read.input)
  }

  if(!citySelected || !readArgreement) valid = false

  return valid;
};

// Submit form. The anonylous fuynction has been made asynchronous for future promise based code
submitBtn.addEventListener("click", async (e)=>{
  e.preventDefault();
  if(!checkInputs()) {
    console.log("Nein!");
    modal.setAttribute("data-error-animation", "true")
    return setTimeout(() => {
      modal.removeAttribute("data-error-animation")
    }, 1000);
  }

  // fetch request goes here
  //this next part is to be called asynchronuesly after the fetch
  console.log("ok!");

  //DOM modifications, removes the form and creates the confirmation elements
  const modalBody = document.querySelector(".modal-body")
  const modalForm = document.querySelector("form");
  modalForm.style.display = "none";
  

  const modalConfirmation = document.createElement("div");
  modalConfirmation.setAttribute("class", "modal-confirmation");

  const confirmationP = document.createElement("p");
  confirmationP.innerText = "Merci pour votre inscription";

  const confirmationBtn = document.createElement("button");
  confirmationBtn.innerText = "Fermer";
  confirmationBtn.setAttribute("class", "btn-submit btn-modal-close");

  modalConfirmation.appendChild(confirmationP);
  modalConfirmation.appendChild(confirmationBtn);
  modalBody.appendChild(modalConfirmation);

})