// Authentication functionality for Cinezy

// Modal management
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Sign In functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sign In button click
    const signInBtn = document.querySelector('.sign-in');
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            openModal('signInModal');
        });
    }

    // Get Started buttons click
    const getStartedBtns = document.querySelectorAll('.get-started');
    getStartedBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const emailInput = this.previousElementSibling;
            if (emailInput && emailInput.value) {
                localStorage.setItem('signupEmail', emailInput.value);
            }
            openModal('signUpModal');
        });
    });

    // Sign In Form Submit
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('signInEmail').value;
            const password = document.getElementById('signInPassword').value;
            const errorMsg = document.getElementById('signInError');

            // Clear previous errors
            errorMsg.textContent = '';

            // Validate
            if (!validateEmail(email)) {
                errorMsg.textContent = 'Please enter a valid email address';
                return;
            }

            if (password.length < 6) {
                errorMsg.textContent = 'Password must be at least 6 characters';
                return;
            }

            // Check if user exists in localStorage
            const users = JSON.parse(localStorage.getItem('cinezUsers')) || {};
            
            if (users[email] && users[email].password === password) {
                // Success
                localStorage.setItem('currentUser', email);
                alert('Welcome back, ' + users[email].name + '!');
                closeModal('signInModal');
                updateUIForLoggedInUser(users[email].name);
            } else {
                errorMsg.textContent = 'Invalid email or password';
            }
        });
    }

    // Sign Up Form Submit
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signUpName').value;
            const email = document.getElementById('signUpEmail').value;
            const password = document.getElementById('signUpPassword').value;
            const confirmPassword = document.getElementById('signUpConfirmPassword').value;
            const errorMsg = document.getElementById('signUpError');

            // Clear previous errors
            errorMsg.textContent = '';

            // Validate
            if (name.trim().length < 2) {
                errorMsg.textContent = 'Please enter your name';
                return;
            }

            if (!validateEmail(email)) {
                errorMsg.textContent = 'Please enter a valid email address';
                return;
            }

            if (password.length < 6) {
                errorMsg.textContent = 'Password must be at least 6 characters';
                return;
            }

            if (password !== confirmPassword) {
                errorMsg.textContent = 'Passwords do not match';
                return;
            }

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('cinezUsers')) || {};
            
            if (users[email]) {
                errorMsg.textContent = 'An account with this email already exists';
                return;
            }

            // Create new user
            users[email] = {
                name: name,
                password: password,
                createdAt: new Date().toISOString()
            };

            localStorage.setItem('cinezUsers', JSON.stringify(users));
            localStorage.setItem('currentUser', email);

            alert('Account created successfully! Welcome to Cinezy, ' + name + '!');
            closeModal('signUpModal');
            updateUIForLoggedInUser(name);
        });
    }

    // Switch between Sign In and Sign Up
    window.switchToSignUp = function() {
        closeModal('signInModal');
        openModal('signUpModal');
    }

    window.switchToSignIn = function() {
        closeModal('signUpModal');
        openModal('signInModal');
    }

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const users = JSON.parse(localStorage.getItem('cinezUsers')) || {};
        if (users[currentUser]) {
            updateUIForLoggedInUser(users[currentUser].name);
        }
    }

    // Pre-fill email if coming from Get Started
    const signupEmail = localStorage.getItem('signupEmail');
    if (signupEmail) {
        const signUpEmailInput = document.getElementById('signUpEmail');
        if (signUpEmailInput) {
            signUpEmailInput.value = signupEmail;
        }
        localStorage.removeItem('signupEmail');
    }
});

// Update UI for logged in user
function updateUIForLoggedInUser(userName) {
    const signInBtn = document.querySelector('.sign-in');
    if (signInBtn) {
        signInBtn.textContent = userName;
        signInBtn.onclick = function() {
            if (confirm('Do you want to sign out?')) {
                localStorage.removeItem('currentUser');
                location.reload();
            }
        };
    }
}
