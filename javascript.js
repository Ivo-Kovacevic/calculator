let number1;
let number2;
let operator;
let checkIfCalculated = false;
let result;
let display = document.querySelector('.display');

function operate(operator, number1, number2) {
    let result;
    switch (operator) {
        case '+':
            result = add(number1, number2);
            break;
        case '-':
            result = subtract(number1, number2);
            break;
        case '*':
            result = multiply(number1, number2);
            break;
        case '/':
            result = divide(number1, number2);
            break;
    }
    return result;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function displayInput() {
    const currentInput = this.textContent;
    const lastCharacter = display.textContent.charAt(display.textContent.length - 1);
    const operators = ['+', '-', '*', '/'];

    if (operators.includes(lastCharacter)) {
        operator = lastCharacter;
    }

    // Check for first inputed number
    if (number1 === undefined && operators.includes(currentInput)) {
        number1 = parseInt(display.textContent);
        console.log(number1);
        display.textContent += ' ' + currentInput;
        operator = currentInput;
        return;
    } 
    
    // After first number has been inputed
    if (operators.includes(currentInput) || currentInput == '=') {
        if (checkIfCalculated === true) {
            number1 = parseInt(display.textContent);
            checkIfCalculated = false;
            display.textContent += ' ' + currentInput;
            return;
        } else {
            number2 = parseInt(display.textContent);
        }
        result = operate(operator, number1, number2);
        number1 = result;
        if (currentInput == '=') {
            checkIfCalculated = true;
            display.textContent = result;
            return;
        }
        display.textContent += ' ' + currentInput;
        return;
    }

    // Add inputed number if last character is number
    // Or replace the whole expression if last character is operator
    if (!operators.includes(currentInput) && !operators.includes(lastCharacter)) {
        display.textContent = display.textContent + '' + currentInput;
    } else if (operators.includes(lastCharacter)) {
        display.textContent = currentInput;
    }
}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', displayInput));