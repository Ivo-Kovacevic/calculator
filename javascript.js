let number1;
let number2;
let operator;
let checkIfCalculated = false;
let result;
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
        checkIfCalculated = false;
        display.textContent = '';
        expression.textContent = '';
        return true;
    }
}

function firstInputtedNumber(currentInput, operator, operators) {
    if (number1 === undefined && operators.includes(currentInput)) {
        number1 = parseInt(display.textContent);
        console.log(number1);
        display.textContent += ' ' + currentInput;
        operator = currentInput;
        return true;
    } else if (display.textContent === '0' && currentInput === '0') {
        return true;
    }
}

function displayInput() {
    const currentInput = this.textContent;
    const lastCharacter = display.textContent.charAt(display.textContent.length - 1);
    const operators = ['+', '-', '*', '/'];

    // Clear display
    if (clear(currentInput)) {
        return;
    }

    // Return if last character and current input are both operators so operators don't stack
    if (operators.includes(lastCharacter) && operators.includes(currentInput)) {
        return;
    }

    // If last character is operator save it as operator
    if (operators.includes(lastCharacter)) {
        operator = lastCharacter;
    }

    // Check for first inputted number
    if (firstInputtedNumber(currentInput, operator, operators)) {
        return;
    }
    
    // After first number has been inputted
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
    } else if (!operators.includes(currentInput) && !operators.includes(lastCharacter)) {
        display.textContent +=  '' + currentInput;
    }
}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', displayInput));