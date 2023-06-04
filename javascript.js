let number1;
let number2;
let operator;
let result;
let firstNumber = true;
let display = document.querySelector('.display');
let expression = document.querySelector('.expression');

function operate(operator, number1, number2) {
    let result;
    switch (operator) {
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            result = number1 / number2;
            break;
    }
    return result;
}

function clear(currentInput) {
    if (currentInput === 'C') {
        number1 = undefined;
        firstNumber = true;
        display.textContent = '';
        expression.textContent = '';
        return true;
    }
}

function displayInput() {
    const currentInput = this.textContent;
    const lastCharacter = display.textContent.charAt(display.textContent.length - 1);
    const operators = ['+', '-', '*', '/'];

    // If input is 'C'
    // If display is showing result of calculation and '=' is selected again
    // If display is empty and operator is selected
    // If last character and current input are both operators
    if (clear(currentInput)
        || (expression.textContent === '' && currentInput === '=')
        || (display.textContent === '' && operators.includes(currentInput))
        || (operators.includes(currentInput) && operators.includes(lastCharacter))) {
        return;
    } else if (operators.includes(lastCharacter)) {
        operator = lastCharacter;
    }

    // If operator or '=' is selected then
    if (operators.includes(currentInput) || currentInput === '=') {
        if (firstNumber === true) {
            number1 = parseFloat(display.textContent);
            firstNumber = false;
            display.textContent += ' ' + currentInput;
            return;
        } else {
            number2 = parseFloat(display.textContent);
        }

        if (number2 !== undefined) {
            result = operate(operator, number1, number2);
            number1 = result;
        }
        
        if (currentInput === '=') {
            firstNumber = true;
            expression.textContent = '';
            display.textContent = result;
            return;
        }

        display.textContent += ' ' + currentInput;
        return;
    }

    // Replace the whole expression if last character is operator or only '0' is shown
    // Else add inputted number if last character is number
    if (display.textContent === '0' || operators.includes(lastCharacter)) {
        expression.textContent = display.textContent;
        display.textContent = currentInput;
    } else if (!(operators.includes(currentInput) && operators.includes(lastCharacter))) {
        display.textContent +=  '' + currentInput;
    }
}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', displayInput));