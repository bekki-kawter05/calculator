document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    // Update calculator display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    // Handle number input
    function inputNumber(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = number;
            resetScreen = false;
        } else {
            currentInput += number;
        }
    }

    // Handle decimal point
    function inputDecimal() {
        if (resetScreen) {
            currentInput = '0.';
            resetScreen = false;
            return;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    // Handle operations
    function handleOperation(op) {
        if (operation !== null) calculate();
        previousInput = currentInput;
        operation = op;
        resetScreen = true;
    }

    // Perform calculation
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operation = null;
    }

    // Clear calculator
    function clear() {
        currentInput = '0';
        previousInput = '';
        operation = null;
    }

    // Toggle positive/negative
    function toggleSign() {
        currentInput = (parseFloat(currentInput) * -1).toString();
    }

    // Add event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value >= '0' && value <= '9') {
                inputNumber(value);
            } else if (value === '.') {
                inputDecimal();
            } else if (value === 'AC') {
                clear();
            } else if (value === '+/-') {
                toggleSign();
            } else if (value === '=') {
                calculate();
                resetScreen = true;
            } else {
                handleOperation(value);
            }

            updateDisplay();
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        if ((key >= '0' && key <= '9') || 
            key === '.' || 
            key === '+' || 
            key === '-' || 
            key === '*' || 
            key === '/' || 
            key === '%' || 
            key === 'Enter' || 
            key === 'Escape') {
            
            e.preventDefault();
            const button = document.querySelector(`[data-value="${key === 'Enter' ? '=' : key === 'Escape' ? 'AC' : key}"]`);
            if (button) button.click();
        }
    });
});