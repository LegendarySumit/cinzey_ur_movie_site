// ==================== AUTHENTICATION FUNCTIONALITY ====================

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

// Switch between Sign In and Sign Up
window.switchToSignUp = function() {
    closeModal('signInModal');
    openModal('signUpModal');
}

window.switchToSignIn = function() {
    closeModal('signUpModal');
    openModal('signInModal');
}

// ==================== LANGUAGE DROPDOWN FUNCTIONALITY ====================

// Store translations globally
let translations = {};

// Load translations from JSON file
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        console.log('Translations loaded successfully');
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Translate the entire page
function translatePage(language) {
    if (!translations[language]) {
        console.error('Translation not available for:', language);
        return;
    }

    const t = translations[language];

    // Navigation
    const signInBtn = document.querySelector('.sign-in');
    if (signInBtn && !localStorage.getItem('currentUser')) {
        signInBtn.textContent = t.nav.signIn;
    }

    // Hero Section
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = t.hero.title;

    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;

    const heroEmailInput = document.querySelector('.hero .email');
    if (heroEmailInput) heroEmailInput.placeholder = t.hero.emailPlaceholder;

    const heroGetStarted = document.querySelector('.hero .get-started');
    if (heroGetStarted) heroGetStarted.textContent = t.hero.getStarted;

    const heroCTA = document.querySelector('.hero .watch-free');
    if (heroCTA) heroCTA.textContent = t.hero.ctaText;

    // Carousel
    const carouselHeading = document.querySelector('.carousel-heading');
    if (carouselHeading) carouselHeading.textContent = t.carousel.heading;

    // Features
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length >= 4) {
        featureCards[0].querySelector('h3').textContent = t.features.feature1.title;
        featureCards[0].querySelector('p').textContent = t.features.feature1.description;

        featureCards[1].querySelector('h3').textContent = t.features.feature2.title;
        featureCards[1].querySelector('p').textContent = t.features.feature2.description;

        featureCards[2].querySelector('h3').textContent = t.features.feature3.title;
        featureCards[2].querySelector('p').textContent = t.features.feature3.description;

        featureCards[3].querySelector('h3').textContent = t.features.feature4.title;
        featureCards[3].querySelector('p').textContent = t.features.feature4.description;
    }

    // FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length >= 6) {
        faqItems[0].querySelector('.faq-question').textContent = t.faq.question1;
        faqItems[0].querySelector('.faq-answer').textContent = t.faq.answer1;

        faqItems[1].querySelector('.faq-question').textContent = t.faq.question2;
        faqItems[1].querySelector('.faq-answer').textContent = t.faq.answer2;

        faqItems[2].querySelector('.faq-question').textContent = t.faq.question3;
        faqItems[2].querySelector('.faq-answer').textContent = t.faq.answer3;

        faqItems[3].querySelector('.faq-question').textContent = t.faq.question4;
        faqItems[3].querySelector('.faq-answer').textContent = t.faq.answer4;

        faqItems[4].querySelector('.faq-question').textContent = t.faq.question5;
        faqItems[4].querySelector('.faq-answer').textContent = t.faq.answer5;

        faqItems[5].querySelector('.faq-question').textContent = t.faq.question6;
        faqItems[5].querySelector('.faq-answer').textContent = t.faq.answer6;
    }

    // Footer
    const footerLinks = document.querySelectorAll('footer a');
    if (footerLinks.length >= 8) {
        footerLinks[0].textContent = t.footer.faq;
        footerLinks[1].textContent = t.footer.help;
        footerLinks[2].textContent = t.footer.account;
        footerLinks[3].textContent = t.footer.media;
        footerLinks[4].textContent = t.footer.relations;
        footerLinks[5].textContent = t.footer.ways;
        footerLinks[6].textContent = t.footer.terms;
        footerLinks[7].textContent = t.footer.privacy;
    }

    const footerText = document.querySelector('footer p');
    if (footerText) footerText.textContent = t.footer.contactText;

    // Auth Modals
    const signInTitle = document.querySelector('#signInModal .modal-title');
    if (signInTitle) signInTitle.textContent = t.auth.signInTitle;

    const signInEmailLabel = document.querySelector('#signInModal label[for="signInEmail"]');
    if (signInEmailLabel) signInEmailLabel.textContent = t.auth.emailLabel;

    const signInEmailInput = document.getElementById('signInEmail');
    if (signInEmailInput) signInEmailInput.placeholder = t.auth.emailPlaceholder;

    const signInPasswordLabel = document.querySelector('#signInModal label[for="signInPassword"]');
    if (signInPasswordLabel) signInPasswordLabel.textContent = t.auth.passwordLabel;

    const signInPasswordInput = document.getElementById('signInPassword');
    if (signInPasswordInput) signInPasswordInput.placeholder = t.auth.passwordPlaceholder;

    const signInButton = document.querySelector('#signInModal button[type="submit"]');
    if (signInButton) signInButton.textContent = t.auth.signInButton;

    const signInFooter = document.querySelector('#signInModal .modal-footer');
    if (signInFooter) {
        const footerText = signInFooter.querySelector('span');
        const switchLink = signInFooter.querySelector('a');
        if (footerText && switchLink) {
            footerText.textContent = t.auth.newToCinezy + ' ';
            switchLink.textContent = t.auth.signUpNow;
        }
    }

    const forgotPassword = document.querySelector('#signInModal .forgot-password');
    if (forgotPassword) forgotPassword.textContent = t.auth.forgotPassword;

    // Sign Up Modal
    const signUpTitle = document.querySelector('#signUpModal .modal-title');
    if (signUpTitle) signUpTitle.textContent = t.auth.signUpTitle;

    const signUpNameLabel = document.querySelector('#signUpModal label[for="signUpName"]');
    if (signUpNameLabel) signUpNameLabel.textContent = t.auth.nameLabel;

    const signUpNameInput = document.getElementById('signUpName');
    if (signUpNameInput) signUpNameInput.placeholder = t.auth.namePlaceholder;

    const signUpEmailLabel = document.querySelector('#signUpModal label[for="signUpEmail"]');
    if (signUpEmailLabel) signUpEmailLabel.textContent = t.auth.emailLabel;

    const signUpEmailInput = document.getElementById('signUpEmail');
    if (signUpEmailInput) signUpEmailInput.placeholder = t.auth.emailPlaceholder;

    const signUpPasswordLabel = document.querySelector('#signUpModal label[for="signUpPassword"]');
    if (signUpPasswordLabel) signUpPasswordLabel.textContent = t.auth.passwordLabel;

    const signUpPasswordInput = document.getElementById('signUpPassword');
    if (signUpPasswordInput) signUpPasswordInput.placeholder = t.auth.passwordPlaceholder;

    const signUpConfirmPasswordLabel = document.querySelector('#signUpModal label[for="signUpConfirmPassword"]');
    if (signUpConfirmPasswordLabel) signUpConfirmPasswordLabel.textContent = t.auth.confirmPasswordLabel;

    const signUpConfirmPasswordInput = document.getElementById('signUpConfirmPassword');
    if (signUpConfirmPasswordInput) signUpConfirmPasswordInput.placeholder = t.auth.confirmPasswordPlaceholder;

    const signUpButton = document.querySelector('#signUpModal button[type="submit"]');
    if (signUpButton) signUpButton.textContent = t.auth.signUpButton;

    const signUpFooter = document.querySelector('#signUpModal .modal-footer');
    if (signUpFooter) {
        const footerText = signUpFooter.querySelector('span');
        const switchLink = signUpFooter.querySelector('a');
        if (footerText && switchLink) {
            footerText.textContent = t.auth.alreadyMember + ' ';
            switchLink.textContent = t.auth.signInNow;
        }
    }

    console.log('Page translated to:', language);
}

function initLanguageDropdown(buttonId, menuId) {
    const langButton = document.getElementById(buttonId);
    const langMenu = document.getElementById(menuId);
    
    if (!langButton || !langMenu) return;
    
    // Toggle dropdown
    langButton.addEventListener('click', function(e) {
        e.stopPropagation();
        langMenu.classList.toggle('active');
        langButton.classList.toggle('active');
        
        // Close other dropdown if open
        const otherMenuId = menuId === 'langMenu' ? 'langMenuFooter' : 'langMenu';
        const otherButtonId = buttonId === 'langButton' ? 'langButtonFooter' : 'langButton';
        const otherMenu = document.getElementById(otherMenuId);
        const otherButton = document.getElementById(otherButtonId);
        
        if (otherMenu && otherButton) {
            otherMenu.classList.remove('active');
            otherButton.classList.remove('active');
        }
    });
    
    // Select language option
    const langOptions = langMenu.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const selectedLang = this.getAttribute('data-lang');
            
            // Update both dropdowns
            updateLanguageDisplay('langButton', selectedLang);
            updateLanguageDisplay('langButtonFooter', selectedLang);
            
            // Close dropdown
            langMenu.classList.remove('active');
            langButton.classList.remove('active');
            
            // Store language preference
            localStorage.setItem('selectedLanguage', selectedLang);
            
            // Translate the page
            translatePage(selectedLang);
        });
    });
}

function updateLanguageDisplay(buttonId, language) {
    const button = document.getElementById(buttonId);
    if (button) {
        const langText = button.querySelector('.lang-text');
        if (langText) {
            langText.textContent = language;
        }
    }
}

// ==================== DOCUMENT READY ====================

document.addEventListener('DOMContentLoaded', async function() {
    // Load translations first
    await loadTranslations();
    
    // === Authentication Setup ===
    
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

            errorMsg.textContent = '';

            if (!validateEmail(email)) {
                errorMsg.textContent = 'Please enter a valid email address';
                return;
            }

            if (password.length < 6) {
                errorMsg.textContent = 'Password must be at least 6 characters';
                return;
            }

            const users = JSON.parse(localStorage.getItem('cinezUsers')) || {};
            
            if (users[email] && users[email].password === password) {
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

            errorMsg.textContent = '';

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

            const users = JSON.parse(localStorage.getItem('cinezUsers')) || {};
            
            if (users[email]) {
                errorMsg.textContent = 'An account with this email already exists';
                return;
            }

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

    // === Language Dropdown Setup ===
    
    initLanguageDropdown('langButton', 'langMenu');
    initLanguageDropdown('langButtonFooter', 'langMenuFooter');

    // Close language dropdown when clicking outside
    document.addEventListener('click', function() {
        const langMenus = document.querySelectorAll('.lang-menu');
        const langButtons = document.querySelectorAll('.lang');
        
        langMenus.forEach(menu => menu.classList.remove('active'));
        langButtons.forEach(button => button.classList.remove('active'));
    });

    // Load saved language preference
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        updateLanguageDisplay('langButton', savedLang);
        updateLanguageDisplay('langButtonFooter', savedLang);
        translatePage(savedLang);
    } else {
        // Default to English
        translatePage('English');
    }
});
