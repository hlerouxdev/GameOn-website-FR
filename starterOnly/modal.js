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
    this.domElem = _domElem,
    this.errorMessage = _errorMessage
  }
  static createError() {
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
  let errorMessage
  const inputsArray = [...formData];
  // loop checking for empty fields
  for (let i=0; i < 5 ; i++) {
    const value = inputsArray[i].querySelector(".text-control").value;
    console.log(value);
    if(!value) {
      newError = new Inputerror(inputsArray[i], "Ce champs ne peut être vide")
      newError.createError
      valid = false;
    }
  }

  // Checks each field individually for regex conmformity
  if(!regexlist.name.test(inputsArray[0].querySelector(".text-control").value)) {
    errorMessage = new Inputerror(inputsArray[0], "Veuillez entrer un prénom valide")
    errorMessage.createError
    valid = false;
  }
  if(!regexlist.name.test(inputsArray[1].querySelector(".text-control").value)) {
    errorMessage = "Veuillez entrer un nom valide"
    valid = false;
  }
  if(!regexlist.email.test(inputsArray[2].querySelector(".text-control").value)) {
    errorMessage = "Veuillez entrer un email valide"
    valid = false;
  }
  if(!regexlist.date.test(inputsArray[3].querySelector(".text-control").value)) {
    errorMessage = "Veuillez entrer une date valide"
    valid = false;
  }
  if(inputsArray[4].querySelector(".text-control").value === NaN) {
    errorMessage = "Veuillez entrer un nombre"
    valid = false;
  }

  return valid;
};

// Submit form
submitBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  if(checkInputs()) alert('ok');
  // [...formData].forEach( dataset => {
  //   dataset.setAttribute("data-error", "test")
  //   dataset.setAttribute("data-error-visible", "true")
  //   console.log(dataset);
  // })
})