document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
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
});