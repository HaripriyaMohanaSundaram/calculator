let numberValue = null;
let inputValue = null;
let isDecimal = false;
let exponent = 1;
let isNextNumber = true;
let operatorValue = null;
let number = 0;
let result = 0;
let indexOfNumber = 0;
let numberArray = [];
let opCount = 0;
let operatorArray = [];
let inputArray = [];

const buttons = document.querySelectorAll('input');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    inputValue = button.value;
    calc(inputValue);
  });
});

function calc(inputValue) {
  numberValue = Number(inputValue);
  document.getElementById("deleteBtn").disabled = false;
  if (!isNaN(numberValue)) {
    inputArray.push(numberValue);
  }
  else if (inputValue == "+" || inputValue == "-" || inputValue == "*"
    || inputValue == "/" || inputValue == ".") {
    inputArray.push(inputValue);
  }

  switch (true) {
    case (!isNaN(numberValue)):
      number = getInput(numberValue, number, isDecimal, exponent);
      if (isDecimal == true) {
        exponent = exponent + 1;
      }
      if (isNextNumber == false) {
        numberArray.pop();
        numberArray.push(number);
      }
      else {
        numberArray.push(number);
        isNextNumber = false;
      }
      document.getElementById("displayScreen").innerText = numberArray[numberArray.length - 1];
      document.getElementById("deleteBtn").disabled = false;
      break;

    case (inputValue == "."):
      isDecimal = true;
      document.getElementById("decimalBtn").disabled = true;
      break;

    case (inputValue == "+" || inputValue == "-" || inputValue == "*"
      || inputValue == "/"):
      isNextNumber = true;
      isDecimal = false;
      operatorValue = inputValue;
      number = 0;
      exponent = 1;
      document.getElementById("reciprocalBtn").disabled = true;
      document.getElementById("decimalBtn").disabled = false;
      operatorArray.push(inputValue);
      if (opCount > 0) {
        result = operate(numberArray[numberArray.length - 2],
          numberArray[numberArray.length - 1], operatorArray[operatorArray.length - 2]);
        numberArray.push(result);
      }
      opCount++;
      break;

    case (inputValue == "="):
      isNextNumber = true;
      if (numberArray.length == 1) {
        result = operate(numberArray[numberArray.length - 1],
          numberArray[numberArray.length - 1], operatorValue);
      }
      else {
        result = operate(numberArray[numberArray.length - 2],
          numberArray[numberArray.length - 1], operatorValue);
      }
      numberArray.push(result);
      document.getElementById("decimalBtn").disabled = false;
      break;

    case (inputValue == "DEL" && numberArray != []):
      if (isDecimal == true) {
        exponent--;
      }
      if (exponent == 0) {
        exponent++;
        isDecimal = false;
        inputArray.pop();
        document.getElementById("decimalBtn").disabled = false;
      }
      number = deleteValue(numberArray, operatorArray, inputArray, exponent);
      document.getElementById("displayScreen").innerText = number;
      numberArray.pop();
      if (number != 0) {
        numberArray.push(number);
      }
      else {
        document.getElementById("deleteBtn").disabled = true;
      }
      inputArray.pop();
      break;

    case (inputValue == "1/x"):
      result = operate(1, numberArray[numberArray.length - 1], "/");
      numberArray.pop();
      numberArray.push(result);
      break;

    case (inputValue == "CLR"):
      clearData();
      break;

    case (inputValue == "NEG"):
      result = operate((-1), numberArray[numberArray.length - 1], "*");
      numberArray.pop();
      numberArray.push(result);
      break;
  }
}

function operate(firstNumber, secondNumber, operatorValue) {
  let result = 0;
  let decimalLength = 0;
  if (secondNumber == 0 && operatorValue == '/') {
    document.getElementById("displayScreen").innerText = "Oops!!";
  }
  else {
    switch (operatorValue) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
    }
    decimalLength = String(result).split('.').length;
    if (decimalLength > 8) {
      result = result.toFixed(8);
    }
    document.getElementById("displayScreen").innerText = result;
    return result;
  }
}

function getInput(numberValue, number, isDecimal, exponent) {
  if (number == 0) {
    if (isDecimal == false) {
      number = numberValue;
    }
    else {
      numberValue = numberValue * (0.1 ** exponent);
      number = number + numberValue;
      exponent++;
    }
  }
  else {
    if (isDecimal == false) {
      number = number * 10;
    }
    else {
      numberValue = numberValue * (0.1 ** exponent);
    }
    number = number + numberValue;
  }
  console.log(number);
  return number;
}

function deleteValue(numberArray, operatorArray, inputArray, exponent) {
  let updateNumber = numberArray[numberArray.length - 1];
  switch (true) {
    case (!isNaN(inputArray[inputArray.length - 1])):
      if (updateNumber != 0) {
        if (isDecimal == true) {
          inputArray[inputArray.length - 1] = inputArray[inputArray.length - 1] * (0.1 ** exponent);
          updateNumber = updateNumber - inputArray[inputArray.length - 1];
        }
        else {
          updateNumber = updateNumber - inputArray[inputArray.length - 1];
          updateNumber = updateNumber / 10;
        }
        return updateNumber;
      }
      else {
        return updateNumber;
      }
      break;

    case (inputArray[inputArray.length - 1] == "+" || inputArray[inputArray.length - 1] == "-"
      || inputArray[inputArray.length - 1] == "*"
      || inputArray[inputArray.length - 1] == "/"):
      operatorArray.pop();
      return operatorArray;
      break;

    case (inputArray[inputArray.length - 1] == "."):
      isDecimal = false;
      document.getElementById("decimalBtn").disabled = false;
      break;
  }
}

function clearData() {
  firstNumber = 0;
  secondNumber = null;
  isDecimal = false;
  exponent = 1;
  isNextNumber = true;
  operatorValue = null;
  number = 0;
  result = 0;
  indexOfNumber = 0;
  numberArray = [];
  document.getElementById("displayScreen").innerText = 0;
  opCount = 0;
  operatorArray = [];
  inputArray = [];
}