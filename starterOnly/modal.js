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

//removes the error message
function removeError(domElem) {
  domElem.removeAttribute("data-error")
  domElem.removeAttribute("data-error-visible")
};

// creates the error message
function createError(domElem, errorMessage) {
  domElem.removeAttribute("data-validated")
  domElem.setAttribute("data-error", errorMessage)
  domElem.setAttribute("data-error-visible", "true")
}

//checks if the a string/digit input follows a given regex
function handleError({domElem, inputType, errorMessage, regex}) {
  let value
  if (inputType === "text") { //verification for text inputs
    value = domElem.querySelector(".text-control").value
    if(!regex.test(value) || !value) {
      createError(domElem, errorMessage);
      return false
    }
  }
  if (inputType === "checkbox") {
    value = domElem.querySelector("input").checked
    console.log("read ", domElem.querySelector("input"));
    if (!value) {
      createError(domElem, errorMessage);
      return false
    }
  }
  if (inputType === "checkboxgroup") {
    boxes = domElem.querySelectorAll("input")
    let checked = false
    boxes.forEach( input => {
      console.log(input);
      if(input.checked) checked = true
    })
    if(!checked) {
      createError(domElem, errorMessage);
      return false 
    }
  }

  removeError(domElem)
  domElem.setAttribute("data-validated", "true")
  return true
};

//indivudual input declaration
const form = {
  firstName: {
    domElem: [...formData][0],
    inputType: "text",
    regex: regexList.name,
    errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
  },
  lastName:  {
    domElem: [...formData][1],
    inputType: "text",
    regex: regexList.name,
    errorMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom."
  },
  email: {
    domElem: [...formData][2],
    inputType: "text",
    regex: regexList.email,
    errorMessage: "Veuillez entrer une adresse mail valide."
  },
  date: {
    domElem: [...formData][3],
    inputType: "text",
    regex: regexList.date,
    errorMessage: "Veuillez entrer une date valide."
  },
  number: {
    domElem: [...formData][4],
    inputType: "text",
    regex: regexList.number,
    errorMessage: "Vous devez entrer un nombre entre 0 et 99"
  },
  city: {
    domElem: [...formData][5],
    inputType: "checkboxgroup",
    errorMessage: "Veuillez sélectionner une ville"
  },
  read: {
    domElem: [...formData][6],
    inputType: "checkbox",
    errorMessage: "Vous devez avoir lu et approuvé les conditions d'utilisation"
  }
};

//Inconclusive input change event listener
// [...form].forEach(elem => {
//   elem.addEventListener("change", handleError(elem))
// })
// form input check

function checkInputs(){
  let valid = true

  // Checks each field for regex validation
  if(!handleError(form.firstName)) valid = false
  if(!handleError(form.lastName)) valid =false
  if(!handleError(form.email)) valid = false
  if(!handleError(form.date)) valid = false
  if(!handleError(form.number)) valid = false

  // checkbox validation
  let citySelected = handleError(form.city)
  let readArgreement = handleError(form.read)
  if(!citySelected || !readArgreement) valid = false

  return valid;
};

// Submit function
submitBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  if(!checkInputs()) return

  // fetch request goes here
  //this next part is to be called asynchronuesly after the fetch
  const modalForm = document.querySelector("form");
  modalForm.style.display = "none";

  // The validation is being called after the timeout but it can be reworked so that the loader only appears during an actual loading time
  createLoader(document.querySelector(".modal-body"))
  createValidation(document.querySelector(".modal-body"))
})

//DOM modifications, removes the form and creates the confirmation elements

function createValidation(parentElem) {
  const loader = parentElem.querySelector(".loader")
  if(loader) parentElem.removeChild(loader)
  
  const modalConfirmation = document.createElement("div");
  modalConfirmation.setAttribute("class", "modal-confirmation");
  
  const confirmationP = document.createElement("p");
  confirmationP.innerText = "Merci pour votre inscription";
  
  const confirmationBtn = document.createElement("button");
  confirmationBtn.innerText = "Fermer";
  confirmationBtn.setAttribute("class", "btn-submit btn-modal-close");
  
  modalConfirmation.appendChild(confirmationP);
  modalConfirmation.appendChild(confirmationBtn);
  parentElem.appendChild(modalConfirmation);
};