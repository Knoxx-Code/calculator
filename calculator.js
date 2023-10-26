

const displayOp = document.querySelector('.display-operation');
const displayResult = document.querySelector('.display-result');
const displayTemp = document.querySelector('.display-temp');

const nums = document.querySelectorAll('.num');
const ops = document.querySelectorAll('.operator');

const eq = document.querySelector('.equals');
const clearAll = document.querySelector('.clear-all');
const del = document.querySelector('.delete');

let num1 = '';
let num2 = '';
let result = null;
let lastOp = '';
let isDecimal = false; 

//Function that handles all actions when a button is pressed
function buttonActions(){
    //Actions for when a number is clicked
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
    
    //Actions for when an operator is clicked
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

    //Actions for when equals is pressed
    eq.addEventListener('click',(e)=>{
        //Check if there is a math operation present
        if(!displayOp || !displayResult) return;
        //Showing result
        isDecimal = false;
        calculate();
        manipulateDisplays();
        displayResult.textContent = result;
        //Clear temp result display
        displayTemp.textContent = '';
        //Set num2 to be value of result to allow further calculation on the result
        num2 = result;
        num1 = '';
    });

    //Actions for clearing the screen
    clearAll.addEventListener('click',(e)=>{
        displayOp.textContent = '0';
        displayResult.textContent = '0';
        displayTemp.textContent = '0';
        num1 = '';
        num2 = '';
        result = '';

    });

    //Actions for delete
    del.addEventListener('click',(e)=>{
        if(!num2) return;
        //Delete last element from num2
        num2 = num2.slice(0,-1);
        displayResult.textContent = num2;

        
    })

    //Allows keyboard input for numbers and operators
    window.addEventListener('keydown',(e)=>{
        //Check to ensure only numbers are pressed
        if(/[\d.]/.test(e.key)){
                keyboardButtons(e.key);
        //Check the various operators are pressed
        } else if(/[+\-%/]/.test(e.key)){
                keyboardButtons(e.key);
        //Multiplication sign needs to be changed to fit implementation
        } else if (e.key === '*'){
            keyboardButtons('x');
        } 
        //Equals sign
        else if (e.key === '='){
                keyboardButtons(e.key);
        }
    });

}

//Function to clear the display for the result,move the operation to the upper display & display temp result
function manipulateDisplays(opName=''){
    num1 += num2 + ' ' + opName + ' ';
    displayOp.textContent = num1;
    //Clear display that holds the result
    displayResult.textContent = '';
    num2 = '';
    displayTemp.textContent = result;
}

//Calculates the result
function calculate(){
    result = operate(lastOp,result,num2);
    
}

//Function that handles the selection of number/operator based on keyboard input
function keyboardButtons(key)
{
    nums.forEach(num =>{
        if (num.textContent === key){
            num.click();
        }
    })

    ops.forEach(op=>{
        if(op.textContent === key){
            op.click();
        }
    })

    if(eq.textContent === key){
        eq.click();
    }
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


buttonActions();