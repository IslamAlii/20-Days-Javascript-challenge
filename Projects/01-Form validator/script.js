let authForm = document.querySelector(".auth-form"),
  formInputs = document.querySelectorAll(".auth-form input"),
  errorSpaces = document.querySelectorAll(".error-message");

// authForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   formInputs.forEach((input, index) => {
//     checkingInputValue(input, index);
//   });
// });

// formInputs.forEach((input, index) => {
//   input.addEventListener("blur", () => {
//     checkingInputValue(input, index);
//   });
// });

// formInputs.forEach((input, index) => {
//   input.addEventListener("keyup", () => {
//     checkingInputValue(input, index);
//   });
// });

// function checkingInputValue(input, index) {
//   if (input.value === "") {
//     showErrorMessage(input, `${getFieldName(input)} is required`, index);
//   } else {
//     if (input.id === "name") {
//       checkInputValueLength(input, 2, 25, index);
//     } else if (input.id === "email") {
//       if (isValidEmail(input.value)) {
//         removeErrorMessage(input);
//       } else {
//         showErrorMessage(input, `Email is not valid`, index);
//       }
//     } else if (input.id === "password") {
//       checkInputValueLength(input, 8, 16, index);
//     } else if (input.id === "confirm-password") {
//       checkPasswordsMatching(formInputs[2], input, index);
//     } else {
//       removeErrorMessage(input);
//     }
//   }
// }

// function showErrorMessage(input, message, index) {
//   input.parentElement.classList.add("error");
//   errorSpaces[index].innerHTML = message;
// }

// function removeErrorMessage(input) {
//   input.parentElement.classList.remove("error");
// }

// function getFieldName(input) {
//   if (input.id.includes("-")) {
//     return (
//       input.id.charAt(0).toUpperCase() + input.id.slice(1).replaceAll("-", " ")
//     );
//   } else {
//     return input.id.charAt(0).toUpperCase() + input.id.slice(1);
//   }
// }

// function checkInputValueLength(input, min, max, index) {
//   if (input.value.length < min) {
//     showErrorMessage(
//       input,
//       `${getFieldName(input)} must be at least ${min} characters`,
//       index
//     );
//   } else if (input.value.length > max) {
//     showErrorMessage(
//       input,
//       `${getFieldName(input)} must be less than ${max} characters`,
//       index
//     );
//   } else {
//     removeErrorMessage(input);
//   }
// }

// function checkPasswordsMatching(password, confirmedPassword, index) {
//   if (password.value !== confirmedPassword.value) {
//     showErrorMessage(confirmedPassword, `Passwords do not match`, index);
//   } else {
//     removeErrorMessage(confirmedPassword);
//   }
// }

// function isValidEmail(email) {
//   return email.match(
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   );
// }

function formValidator(form) {
  const index = form.className.includes(" ")
      ? form.className.indexOf(" ")
      : form.className.length,
    formClass = form.className.slice(0, index),
    inputs = document.querySelectorAll(`.${formClass} input`);

  inputs.forEach((input, index) => validateInput(form, input, index));
}

function validateInput(form, input, index) {
  const classEndIndex = form.className.includes(" ")
      ? form.className.indexOf(" ")
      : form.className.length,
    formClass = form.className.slice(0, classEndIndex),
    formControls = document.querySelectorAll(`.${formClass} .form-control`),
    errorMessages = document.querySelectorAll(`.${formClass} .error-message`),
    value = input.value,
    min = input.dataset.min,
    max = input.dataset.max,
    email = input.dataset.email,
    password = input.dataset.password,
    confirmPassword = input.dataset.confirmPassword;
  if (value) {
    formControls[index].classList.remove("error");

    if ((min, max)) {
      if (value.length < min || value.length > max) {
        formControls[index].classList.add("error");
        errorMessages[index].innerHTML = `${getFieldName(
          input.id
        )} must be more than ${
          min - 1 === 1 ? `${min - 1} letter` : `${min - 1} letters`
        } and less than ${max} letters`;
      } else {
        formControls[index].classList.remove("error");
      }
    }

    if (email) {
      isValidEmail(value)
        ? formControls[index].classList.remove("error")
        : formControls[index].classList.add("error");
      errorMessages[index].innerHTML = `${getFieldName(input.id)} is not valid`;
    }

    if (password) {
      const confirmPassword = document.getElementById("confirm-password");
      if (value.length < 8) {
        formControls[index].classList.add("error");
        errorMessages[index].innerHTML = `${getFieldName(
          input.id
        )} must be 8 characters or more`;
      }
      if (confirmPassword.value.length > 0) {

        if (confirmPassword.value !== value) {
          formControls[index + 1].classList.add("error");
          errorMessages[index + 1].innerHTML = `Password not match`;
        }
      }
    }

    if (confirmPassword) {
      const password = document.getElementById("password").value;
      if (value !== password) {
        formControls[index].classList.add("error");
        errorMessages[index].innerHTML = `Password not match`;
      }
    }
  } else {
    formControls[index].classList.add("error");
    errorMessages[index].innerHTML = `${getFieldName(input.id)} is required`;
  }
}

function getFieldName(name) {
  if (name.includes("-")) {
    return name.charAt(0).toUpperCase() + name.slice(1).replaceAll("-", " ");
  } else {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}

function isValidEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

authForm.addEventListener("submit", () => formValidator(authForm));
formInputs.forEach((input, index) =>
  input.addEventListener("input", () => {
    validateInput(authForm, input, index);
  })
);
