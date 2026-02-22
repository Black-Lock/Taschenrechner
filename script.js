//firslty we will access DOM elemnents of the Calculator and creat some const that store value or variable and the const gonna not change

const inputBox = document.getElementById("input");

const expressionDiv = document.getElementById("expression");

const resultDiv = document.getElementById("result");

//we will define expression and result variable

let expression = "";
let result = "";

// we will define event handler for button clicks

function buttonClick(event) {
  // let get values from clicked button
  const target = event.target;

  const action = target.dataset.action;

  const value = target.dataset.value;

  //Switch case to control the calculator

  switch (action) {
    case "number":
      AddValue(value);
      break;

    case "clear":
      clear();
      break;

    case "backspace":
      backspace();
      break;

    // add the result to expression as a starting point if expression is empty
    case "addition":
    case "subtraction":
    case "multiplication":
    case "devision":
      if (expression === "" && result !== "") {
        startFromResult(value);
      } else if (expression !== "" && !isLastCharOperator()) {
        AddValue(value);
      }
      break;
    case "submit":
      submit();
      break;
    case "negate":
      negate();
      break;
    case "mod":
      percentage();
      break;
    case "decimal":
      decimal(value);
      break;
  }

  //update dispaly
  updateDisplay(expression, result);
}

inputBox.addEventListener("click", buttonClick);

// 1)
function AddValue(value) {
  // add value to expression
  //expression += value;

  if (value === ".") {
    // find the index of the last operator in the expression

    const lastOperatorIndex = expression.search(/[+\-*/]/);

    // find the index of the last decimal in the expression

    const lastDecimalIndex = expression.lastIndexOf(".");

    // find the index of the last number in the expression

    const lastNumberIndex = Math.max(
      expression.lastIndexOf("+"),
      expression.lastIndexOf("-"),
      expression.lastIndexOf("*"),
      expression.lastIndexOf("/"),
    );

    // check if this is the first decimal in the current number or if the expression is empty

    if (
      (lastDecimalIndex < lastOperatorIndex ||
        lastDecimalIndex < lastNumberIndex ||
        lastDecimalIndex == -1) &&
      (expression === "" ||
        expression.slice(lastNumberIndex + 1).indexOf("-") === -1)
    ) {
      expression += value;
    }
  } else {
    expression += value;
  }
}
// 2)

function updateDisplay(expression, result) {
  expressionDiv.textContent = expression;

  resultDiv.textContent = result;
}

// 3)

function clear() {
  expression = "";
  result = "";
}

// 4)

function backspace() {
  expression = expression.slice(0, -1);
}

// 5) to avoid many operator sign

function isLastCharOperator() {
  return isNaN(parseInt(expression.slice(-1)));
}

// 7)

function startFromResult(value) {
  expression += result + value;
}

// 8)

function submit() {
  result = evaluateExpression();
  expression = "";
}

// 9)

function evaluateExpression() {
  const evalResult = eval(expression);
  // checks if evalResult isNaN or infinite. it if is , return a space character ' '
  return isNaN(evalResult) || !isFinite(evalResult)
    ? " "
    : evalResult < 1
      ? parseFloat(evalResult.toFixed(10))
      : parseFloat(evalResult.toFixed(2)); // return a float number and first number
}

// 10)

function negate() {
  //negate the result if the expression is empty and result is present

  if (expression === "" && result !== "") {
    result = -result;

    //toggle the sign of the expression  if it s not already negative and it s not empty
  } else if (!expression.startsWith("-") && expression !== "") {
    expression = "-" + expression;

    //Remove the negative sign from the expression if it s already negative
  } else if (expression.startsWith("-")) {
    expression = expression.slice(1);
  }
}

// 11)

function percentage() {
  // evaluate the expression , else it will take the percentage of only the first number

  if (expression !== "") {
    result = evaluateExpression();
    expression = "";
    if (!isNaN(result) && isFinite(result)) {
      result /= 100;
    } else {
      result = "";
    }
  } else if (result !== "") {
    result = parseFloat(result) / 100;
  }
}

// 12)
function decimal(value) {
  if (!expression.endsWith(".") && !isNaN(expression.slice(-1))) {
    AddValue(value);
  }
}

// 13)

// 14)
