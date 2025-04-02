document.addEventListener("DOMContentLoaded", () => {
    let balance = 0; // Starting with 0 as shown in HTML
    
    const symbols = ["🍒", "🍋", "💎"];
    const symbolValues = { 
      "🍒": 5, 
      "🍋": 3, 
      "💎": 10
    };
  
    const depositInput = document.getElementById("deposit");
    const betInput = document.getElementById("bet");
    const linesInput = document.getElementById("lines");
    const balanceDisplay = document.getElementById("balance");
    const messageDisplay = document.getElementById("message");
    const slots = document.querySelectorAll(".slot");
    const slotMachine = document.querySelector(".slot-machine");
  
    function updateBalance() {
      balanceDisplay.textContent = balance;
    }
  
    window.deposit = function() {
      const depositAmount = parseFloat(depositInput.value);
      if (!isNaN(depositAmount) && depositAmount > 0) {
        balance += depositAmount;
        updateBalance();
        depositInput.value = "";
      } else {
        alert("Enter a valid deposit amount.");
      }
    }
  
    function getRandomSymbol() {
      return symbols[Math.floor(Math.random() * symbols.length)];
    }
  
    function spinSlots() {
      // Add spinning class to the slot machine
      slotMachine.classList.add("spinning");
      
      // Set random symbols immediately
      slots.forEach(slot => {
        slot.textContent = getRandomSymbol();
      });
      
      // Shorter animation duration - only 500ms for spinning
      setTimeout(() => {
        slotMachine.classList.remove("spinning");
        slotMachine.classList.add("stopping");
        
        // Shorter stopping animation - only 200ms
        setTimeout(() => {
          slotMachine.classList.remove("stopping");
        }, 200);
      }, 500);
    }
  
    function checkWinnings(rows, bet, lines) {
      let winnings = 0;
      for (let i = 0; i < lines; i++) {
        const rowSymbols = rows[i];
        if (rowSymbols.every(symbol => symbol === rowSymbols[0])) {
          winnings += bet * symbolValues[rowSymbols[0]];
        }
      }
      return winnings;
    }
  
    function getSlotRows() {
      const rows = [[], [], []];
      slots.forEach((slot, index) => {
        rows[Math.floor(index / 3)].push(slot.textContent);
      });
      return rows;
    }
  
    function showWinDisplay(amount) {
      // Update the win amount
      document.getElementById('win-amount-value').textContent = amount;
      
      // Show the win display
      const winDisplay = document.getElementById('win-display');
      winDisplay.classList.add('active');
      
      // Create confetti for big wins
      if (amount >= 50) {
        createConfetti();
      }
      
      // Hide the win display after 3 seconds (reduced from 5)
      setTimeout(() => {
        winDisplay.classList.remove('active');
      }, 3000);
    }
  
    function createConfetti() {
      const confettiCount = 100;
      const container = document.body;
      
      // Remove any existing confetti
      const existingConfetti = document.querySelectorAll('.confetti-piece');
      existingConfetti.forEach(piece => piece.remove());
      
      // Create new confetti pieces
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // Random position, size, and delay
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDelay = Math.random() * 2 + 's'; // Reduced delay
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's'; // Reduced duration
        
        container.appendChild(confetti);
        
        // Remove confetti after animation completes - reduced to 5 seconds
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }
    }
  
    window.spin = function() {
      const betAmount = parseFloat(betInput.value);
      const lines = parseInt(linesInput.value);
      
      if (isNaN(betAmount) || isNaN(lines) || betAmount <= 0 || lines < 1 || lines > 3) {
        alert("Enter valid bet and line numbers.");
        return;
      }
      
      if (betAmount * lines > balance) {
        alert("Insufficient balance.");
        return;
      }
      
      balance -= betAmount * lines;
      updateBalance();
      spinSlots();
      
      // Check winnings after a much shorter delay - only 700ms total
      setTimeout(() => {
        const rows = getSlotRows();
        const winnings = checkWinnings(rows, betAmount, lines);
        
        balance += winnings;
        updateBalance();
        
        if (winnings > 0) {
          messageDisplay.textContent = `You won $${winnings}!`;
          showWinDisplay(winnings);
        } else {
          messageDisplay.textContent = "Try again!";
        }
      }, 700);
    }
  });
  