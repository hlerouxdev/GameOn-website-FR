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

function handleError(domElem, regex, errorMessage) {
  const value = domElem.querySelector(".text-control").value
  // if(!value) errorMessage = "ce champs ne peut pas être vide"
  if(regex.test(value) && value) {
    removeError(domElem)
    domElem.setAttribute("data-validated", "true")
    return true
  } else {
    domElem.removeAttribute("data-validated")
    domElem.setAttribute("data-error", errorMessage)
    domElem.setAttribute("data-error-visible", "true")
    return false
  }
};

const inputsArray = [...formData];
//indivudual input declaration
const formFirstName = inputsArray[0];
const formLastName = inputsArray[1];
const formEmail = inputsArray[2]
const formDate = inputsArray[3];
const formNumber = inputsArray[4];
const formCity = inputsArray[5];
const formRead = inputsArray[6];

// form input check
function checkInputs(){
  let valid = true;

  // Checks each field for regex validation
  if(!handleError(formFirstName, regexList.name,
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom.")) valid = false
  if(!handleError(formLastName, regexList.name,
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.")) valid =false
  if(!handleError(formEmail, regexList.email,
    "Veuillez entrer une addresse mail valide.")) valid = false
  if(!handleError(formDate, regexList.date,
    "Vous devez entrer votre date de naissance.")) valid = false
  if(!handleError(formNumber, regexList.number,
    "Vous devez entrer un nombre entre 0 et 99")) valid = false

  // city checkbox check
  let citySelected = false
  formCity.querySelectorAll("input").forEach(input => {
    if(input.checked) citySelected = true
  })
  if(!citySelected) {
    formCity.setAttribute("data-error", "Veuillez sélectionner un ville")
    formCity.setAttribute("data-error-visible", "true")
  } else {
    removeError(formCity)
  }

  // read & agree check
  let readArgreement = false
  console.log(formRead.querySelector("input").checked);
  if(!formRead.querySelector("input").checked) {
    formRead.setAttribute("data-error", "Vous devez vérifier que vous acceptez les termes et conditions.")
    formRead.setAttribute("data-error-visible", "true")
  } else {
    readArgreement = true
    removeError(formRead)
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