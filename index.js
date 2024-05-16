import {
  preventInvalidInput,
  preventInvalidPaste,
  amountDisplay,
} from "./helper.js";

document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.querySelector(".calculator__input-bill");
  const tipButtons = document.querySelectorAll(".calculator__button");
  const customTipInput = document.querySelector(".calculator__input-tip");
  const peopleInput = document.querySelector(".calculator__input-people");
  const tipAmountDisplay = document.querySelector(".calculator__tip-amount h1");
  const totalDisplay = document.querySelector(".calculator__total h1");
  const resetButton = document.querySelector(".calculator__button-reset");
  const inputPeople = document.querySelector(".calculator__people-input");
  const inputBill = document.querySelector(".calculator__bill-input");
  const titleError = document.querySelector(".calculator__people-title-zero");
  const titleErrorBill = document.querySelector(".calculator__bill-title-zero");
  const zero = document.querySelector(".calculator__people-title-zero");
  const zeroBill = document.querySelector(".calculator__bill-title-zero");

  let billValue = 0;
  let tipValue = 0;
  let peopleValue = 0;

  const calculateTip = () => {
    console.log(peopleValue);
    if (peopleValue === 0 || tipValue === 0) {
      tipAmountDisplay.innerText = "$0.00";
      totalDisplay.innerText = "$0.00";

      return;
    }

    const tipAmount = (billValue * tipValue) / 100 / peopleValue;
    const total = billValue / peopleValue + tipAmount;

    tipAmountDisplay.innerText = `$${tipAmount.toFixed(2)}`;
    tipAmountDisplay.title = `$${tipAmount.toFixed(2)}`;
    totalDisplay.innerText = `$${total.toFixed(2)}`;
    totalDisplay.title = `$${total.toFixed(2)}`;
  };

  const inputs = document.querySelectorAll("input[type='number']");
  inputs.forEach((input) => {
    input.addEventListener("keydown", preventInvalidInput);
  });

  billInput.addEventListener("paste", preventInvalidPaste);
  peopleInput.addEventListener("paste", preventInvalidPaste);
  customTipInput.addEventListener("paste", preventInvalidPaste);

  billInput.addEventListener("input", () => {
    billValue = parseFloat(billInput.value) || 0;
    console.log(billValue);
    if (billValue === 0) {
      zeroBill.classList.remove("active");
      inputBill.classList.add("active");
      titleErrorBill.innerText = "Can't  be zero!";
      amountDisplay(tipAmountDisplay, totalDisplay);
      return;
    }
    if (billValue >= 0) {
      inputBill.classList.remove("active");
      zeroBill.classList.add("active");
    }
    calculateTip();
  });

  tipButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      tipButtons.forEach((btn) => btn.classList.remove("active"));
      event.target.classList.add("active");
      tipValue = parseFloat(event.target.innerText) || 0;
      customTipInput.value = "";
      calculateTip();
    });
  });

  customTipInput.addEventListener("input", () => {
    tipValue = parseFloat(customTipInput.value) || 0;
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    calculateTip();
  });

  peopleInput.addEventListener("input", () => {
    peopleValue = parseFloat(peopleInput.value) || 0;
    if (peopleValue === 0) {
      titleError.innerText = "Can't  be zero!";
      inputPeople.classList.add("active");
      zero.classList.remove("active");
      amountDisplay(tipAmountDisplay, totalDisplay);

      return;
    }

    if (peopleValue >= 0) {
      inputPeople.classList.remove("active");
      zero.classList.add("active");
    }

    calculateTip();
  });

  resetButton.addEventListener("click", () => {
    billInput.value = "";
    customTipInput.value = "";
    peopleInput.value = "";
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    billValue = 0;
    tipValue = 0;
    peopleValue = 1;
    amountDisplay(tipAmountDisplay, totalDisplay);
    inputPeople.classList.remove("active");
    zero.classList.add("active");
  });
});
