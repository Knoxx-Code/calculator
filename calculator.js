

const displayOp = document.querySelector('.display-operation');
const displayResult = document.querySelector('.display-result');
const displayTemp = document.querySelector('.display-temp');

const nums = document.querySelectorAll('.num');
const ops = document.querySelectorAll('.operator');

const eq = document.querySelector('.equal');
const clearAll = document.querySelector('.clear-all');
const del = document.querySelector('.delete');

let num1 = '';
let num2 = '';
let result = null;
let lastOp = '';
let isDecimal = false; 


nums.forEach(num=>{
    num.addEventListener('click',(e)=>{
        
        //Prevent user from having more than 1 decimal point
        if(e.target.textContent === '.' && !isDecimal){
            isDecimal = true;
        } else if(e.target.textContent === '.' && isDecimal){
            return;
        }
        num2 += e.target.textContent;
        displayResult.textContent = num2;
    })
});

ops.forEach(op => {
    op.addEventListener('click',(e)=>{
        //Prevent user from having an operation without a number or entering just a decimal point
        if(!num2 || num2==='.') return;
        //Change this to false since after an operator is added a new number can have a decimal
        isDecimal = false;
        const opName = e.target.textContent;
        //Check if all operators for a calculation are present i.e num1, op and num2
        if(num1 && num2 && lastOp){
            calculate();
        } else {
            result = parseFloat(num2);
        }
        manipulateDisplays(opName);
        lastOp = opName;
        console.log(result);
    })
});

//Function to clear the display for the result,move the operation to the top display & display temp result
function manipulateDisplays(opName=''){
    num1 += num2 + ' ' + opName + ' ';
    displayOp.textContent = num1;
    //Clear display for result
    displayResult.textContent = '';
    num2 = '';
    displayTemp.textContent = result;
}




//Addition
function add(a,b){
    return a + b;
}

//Subtraction
function subtract(a,b){
    return a - b;
}

//Multiplication
function multiply(a,b){
    return a * b;
}

//Division
function divide(a,b){
    return a / b;
}

//Modulus operation
function modulus(a,b){
    return a % b ;
}

function operate(op,n1,n2){
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);

    switch(op){
        case '+':
            return add(n1,n2);
            break;
        case '-':
            return subtract(n1,n2);
            break;
        case 'x':
            return multiply(n1,n2);
            break;
        case '/':
            if (n2 === 0) return 'Math Error'
             else{return divide(n1,n2);}
             break;
        case '%':
            return modulus(n1,n2);     
    }
}