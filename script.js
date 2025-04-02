//Todo:In the Project
//1.Take deposit amount from user.
//2.Determine the number of lines the user wants to bet on.
//3.Determine amd collect the bet amount.
//4.Spin the slot machine.
//5.Check if the user won.
//6.Give the user their winnings.
//7.Play again.

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 3,
    "C": 3,
    "D": 2
}
const SYMBOLS_VALUE = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit = ()=>{
    while(true){
        const depositAmount = prompt("Enter your deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount. Please enter a valid amount.");
        }else{
            return numberDepositAmount;
        }
    }
}

const getNumberOfLines = () =>{
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const NumberOfLines = parseFloat(lines);

        if(isNaN(NumberOfLines) || NumberOfLines <= 0 || NumberOfLines > 3){
            console.log("Invalid number of lines. Please enter a valid number.");
        }else{
            return NumberOfLines;
        }
    }
}

const getBetAmount = (balance, lines) =>{
    while(true){
        const bet = prompt("Enter your bet amount per line: ");;
        const NumberOfBets = parseFloat(bet);

        if(isNaN(NumberOfBets) || NumberOfBets <= 0 || NumberOfBets > (balance/lines)){
            console.log("Invalid bet amount. Please enter a valid amount.");
        }else{
            return NumberOfBets;
        }
    }
}

const spin = ()=>{
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        console.log(`${symbol}: ${count}`);
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for(let i = 0; i < COLUMNS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const selectedSymbol = reelSymbols[Math.floor(Math.random() * reelSymbols.length)];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(reelSymbols.indexOf(selectedSymbol), 1);
        }
    }
    return reels;
}

const reels = spin();
let balance = deposit();
console.log(`Deposit amount: ${balance}`);
const linesBet = getNumberOfLines();
console.log(`Number of lines: ${linesBet}`);
const betAmount = getBetAmount(balance, linesBet);