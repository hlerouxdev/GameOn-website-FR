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
const regexlist = {
  name: /^[a-zA-Z ]+$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  date: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
};

// error class

class Inputerror{
  constructor(_domElem, _errorMessage) {
    this.domElem = _domElem;
    this.errorMessage = _errorMessage;
  }
  createError() {
    console.log("test class method");
    this.domElem.setAttribute("data-error", this.errorMessage)
    this.domElem.setAttribute("data-error-visible", "true")
  }
};

function removeError(domElem) {
  domElem.removeAttribute("data-error")
  domElem.removeAttribute("data-error-visible")
};

// form input check
function checkInputs(){
  let valid = true;
  const inputsArray = [...formData];

  // Checks each field individually for regex conmformity
  if(!regexlist.name.test(inputsArray[0].querySelector(".text-control").value)) {
    const newError = new Inputerror(inputsArray[0], "Veuillez entrer un prénom valide")
    newError.createError()
    valid = false;
  }
  else {
    removeError(inputsArray[0])
  }
  if(!regexlist.name.test(inputsArray[1].querySelector(".text-control").value)) {
    const newError = new Inputerror(inputsArray[1], "Veuillez entrer un nom valide")
    newError.createError()
    valid = false;
  }
  else {
    removeError(inputsArray[2])
  }
  if(!regexlist.email.test(inputsArray[2].querySelector(".text-control").value)) {
    const newError = new Inputerror(inputsArray[2], "Veuillez entrer un email valide")
    newError.createError()
    valid = false;
  }
  else {
    removeError(inputsArray[2])
  }
  if(!regexlist.date.test(inputsArray[3].querySelector(".text-control").value)) {
    const newError = new Inputerror(inputsArray[3], "Veuillez entrer une date valide")
    newError.createError()
    valid = false;
  } else {
    removeError(inputsArray[3])
  }
  if(inputsArray[4].querySelector(".text-control").value === NaN ||
  0 > inputsArray[4].querySelector(".text-control").value > 100) {
    const newError = new Inputerror(inputsArray[4], "Veuillez entrer un nombre")
    newError.createError()
    valid = false;
  } else {
    removeError(inputsArray[4])
  }

  // loop checking for empty fields
  for (let i=0; i < 5 ; i++) {
    const value = inputsArray[i].querySelector(".text-control").value;
    if(!value) {
      console.log("empty");
      const newError = new Inputerror(inputsArray[i], "Ce champs ne peut être vide")
      newError.createError()
      valid = false;
    }
  }

  return valid;
};

// Submit form
submitBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  if(checkInputs()) alert('ok');
})