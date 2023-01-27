const currencyElementOne = document.querySelector("#currency-one");
const currencyElementTwo = document.querySelector("#currency-two");
const amountElementOne = document.querySelector("#amount-one");
const amountElementTwo = document.querySelector("#amount-two");
const rate = document.querySelector("#rate");
const swapBtn = document.querySelector("#swap");

function calculate() {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/79b36e8488d90c8375350ecc/latest/${currencyOne}`
  )
    .then((response) => response.json())
    .then((data) => {
      rate.innerHTML = `1 ${currencyOne} = ${data.conversion_rates[currencyTwo]} ${currencyTwo}`;
      amountElementTwo.value =
        amountElementOne.value * data.conversion_rates[currencyTwo];
    });
}

currencyElementOne.addEventListener("change", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementOne.addEventListener("input", calculate);
amountElementTwo.addEventListener("input", calculate);
swapBtn.addEventListener("click", () => {
  let swap = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = swap;
  calculate();
});

calculate();
