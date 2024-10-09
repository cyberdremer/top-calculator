const calculatorScreen = document.querySelector(".calculator-screen");
const calculatorNumberButtons = document.querySelector(".calculator-buttons");
const calculatorOperators = document.querySelector(".calculator-buttons");
const dotButton = document.querySelector("#point-button")

const ERROR = "ERROR";
let runningInput = []
let operators = "+/*-";
let calculatorInput = "";





function evaluateExpression(operandOne, operator, operandTwo){
    if(operators.includes(operator)){
        if(operator === "/" && operandTwo === 0){
            clearRunningInput();
            clearCalculatorInput();
            return ERROR
        }
        else{
            const result = evaluateExpressionHelper(operandOne, operator, operandTwo);
            return result;
        }
    }
    else{
        return ERROR;
    }

}

function evaluateExpressionHelper(operandOne, operator, operandTwo){
    switch(operator){
        case "+":
            return operandOne + operandTwo;
        case "*":
            return operandOne * operandTwo;    
        case "/":
            return operandOne / operandTwo;
        case "-":
            return operandOne - operandTwo;
        default:
            return ERROR;

    }

}











calculatorNumberButtons.addEventListener('click', (Event)=> {
    const elementClass = Event.target.className;
    const elementID = Event.target.id
    if(elementClass === "num-button"){
        if(elementID === "clear-button"){
            clearCalculatorInput();
            clearCalculatorScreen();
            clearRunningInput();
            dotButton.disabled = false;
        }
        else if(elementID === "point-button"){
            calculatorScreen.textContent += "."
            calculatorInput += ".";
            dotButton.disabled = true;
            

        }
        else{
            calculatorScreen.textContent += Event.target.textContent;
            calculatorInput += Event.target.textContent;
            if(calculatorInput.length > 9){
                calculatorScreen.innerText = calculatorInput.substring(0,9);
            }
        
        }
    }
    
   

})





calculatorOperators.addEventListener('click', (Event) =>{
    const elementClass = Event.target.className;
    const operator = Event.target.id;
    if(elementClass === "operator"){
        if(operator === "plus"){
            calculatorInput += " +";
            pushPartialExpression(calculatorInput);
            clearCalculatorInput();
            clearCalculatorScreen();

        }
        else if(operator === "minus"){
            calculatorInput += " -";
            pushPartialExpression(calculatorInput);
            clearCalculatorInput();
            clearCalculatorScreen();

        }
        else if(operator === "divide"){
            calculatorInput += " /";
            pushPartialExpression(calculatorInput);
            clearCalculatorInput();
            clearCalculatorScreen();

        }
        else if(operator === "multiply"){
            calculatorInput += " *";
            pushPartialExpression(calculatorInput);
            clearCalculatorInput();
            clearCalculatorScreen();

        }  
        else if(operator === "equals"){
            runningInput.push(calculatorInput);
            if(runningInput.length !== 3){
                calculatorScreen.textContent = ERROR;
            }
            else{
                expression = getExpression(runningInput);
                const result = evaluateExpression(expression.operandOne, expression.operator, expression.operandTwo);
                clearCalculatorInput();
                calculatorInput = Number.toString(result);
                calculatorScreen.textContent = result;
            }
            

        }
        else{
            
        }
        dotButton.disabled = false;

        
    }
})

function getExpression(runningInput){
    const operandTwo = Number(runningInput.pop());
    const operator = runningInput.pop();
    const operandOne = Number(runningInput.pop());
    return {operandOne, operator, operandTwo};
}

function pushPartialExpression(input){
    [extractedOperand, extractedOperator] = input.split(" ");
    runningInput.push(extractedOperand);
    runningInput.push(extractedOperator);

}

function clearRunningInput(){
    runningInput = [];
}

function clearCalculatorInput(){
    calculatorInput = " ";
}

function clearCalculatorScreen(){
    calculatorScreen.textContent = " ";
}