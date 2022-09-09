// COMMENTS FOR DOCUMENTATION SKIPPED IN THIS PROJECT

const buttonList = document.getElementsByClassName('number');
const operatorList = document.getElementsByClassName('operator');
const buttonTotal = document.getElementById('btn-total');
const buttonAllClear = document.getElementById('btn-all-clear');
buttonAllClear.addEventListener('click', allClear);
const buttonClear = document.getElementById('btn-clear');
buttonClear.addEventListener('click',clearButton);
buttonTotal.addEventListener('click', clickedTotal);
let totalClicked = false;
const screenFirstOperand = document.getElementById('first-operand');
const screenOperator = document.getElementById('screen-operator');
const screenSecondOperand = document.getElementById('second-operand');
const screenTotal = document.getElementById('p-total');
let firstOperand = "";
let secondOperand = "";
let currentOperand = "";
let currentOperator = "";
let total = "";

try {
  Array.from(buttonList).forEach(btn => {
    btn.addEventListener('click', setOperands);
  })
  Array.from(operatorList).forEach(opt => {
    opt.addEventListener('click', setOperator);
  })
} catch(err) {
  console.log(err);
}

function setOperands(e) {
  try {
    if(firstOperand === "") currentOperand = 1;
    if(currentOperand === 1) {
      if(this.getAttribute('value') === '.' || this.getAttribute('value') === '0') {
        firstOperand = nonNumber(this.getAttribute('value'), firstOperand);
      } else {
        firstOperand === '0' ? firstOperand = this.getAttribute('value') : firstOperand += this.getAttribute('value');
      }
    } else {
      if(this.getAttribute('value') === '.' || this.getAttribute('value') === '0') {
        secondOperand = nonNumber(this.getAttribute('value'), secondOperand);
      } else {
        secondOperand === '0' ? secondOperand = this.getAttribute('value') : secondOperand += this.getAttribute('value');
      }
    }
    setScreen();
  } catch(err) {
    console.log(err);
  }
}

function nonNumber(val, operand) {
  if(val === '.') {
    if(Array.from(operand).includes('.')) return operand;
    if(operand === '0'){
      operand = `0.`
    } else {
      operand = `${operand}.`;
    }
  } else {
    if(operand === '0') {
      operand = '0';
    } else {
      operand += '0';
    }
  }
  return operand;
}

function setOperator(e) {
  if(secondOperand === "") {
    currentOperand = 2;
    currentOperator = this.getAttribute('value');
  }

  if(secondOperand !== "") computeTotal(this.getAttribute('value'));

  setScreen();
}

function clickedTotal() {
  if(secondOperand === "") return;
  console.log('running here');
  changeTotalStatus();
  computeTotal();
}

function changeTotalStatus() {
  totalClicked = !totalClicked;
}


function computeTotal() {
  try {
    switch(currentOperator) {
      case '/':
        total = Number(firstOperand) / Number(secondOperand);
        break;
      case 'x':
        total = Number(firstOperand) * Number(secondOperand);
        break;
      case '+':
        total = Number(firstOperand) + Number(secondOperand);
        break;
      case '-':
        total = Number(firstOperand) - Number(secondOperand);
        break;
      default:
        break;
    }
    firstOperand = total;
    secondOperand = "";
    setScreen();
  } catch(err) {
    console.log(err);
  }
}

function setScreen() {
  try {
    if(total === "") {
      screenTotal.innerHTML = firstOperand;
      if(currentOperator !== "") {
        screenFirstOperand.innerHTML = firstOperand;
        screenOperator.innerHTML = currentOperator;
        screenSecondOperand.innerHTML = secondOperand;
      }
    } else if (total !== "") {
      if(totalClicked) {
        screenTotal.innerHTML = `= ${total}`;
        currentOperator = "";
        // currentOperand = 2;
        changeTotalStatus();
      } else {
        console.log('= has not been clicked')
        screenTotal.innerHTML = total;
        screenFirstOperand.innerHTML = total;
        screenOperator.innerHTML = currentOperator;
        screenSecondOperand.innerHTML = secondOperand;
      }
    }
  } catch(err) {
    console.log(err);
  }
}

function allClear() {
  firstOperand = "";
  secondOperand = "";
  currentOperand = "";
  currentOperator = "";
  total = "";
  setScreen();
  screenFirstOperand.innerHTML = "";
  screenOperator.innerHTML = "";
  screenSecondOperand.innerHTML = "";
}

function clearButton() {
  if(currentOperand === 1) {
    firstOperand = "";
  } else {
    secondOperand = "";
  }
  setScreen();
}