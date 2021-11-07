const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id *= number]');
const operators = document.querySelectorAll('[id *= operator]');

let newNumber = true;
let operator;
let previousNumber;


const pendingOperation = () => operator != undefined;

const calculate = () => {
    if(pendingOperation()){
        const currNumber = parseFloat(display.textContent.replace(',','.'));
        newNumber = true;

        const result = eval(`${previousNumber}${operator}${currNumber}`);
        updateDisplay(result)

        /*if(operator == '+'){
            updateDisplay(previousNumber + currNumber)
        } else if(operator ==  '-'){
            updateDisplay(previousNumber - currNumber)
        } else if(operator ==  '*'){
            updateDisplay(previousNumber * currNumber)
        } else if(operator ==  '/'){
            updateDisplay(previousNumber / currNumber)
        }
        */
    }
}

const updateDisplay = (text) => {
    if(newNumber){
        display.textContent = text.toLocaleString('BR');
        newNumber = false;
    } else {
        display.textContent += text.toLocaleString('BR');
    }

}

const insertNum = (event) => {
    updateDisplay(event.target.textContent)
}

numbers.forEach(num => num.addEventListener('click', insertNum))

const selectOperator = (event) => {
    if(!newNumber){
        calculate()
        newNumber = true;
        operator = event.target.textContent;
        previousNumber = parseFloat(display.textContent.replace(',','.'));
    }
}

operators.forEach((oper) =>
    oper.addEventListener('click', selectOperator)
)

const equalActive = () => {
    calculate();
    operator = undefined;
}

document.getElementById('equal').addEventListener('click', equalActive);

const cleanDisplay = () => {
    display.textContent = ''
}

document.getElementById('cleanDisplay').addEventListener('click', cleanDisplay);

const cleanCalculation = () => {
    cleanDisplay();
    operator = undefined;
    newNumber = true;
    previousNumber = undefined;
}

document.getElementById('cleanCalculation').addEventListener('click', cleanCalculation);

const removeLast = () => {
    display.textContent = display.textContent.slice(0, -1)
}

document.getElementById('backspace').addEventListener('click', removeLast)

const reverseNum = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1)
}

document.getElementById('reverse').addEventListener('click', reverseNum);

const commaExist = () => display.textContent.indexOf(',') !== -1;

const valueExist = () => display.textContent.length > 0;

const insertComma = () => {
    if(!commaExist()){
        if(valueExist()){
            updateDisplay(',');
        } else {
            updateDisplay('0,');
        }
    }
}

document.getElementById('comma').addEventListener('click', insertComma);

//keyboard

const keyboard = {
    '0' : 'number0',
    '1' : 'number1',
    '2' : 'number2',
    '3' : 'number3',
    '4' : 'number4',
    '5' : 'number5',
    '6' : 'number6',
    '7' : 'number7',
    '8' : 'number8',
    '9' : 'number9',
    '+' : 'operator_addition',
    '-' : 'operator_subtraction',
    '*' : 'operator_multiply',
    '/' : 'operator_division',
    '=' : 'equal',
    'Enter' : 'equal',
    'Backspace' : 'backspace',
    'c' : 'cleanDisplay',
    'Escape' : 'cleanCalculation',
    ',' : 'comma'

}

const keyboardMap = (event) => {
    const keyboardKey = event.key;

    const grantedKey = () =>  Object.keys(keyboard).indexOf(keyboardKey) != -1;
    if(grantedKey) document.getElementById(keyboard[keyboardKey]).click();
    
}

document.addEventListener('keydown', keyboardMap)