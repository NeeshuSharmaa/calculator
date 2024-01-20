const numBtns = document.querySelectorAll("[data-num]");
const operationBtns = document.querySelectorAll("[data-operation]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const prevOperandText = document.querySelector("[data-prev-operand");
const currOperandText = document.querySelector("[data-curr-operand");

const add = (a, b) => Number(a) + Number(b);
const sub = (a, b) => Number(a) - Number(b);
const multiply = (a, b) => Number(a) * Number(b);
const divide = (a, b) => Number(a) / Number(b);
const percentage = (a) => Number(a) / 100;

const evaluate = (num1, operation, num2) => {
  if (operation === "+") {
    return add(num1, num2);
  } else if (operation === "-") {
    return sub(num1, num2);
  } else if (operation === "x") {
    return multiply(num1, num2);
  } else if (operation === "/") {
    return divide(num1, num2);
  }
};

let activeOperation,
  num1 = "",
  num2 = "",
  activeElement;

numBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const num = e.target.dataset.num;
    if (!activeOperation) {
      activeElement = "num1";
      num1 = num1 + num;
      currOperandText.innerText = num1;
      prevOperandText.innerText = num1;
    } else {
      activeElement = "num2";
      num2 = num2 + num;
      currOperandText.innerText = num2;
    }
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const operation = e.target.dataset.operation;
    if (operation === "%") {
      if (activeOperation) {
        // operation already exists means it's num2
        const newNum2 = percentage(num2);
        num2 = newNum2;
        currOperandText.innerText = num2;
        prevOperandText.innerHTMLText = `${num1} ${operation} ${num2}`;
      } else {
        // if operation undefined-> num1
        const newNum1 = percentage(num1);
        num1 = newNum1;
        currOperandText.innerText = num1;
      }
    } else {
      // operation isn't percentage
      if (!activeOperation) {
        // case I: no operations yet applied, <2 +>
        activeOperation = operation;
        prevOperandText.innerText = `${num1} ${operation}`;
        activeElement = "operation";
      } else {
        // Case II: expression: <2 + 4 *>, Instead of clicking on equal to, user clicked on another operation so, we gotta evalute the prev one before the user types another number, so that we can do -> 6 *
        const computedValue = evaluate(num1, activeOperation, num2);
        num1 = computedValue;
        currOperandText.innerText = num1;
        activeOperation = operation;
        prevOperandText.innerText = `${num1} ${activeOperation}`;
        num2 = "";
        activeElement = "operation";
      }
    }
  });
});

equalsBtn.addEventListener("click", () => {
  if (num1 && activeOperation && num2) {
    const computedValue = evaluate(num1, activeOperation, num2);
    prevOperandText.innerText = `${num1} ${activeOperation} ${num2}`;
    currOperandText.innerText = computedValue;

    num1 = computedValue;
    num2 = "";
    activeOperation = undefined;
    activeElement = "num1";
  }
});
allClearBtn.addEventListener("click", () => {
  num1 = "";
  num2 = "";
  activeOperation = "";
  prevOperandText.innerText = "";
  currOperandText.innerText = "";
  activeElement = undefined;
});

deleteBtn.addEventListener("click", () => {
  if (activeElement === "num1") {
    num1 = num1.slice(0, num1.length - 1);
    currOperandText.innerText = num1;
    prevOperandText.innerText = num1;
  } else if (activeElement === "num2") {
    num2 = num2.slice(0, num2.length - 1);
    currOperandText.innerText = num2;
    prevOperandText.innerText = num2;

    if (num2.length === 0) {
      activeElement = "operation";
    }
  } else if (activeElement === "operation") {
    activeOperation = undefined;
    activeElement = "num1";
    prevOperandText.innerText = num1;
    currOperandText.innerText = num1;
  }
});

// switch run the loop
// on pressing one delete, it cleared the whole num
// if else ran the statement only once
