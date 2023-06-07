let mainDisplay = document.querySelector('.main');
let expression = document.querySelector('.expression');

function clear(currentInput) {
    if (currentInput === 'C') {
        mainDisplay.textContent = '0';
        expression.textContent = '';
        return true;
    }
}

function backspace(currentInput) {
    if (currentInput === '⌫') {
        let length = mainDisplay.textContent.length;
        mainDisplay.textContent = mainDisplay.textContent.slice(0, length - 1);
        return true;
    }
}

function tokenize(expression) {
    const tokens = [];
    let token = '';
    for (let character of expression) {
        if ('^×÷+-'.includes(character)) {
            tokens.push(parseFloat(token), character);
            token = '';
        } else {
            token += character;
        }
    }
    if (token !== '') {
        tokens.push(parseFloat(token));
    }
    return tokens;
}

function calculate(tokens) {
    let operator;
    const operatorPrecedence = [
        {'^': (a, b) => Math.pow(a, b)},
        {'×': (a, b) => a * b, '÷': (a, b) => a / b},
        {'+': (a, b) => a + b, '-': (a, b) => a - b}];
    for (let operators of operatorPrecedence) {
        let newTokens = [];
        for (let token of tokens) {
            if (token in operators) {
                operator = operators[token];
            } else if (operator) {
                newTokens[newTokens.length - 1] = operator(newTokens[newTokens.length - 1], token);
                operator = null;
            } else {
                newTokens.push(token);
            }
        }
        tokens = newTokens;
    }
    return tokens[0];
}

function displayInput() {
    let string;
    let currentInput = this.textContent;
    let lastCharacter = mainDisplay.textContent.charAt(mainDisplay.textContent.length - 1);
    const operators = ['+', '-', '×', '÷', '^'];

    // Stop executing if clear(), backspace() or if it would result with stacking operators
    if (clear(currentInput)
        || backspace(currentInput)
        || (operators.includes(currentInput) && (mainDisplay.textContent === '' || mainDisplay.textContent === '0'))
        || (operators.includes(currentInput) && operators.includes(lastCharacter))) {
        return;
    }

    if (currentInput === '=') {
        string = mainDisplay.textContent;
        expression.textContent = string;
        mainDisplay.textContent = calculate(tokenize(string));
    } else if (mainDisplay.textContent === '0') {
        mainDisplay.textContent = currentInput;
    } else {
        mainDisplay.textContent += '' + currentInput;
    }
}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', displayInput));