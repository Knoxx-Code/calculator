
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