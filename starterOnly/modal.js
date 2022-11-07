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
document.querySelector(".close").addEventListener("click", closeModal);

// Closes modal form
function closeModal() {
  modalbg.style.display = "none";
};

// regex list 
const regexList = {
  name: /^[a-zA-Z ]+$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  date: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
  number: /^[1-9][0-9]?$|^100$/
};

// error handling
function createError(domElem, regex, inputName) {
  let errorMessage
  if(!domElem.value) errorMessage = "ce champs ne peut pas être vide"
  if(!regex.test(domElem.value)) errorMessage = `veuillez entrer un ${inputName}`
  if(regex.test(domElem.value) && domElem.value) return true
  domElem.setAttribute("data-error", errorMessage)
  domElem.setAttribute("data-error-visible", "true")
  return false
}

function removeError(domElem) {
  domElem.removeAttribute("data-error")
  domElem.removeAttribute("data-error-visible")
};

// form input check
function checkInputs(){
  let valid = true;
  const inputsArray = [...formData];
  //indivudual input declaration
  const formFirstName = inputsArray[0];
  const formLastName = inputsArray[1];
  const formEmail = inputsArray[2]
  const formDate = inputsArray[3];
  const formNumber = inputsArray[4]

  // Checks each field for regex validation
  if(!createError(formFirstName, regexList.name, "prénom valide")) valid = false
  if(createError(!formLastName, regexList.name, "nom valide")) valid =false
  if(!createError(formEmail, regexList.email, "email valide")) valid = false
  if(!createError(formDate, regexList.date, "date valide")) valid = false
  if(!createError(formNumber, regexList.number, "nombre entre 0 et 100")) valid = false

  return valid;
};

// Submit form
submitBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  if(checkInputs()) alert('ok');
})