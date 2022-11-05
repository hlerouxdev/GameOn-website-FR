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

// form input check
function checkInputs(){
  let valid = true
  const inputsArray = [...formData]
  for (let i=0; i < 5 ; i++) {
    const value = inputsArray[i].querySelector(".text-control").value
    console.log(value);
    if(!value) valid = false
  }
  if (!valid) return alert("Aïe!")
  alert("Ok!")
};

// Submit form
submitBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  checkInputs();
})