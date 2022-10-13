/* ----------- SET PASSWORD OPTIONS AND AT THE CLICK EVENT, GENERATE PASSWORD & SHOW IT START ----------- */
const lengthSlider = document.querySelector(".pass-length input"); //input element about pw length
const options = document.querySelectorAll(".option input"); //option's checkbox
const pwInput = document.querySelector(".input-box input"); //input element that show generated pw
const pwSecureIndicator = document.querySelector(".pass-indicator"); //element about pw security level indicator
const generateBtn = document.querySelector(".generate-btn"); //button to generate pw

//obj of letters, numbers and symbols
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let basicPassword = "";
  let generatedPassword = "";
  let excDuplicate = false;
  let pwLength = lengthSlider.value;

  //for each option's checkbox
  options.forEach((option) => {
    // if checkbox is checked
    if (option.checked) {
      //if checkbox id isn't exc-duplicate && inc-spaces
      if (option.id !== "exc-duplicate" && option.id !== "inc-spaces") {
        //adding particular key value from characters obj to pw
        basicPassword += characters[option.id];

        //if checkbox id is inc-spaces
      } else if (option.id === "inc-spaces") {
        //adding space at the start & end of basicPassword
        basicPassword += `   ${basicPassword}   `;
      }

      //else, pass true value to excDuplicate
      else {
        excDuplicate = true;
      }
    }
  });

  for (let i = 0; i < pwLength; i++) {
    //get random generated characters from basicPassword
    let generatedChar =
      basicPassword[Math.floor(Math.random() * basicPassword.length)];

    //if excDuplicate is true
    if (excDuplicate) {
      /*if the pw does not include the current random generated characters,
        or  the current random generated character is equal to space " "*/
      !generatedPassword.includes(generatedChar) || generatedChar == " "
        ? //then, add random generated characters to generatedPassword
          (generatedPassword += generatedChar)
        : //else, decrement i by -1
          i--;
    }
    //else, add random generated characters to generatedPassword
    else {
      generatedPassword += generatedChar;
    }
  }

  //to show the generated password, pass it to pwInput value
  pwInput.value = generatedPassword;
};

const updatePwSecureIndicator = () => {
  //assign id's value like an attribute of pass-indicator
  pwSecureIndicator.id =
    //if the length slider's value is less than or equal to 8
    lengthSlider.value <= 8
      ? //id's value is weak
        "weak"
      : //if the length slider's value is less than or equal to 16
      lengthSlider.value <= 16
      ? //id's value is medium
        "medium"
      : //else, id's value is strong
        "strong";
};

const updateSlider = () => {
  // show password's length value as counter text
  document.querySelector(".pass-length span").innerHTML = lengthSlider.value;

  //run generatePassword fnc & show generated password
  generatePassword();

  updatePwSecureIndicator();
};

updateSlider();

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
/* ------------ SET PASSWORD OPTIONS AND AT THE CLICK EVENT, GENERATE PASSWORD & SHOW IT END ------------ */
