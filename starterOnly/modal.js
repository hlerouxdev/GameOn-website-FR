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
  date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
};

// form input check
function checkInputs(){
  let valid = true;
  const inputsArray = [...formData];
  // loop checking for empty fields
  for (let i=0; i < 5 ; i++) {
    const value = inputsArray[i].querySelector(".text-control").value;
    console.log(value);
    if(!value) valid = false;
  }

  // Checks each field individually for regex conmformity
  if(!regexlist.name.test(inputsArray[0].querySelector(".text-control").value)) valid = false;
  if(!regexlist.name.test(inputsArray[1].querySelector(".text-control").value)) valid = false;
  if(!regexlist.email.test(inputsArray[2].querySelector(".text-control").value)) valid = false;
  if(!regexlist.date.test(inputsArray[3].querySelector(".text-control").value)) valid = false;
  if(inputsArray[4].querySelector(".text-control").value === NaN) valid = false;

  return valid;
};

// Submit form
submitBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  checkInputs()? alert('ok') : alert('non');
})