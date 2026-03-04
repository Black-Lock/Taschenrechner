//firslty we will access DOM elemnents of the Calculator and create some const that store value or variable and the const gonna not change

const inputBox = document.getElementById("input");

const expressionDiv = document.getElementById("expression");

const resultDiv = document.getElementById("result");

// Definiere die Variablen für Ausdruck und Ergebnis

let expression = "";
let result = "";

// Definiere den Event-Handler für Button-Klicks

function buttonClick(event) {
  // Hole das geklickte Button-Element
  const target = event.target;

  const action = target.dataset.action;

  const value = target.dataset.value;

  // Steuere das Verhalten des Taschenrechners basierend auf der Aktion

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
     // Wenn der Ausdruck leer ist, aber ein Ergebnis existiert, starte mit dem Ergebnis

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

  // Aktualisiere die Anzeige des Taschenrechners
  updateDisplay(expression, result);
}
// Füge den Klick-Event-Listener zur Eingabebox hinzu

inputBox.addEventListener("click", buttonClick);

 // 1) Wert (Zahl oder Dezimalpunkt) zum Ausdruck hinzufügen //


function AddValue(value) {
  // add value to expression
  //expression += value;

  if (value === ".") {
    // Index des letzten Operators im Ausdruck finden

    const lastOperatorIndex = expression.search(/[+\-*/]/);

    // Index des letzten Dezimalpunkts im Ausdruck finden

    const lastDecimalIndex = expression.lastIndexOf(".");

    // Index der letzten Zahl im Ausdruck finden

    const lastNumberIndex = Math.max(
      expression.lastIndexOf("+"),
      expression.lastIndexOf("-"),
      expression.lastIndexOf("*"),
      expression.lastIndexOf("/"),
    );

    // check if this is the first decimal in the current number or if the expression is empty
        // Dezimalpunkt hinzufügen, wenn es der erste in der aktuellen Zahl ist und gültig


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
// 2) Aktualisiere die Anzeige des Ausdrucks und Ergebnisses

function updateDisplay(expression, result) {
  expressionDiv.textContent = expression;

  resultDiv.textContent = result;
}

// 3) Lösche Ausdruck und Ergebnis

function clear() {
  expression = "";
  result = "";
}

// 4) Entferne das letzte Zeichen aus dem Ausdruck

function backspace() {
  expression = expression.slice(0, -1);
}

// 5) Prüfe, ob das letzte Zeichen ein Operator ist , to avoid many operator sign

function isLastCharOperator() {
  return isNaN(parseInt(expression.slice(-1)));
}

// 7) Starte einen neuen Ausdruck mit dem aktuellen Ergebnis

function startFromResult(value) {
  expression += result + value;
}

// 8) Berechne den aktuellen Ausdruck und speichere das Ergebnis

function submit() {
  result = evaluateExpression();
  expression = "";
}

// 9) Berechne den mathematischen Ausdruck sicher

function evaluateExpression() {
  const evalResult = eval(expression);
  // checks if evalResult isNaN or infinite. it if is , return a space character ' '
  return isNaN(evalResult) || !isFinite(evalResult)
    ? " "
    : evalResult < 1
      ? parseFloat(evalResult.toFixed(10))
      : parseFloat(evalResult.toFixed(2)); // return a float number and first number
}

// 10) Negiere den aktuellen Ausdruck oder das Ergebnis

function negate() {
  // Negiere das Ergebnis, wenn der Ausdruck leer ist

  if (expression === "" && result !== "") {
    result = -result;

    //toggle the sign of the expression  if it s not already negative and it s not empty
    //   Vorzeichen des Ausdrucks umschalten, wenn es noch nicht negativ ist

  } else if (!expression.startsWith("-") && expression !== "") {
    expression = "-" + expression;

  // Entferne das Minuszeichen, wenn der Ausdruck bereits negativ ist
  } else if (expression.startsWith("-")) {
    expression = expression.slice(1);
  }
}

// 11) Berechne den Prozentwert des aktuellen Ausdrucks oder Ergebnisses

function percentage() {
  // evaluate the expression , else it will take the percentage of only the first number
    // Prozentsatz auf Ausdruck oder Ergebnis anwenden


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

// 12) Füge einen Dezimalpunkt sicher hinzu
function decimal(value) {
  if (!expression.endsWith(".") && !isNaN(expression.slice(-1))) {
    AddValue(value);
  }
}



