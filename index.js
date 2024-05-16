document.addEventListener('DOMContentLoaded', () => {

    const billInput = document.querySelector('.calculator__input-bill');
    const tipButtons = document.querySelectorAll('.calculator__button');
    const customTipInput = document.querySelector('.calculator__input-tip');
    const peopleInput = document.querySelector('.calculator__input-people');
    const tipAmountDisplay = document.querySelector('.calculator__tip-amount h1');
    const totalDisplay = document.querySelector('.calculator__total h1');
    const resetButton = document.querySelector('.calculator__button-reset');
    const inputPeople  =document.querySelector('.calculator__people-input');
    
    const zero  =document.querySelector('.calculator__people-title-zero');

    let billValue = 0;
    let tipValue = 0;
    let peopleValue = 0;

    const calculateTip = () => {
        if (peopleValue === 0) {
            tipAmountDisplay.innerText = '$0.00';
            totalDisplay.innerText = '$0.00';
            // inputPeople.classList.add('active');
            // zero.classList.remove('active');
            return;
        }
        // if (peopleValue >= 0) {
        //     inputPeople.classList.remove('active');
        //     zero.classList.add('active');
        // }

        const tipAmount = (billValue * tipValue) / 100 / peopleValue;
        const total = (billValue / peopleValue) + tipAmount;

        tipAmountDisplay.innerText = `$${tipAmount.toFixed(2)}`;
        totalDisplay.innerText = `$${total.toFixed(2)}`;
    };
    const extractNumbers = (input) => {

        const numbers = input.match(/\d+/g);

        return numbers ? numbers.join('') : '';
    };
    const preventInvalidInput = (event) => {
        if (['e', 'E', '+', '-', '.'].includes(event.key)) {
            event.preventDefault();
        }
    };
    const preventInvalidPaste = (event) => {
        // Lấy dữ liệu từ clipboard
        const clipboardData = (event.clipboardData || window.clipboardData).getData('text');
        // Kiểm tra xem dữ liệu có chứa các ký tự không hợp lệ không
        console.log(clipboardData);
        const output = extractNumbers(clipboardData);
        console.log(output);
        if (/[eE+\-.]/.test(clipboardData)) {
            event.preventDefault();
        }
    };
    billInput.addEventListener('paste', preventInvalidPaste);
    billInput.addEventListener('keydown', preventInvalidInput);
    peopleInput.addEventListener('keydown', preventInvalidInput);

    billInput.addEventListener('input', () => {
        console.log(billInput.value);
        billValue = parseFloat(billInput.value) || 0;
        calculateTip();
    });

    tipButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            tipButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            tipValue = parseFloat(event.target.innerText) || 0;
            customTipInput.value = '';
            calculateTip();
        });
    });

    customTipInput.addEventListener('input', () => {
        tipValue = parseFloat(customTipInput.value) || 0;
        tipButtons.forEach(btn => btn.classList.remove('active'));
        calculateTip();
    });

    peopleInput.addEventListener('input', () => {
        peopleValue = parseFloat(peopleInput.value) || 0;
        if (peopleValue === 0) {
            inputPeople.classList.add('active');
            zero.classList.remove('active');
            tipAmountDisplay.innerText = '$0.00';
            totalDisplay.innerText = '$0.00';
            return;
        }
        if (peopleValue >= 0) {
            inputPeople.classList.remove('active');
            zero.classList.add('active');
        }

     
        calculateTip();
    });

    resetButton.addEventListener('click', () => {
        billInput.value = '';
        customTipInput.value = '';
        peopleInput.value = '';
        tipButtons.forEach(btn => btn.classList.remove('active'));
        billValue = 0;
        tipValue = 0;
        peopleValue = 1;
        tipAmountDisplay.innerText = '$0.00';
        totalDisplay.innerText = '$0.00';
    });
});

