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
  formData.map(input => {
    console.log(input.value);
  });
};

// Submit form
modalBtn.addEventListener("click", (e)=>{
  e.preventDefault()
})