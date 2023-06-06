let number1;
let number2;
let operator;
let result;
let firstNumber = true;
let mainDisplay = document.querySelector('.main');
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
        case '×':
            result = number1 * number2;
            break;
        case '÷':
            result = number1 / number2;
            break;
    }
    return result;
}

function clear(currentInput) {
    if (currentInput === 'C') {
        number1 = undefined;
        firstNumber = true;
        mainDisplay.textContent = '';
        expression.textContent = '';
        return true;
    }
}

function displayInput() {
    const currentInput = this.textContent;
    const lastCharacter = mainDisplay.textContent.charAt(mainDisplay.textContent.length - 1);
    const operators = ['+', '-', '×', '÷'];

    // If input is 'C'
    // If display is showing result of calculation and '=' is selected again
    // If display is empty and operator is selected
    // If last character and current input are both operators
    if (clear(currentInput)
        || (expression.textContent === '' && currentInput === '=')
        || (mainDisplay.textContent === '' && operators.includes(currentInput))
        || (operators.includes(currentInput) && operators.includes(lastCharacter))) {
        return;
    } else if (operators.includes(lastCharacter)) {
        operator = lastCharacter;
    }

    // If operator or '=' is selected then
    if (operators.includes(currentInput) || currentInput === '=') {
        if (firstNumber === true) {
            number1 = parseFloat(mainDisplay.textContent);
            firstNumber = false;
            mainDisplay.textContent += '' + currentInput;
            return;
        } else {
            number2 = parseFloat(mainDisplay.textContent);
        }

        if (number2 !== undefined) {
            result = operate(operator, number1, number2);
            number1 = result;
        }
        
        if (currentInput === '=') {
            firstNumber = true;
            expression.textContent = '';
            mainDisplay.textContent = result;
            return;
        }

        mainDisplay.textContent += ' ' + currentInput;
        return;
    }

    // Replace the whole expression if last character is operator or only '0' is shown
    // Else add inputted number if last character is number
    if (mainDisplay.textContent === '0' || operators.includes(lastCharacter)) {
        expression.textContent = mainDisplay.textContent;
        mainDisplay.textContent = currentInput;
    } else if (!(operators.includes(currentInput) && operators.includes(lastCharacter))) {
        mainDisplay.textContent +=  '' + currentInput;
    }
}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', displayInput));