// Random low contrast color scheme
const colorSchemes = ['darkblue-lime'];
const randomScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
document.body.classList.add(randomScheme);

// Timer functionality
let timeLeft = 30;
const timerElement = document.getElementById('timer');

function updateTimer() {
    timerElement.textContent = timeLeft;
    
    // When timer goes negative
    if (timeLeft < 0) {
        timerElement.classList.add('negative');
        
        // Get absolute value for shake intensity calculation
        const negativeTime = Math.abs(timeLeft);
        
        // Remove all shake classes first
        document.body.classList.remove('shake-light', 'shake-medium', 'shake-heavy', 'shake-extreme');
        
        // Progressive shake based on how negative the timer is
        if (negativeTime < 30) {
            document.body.classList.add('shake-light');
        } else if (negativeTime < 60) {
            document.body.classList.add('shake-medium');
        } else if (negativeTime < 90) {
            document.body.classList.add('shake-heavy');
        } else {
            document.body.classList.add('shake-extreme');
        }
    }
    
    timeLeft--;
}

// Start timer countdown
setInterval(updateTimer, 1000);

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show robot verification modal instead of logging in directly
    showRobotVerification();
});

// Robot verification
const robotModal = document.getElementById('robotModal');
const equations = [
    { question: "dy/dx = 2x, solve for y", answer: "x^2+c" },
    { question: "dy/dx = 3x^2, solve for y", answer: "x^3+c" },
    { question: "dy/dx = e^x, solve for y", answer: "e^x+c" },
    { question: "dy/dx = 1/x, solve for y", answer: "ln(x)+c" },
    { question: "dy/dx = cos(x), solve for y", answer: "sin(x)+c" },
    { question: "dy/dx = sin(x), solve for y", answer: "-cos(x)+c" },
    { question: "d^2y/dx^2 = 0, solve for y", answer: "ax+b" }
];

let currentEquation;

function showRobotVerification() {
    // Pick random equation
    currentEquation = equations[Math.floor(Math.random() * equations.length)];
    document.getElementById('equation').textContent = currentEquation.question;
    document.getElementById('robotAnswer').value = '';
    document.getElementById('robotMessage').style.display = 'none';
    robotModal.style.display = 'block';
}

// Robot verification form handler
document.getElementById('robotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userAnswer = document.getElementById('robotAnswer').value.toLowerCase().trim();
    const robotMessageDiv = document.getElementById('robotMessage');
    const correctAnswer = currentEquation.answer.toLowerCase();
    
    // Check if answer is correct (allow some variations)
    const isCorrect = userAnswer.includes(correctAnswer.replace('+c', '')) || 
                     userAnswer === correctAnswer ||
                     userAnswer === correctAnswer.replace('+c', '') + ' + c' ||
                     userAnswer === correctAnswer.replace('+c', '') + '+c';
    
    if (isCorrect) {
        robotMessageDiv.textContent = 'Verification successful! Processing login...';
        robotMessageDiv.className = 'message success';
        
        setTimeout(() => {
            robotModal.style.display = 'none';
            actuallyLogin();
        }, 1500);
    } else {
        robotMessageDiv.textContent = 'Incorrect! Robots would know this. Try again.';
        robotMessageDiv.className = 'message error';
        
        // Show another equation after 2 seconds
        setTimeout(() => {
            showRobotVerification();
        }, 2000);
    }
});

// Actual login function (called after robot verification)
function actuallyLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    
    // Basic validation (you can customize this)
    if (username && password) {
        // Demo credentials (replace with actual authentication)
        if (username === 'admin' && password === 'password') {
            messageDiv.textContent = 'Login successful! Welcome, ' + username + '!';
            messageDiv.className = 'message success';
            
            // Redirect or perform action after successful login
            setTimeout(() => {
                // window.location.href = 'dashboard.html';
                console.log('Redirecting to dashboard...');
            }, 1500);
        } else {
            messageDiv.textContent = 'Invalid username or password!';
            messageDiv.className = 'message error';
        }
    } else {
        messageDiv.textContent = 'Please fill in all fields!';
        messageDiv.className = 'message error';
    }
    
    // Clear message after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';
    }, 3000);
}

// Modal Functionality
const modal = document.getElementById('forgotPasswordModal');
const forgotPasswordLink = document.querySelector('.links a[href="#"]');
const closeBtn = document.querySelector('.close');
const signUpLink = document.querySelectorAll('.links a[href="#"]')[1];
const signImage = document.getElementById('signImage');
let signMoveDistance = 0;

// Open modal when "Forgot Password?" is clicked
forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'block';
});

// Move sign image up more each time "Sign Up" is clicked
signUpLink.addEventListener('click', function(e) {
    e.preventDefault();
    signMoveDistance += 20;
    signImage.style.transform = `translateY(-${signMoveDistance}px)`;
});

// Close modal when X is clicked
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Forgot Password Form Handler
document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    const modalMessageDiv = document.getElementById('modalMessage');
    
    if (email) {
        // Simulate sending reset link
        modalMessageDiv.textContent = 'Password reset link sent to ' + email + '!';
        modalMessageDiv.className = 'message success';
        
        // Close modal after 2 seconds
        setTimeout(() => {
            modal.style.display = 'none';
            modalMessageDiv.style.display = 'none';
            modalMessageDiv.className = 'message';
            document.getElementById('forgotPasswordForm').reset();
        }, 2000);
    } else {
        modalMessageDiv.textContent = 'Please enter a valid email address!';
        modalMessageDiv.className = 'message error';
    }
});