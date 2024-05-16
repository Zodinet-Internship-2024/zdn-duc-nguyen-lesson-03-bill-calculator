export const preventInvalidInput = (event) => {
  if (["e", "E", "+", "-", "."].includes(event.key)) {
    event.preventDefault();
  }
};
export const preventInvalidPaste = (event) => {
  const clipboardData = (event.clipboardData || window.clipboardData).getData(
    "text"
  );

  if (/[eE+\-.]/.test(clipboardData)) {
    event.preventDefault();
  }
};
export const amountDisplay = (tip, total) => {
  tip.innerText = "$0.00";
  console.log(1);
  total.innerText = "$0.00";
};
