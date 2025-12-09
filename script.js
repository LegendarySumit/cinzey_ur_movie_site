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

    // Hero Section - uses span tags
    const heroSpans = document.querySelectorAll('.hero > span');
    if (heroSpans.length >= 3) {
        if (heroSpans[0]) heroSpans[0].textContent = t.hero.title;
        if (heroSpans[1]) heroSpans[1].textContent = t.hero.subtitle;
        if (heroSpans[2]) heroSpans[2].textContent = t.hero.cta;
    }

    const heroEmailInput = document.querySelector('.first-email-input');
    if (heroEmailInput) heroEmailInput.placeholder = t.hero.emailPlaceholder;

    const heroGetStarted = document.querySelector('.hero .get-started');
    if (heroGetStarted) {
        // Keep the arrow image, just update text
        const img = heroGetStarted.querySelector('img');
        heroGetStarted.textContent = t.hero.getStarted + ' ';
        if (img) heroGetStarted.appendChild(img);
    }

    // Carousel
    const carouselHeading = document.querySelector('.carousel-heading');
    if (carouselHeading) carouselHeading.textContent = t.carousel.heading;

    // Features Section
    const featuresHeading = document.querySelector('.about h3');
    if (featuresHeading) featuresHeading.textContent = t.features.heading;

    const features = document.querySelectorAll('.feature');
    if (features.length >= 4) {
        const feature1H2 = features[0].querySelector('h2');
        const feature1P = features[0].querySelector('p');
        if (feature1H2) feature1H2.textContent = t.features.feature1Title;
        if (feature1P) feature1P.textContent = t.features.feature1Desc;

        const feature2H2 = features[1].querySelector('h2');
        const feature2P = features[1].querySelector('p');
        if (feature2H2) feature2H2.textContent = t.features.feature2Title;
        if (feature2P) feature2P.textContent = t.features.feature2Desc;

        const feature3H2 = features[2].querySelector('h2');
        const feature3P = features[2].querySelector('p');
        if (feature3H2) feature3H2.textContent = t.features.feature3Title;
        if (feature3P) feature3P.textContent = t.features.feature3Desc;

        const feature4H2 = features[3].querySelector('h2');
        const feature4P = features[3].querySelector('p');
        if (feature4H2) feature4H2.textContent = t.features.feature4Title;
        if (feature4P) feature4P.textContent = t.features.feature4Desc;
    }

    // FAQ Section
    const faqHeading = document.querySelector('.faq h3');
    if (faqHeading) faqHeading.textContent = t.faq.heading;

    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length >= 6) {
        // FAQ 1
        const faq1Q = faqItems[0].querySelector('.important-faqs p');
        const faq1A = faqItems[0].querySelectorAll('.faq-answer p');
        if (faq1Q) faq1Q.textContent = t.faq.q1;
        if (faq1A.length >= 2) {
            faq1A[0].textContent = t.faq.a1p1;
            faq1A[1].textContent = t.faq.a1p2;
        }

        // FAQ 2
        const faq2Q = faqItems[1].querySelector('.important-faqs p');
        const faq2A = faqItems[1].querySelector('.faq-answer p');
        if (faq2Q) faq2Q.textContent = t.faq.q2;
        if (faq2A) faq2A.textContent = t.faq.a2;

        // FAQ 3
        const faq3Q = faqItems[2].querySelector('.important-faqs p');
        const faq3A = faqItems[2].querySelectorAll('.faq-answer p');
        if (faq3Q) faq3Q.textContent = t.faq.q3;
        if (faq3A.length >= 2) {
            faq3A[0].textContent = t.faq.a3p1;
            faq3A[1].textContent = t.faq.a3p2;
        }

        // FAQ 4
        const faq4Q = faqItems[3].querySelector('.important-faqs p');
        const faq4A = faqItems[3].querySelector('.faq-answer p');
        if (faq4Q) faq4Q.textContent = t.faq.q4;
        if (faq4A) faq4A.textContent = t.faq.a4;

        // FAQ 5
        const faq5Q = faqItems[4].querySelector('.important-faqs p');
        const faq5A = faqItems[4].querySelector('.faq-answer p');
        if (faq5Q) faq5Q.textContent = t.faq.q5;
        if (faq5A) faq5A.textContent = t.faq.a5;

        // FAQ 6
        const faq6Q = faqItems[5].querySelector('.important-faqs p');
        const faq6A = faqItems[5].querySelectorAll('.faq-answer p');
        if (faq6Q) faq6Q.textContent = t.faq.q6;
        if (faq6A.length >= 2) {
            faq6A[0].textContent = t.faq.a6p1;
            faq6A[1].textContent = t.faq.a6p2;
        }
    }

    // FAQ CTA text at bottom
    const faqCTA = document.querySelector('.details h5');
    if (faqCTA) faqCTA.textContent = t.faq.ctaText;

    const faqEmailInput = document.querySelector('.email-input');
    if (faqEmailInput) faqEmailInput.placeholder = t.hero.emailPlaceholder;

    const faqGetStarted = document.querySelectorAll('.get-started')[1]; // Second get-started button
    if (faqGetStarted) {
        const img = faqGetStarted.querySelector('img');
        faqGetStarted.textContent = t.hero.getStarted + ' ';
        if (img) faqGetStarted.appendChild(img);
    }

    // Footer Links - need to get the exact footer links in order
    const footerLinks = document.querySelectorAll('footer .links a');
    const linkKeys = ['faq', 'supportHub', 'dataProtection', 'networkCheck', 'assistanceZone', 
                      'opportunities', 'privacySettings', 'policyDocuments', 'userProfile', 
                      'viewingOptions', 'companyDetails', 'exclusiveContent', 'pressRoom', 
                      'usageGuidelines', 'contactUs'];
    
    footerLinks.forEach((link, index) => {
        if (t.footer.links[linkKeys[index]]) {
            link.textContent = t.footer.links[linkKeys[index]];
        }
    });

    // Footer queries text
    const queriesText = document.querySelector('.queries p');
    if (queriesText) {
        // This contains "Any Queries? Call" + phone number in <u> tag
        const phoneUnderline = queriesText.querySelector('u');
        if (phoneUnderline) {
            const phoneNumber = phoneUnderline.textContent;
            queriesText.childNodes[0].textContent = t.footer.queries + ' ';
            phoneUnderline.textContent = phoneNumber;
        }
    }

    // Footer other elements
    const cinezyText = document.querySelector('.cinezy p');
    if (cinezyText) cinezyText.textContent = t.footer.cinezy;

    const recaptchaText = document.querySelector('.ending p');
    if (recaptchaText) {
        const learnMoreLink = recaptchaText.querySelector('a');
        recaptchaText.childNodes[0].textContent = t.footer.recaptcha + ' ';
        if (learnMoreLink) learnMoreLink.textContent = t.footer.learnMore;
    }

    // Auth Modals
    const signInTitle = document.querySelector('#signInModal .modal-title');
    if (signInTitle) signInTitle.textContent = t.auth.signInTitle;

    const signInEmailInput = document.getElementById('signInEmail');
    if (signInEmailInput) signInEmailInput.placeholder = t.auth.emailPlaceholder;

    const signInPasswordInput = document.getElementById('signInPassword');
    if (signInPasswordInput) signInPasswordInput.placeholder = t.auth.passwordPlaceholder;

    const signInButton = document.querySelector('#signInModal button[type="submit"]');
    if (signInButton) signInButton.textContent = t.auth.signInButton;

    const signInFooter = document.querySelector('#signInModal .modal-footer');
    if (signInFooter) {
        const footerSpan = signInFooter.querySelector('span');
        const switchLink = signInFooter.querySelector('a');
        if (footerSpan && switchLink) {
            footerSpan.textContent = t.auth.newToCinezy + ' ';
            switchLink.textContent = t.auth.signUpNow;
        }
    }

    const forgotPassword = document.querySelector('#signInModal .forgot-password');
    if (forgotPassword) forgotPassword.textContent = t.auth.forgotPassword;

    // Sign Up Modal
    const signUpTitle = document.querySelector('#signUpModal .modal-title');
    if (signUpTitle) signUpTitle.textContent = t.auth.signUpTitle;

    const signUpNameInput = document.getElementById('signUpName');
    if (signUpNameInput) signUpNameInput.placeholder = t.auth.namePlaceholder;

    const signUpEmailInput = document.getElementById('signUpEmail');
    if (signUpEmailInput) signUpEmailInput.placeholder = t.auth.emailPlaceholder;

    const signUpPasswordInput = document.getElementById('signUpPassword');
    if (signUpPasswordInput) signUpPasswordInput.placeholder = t.auth.passwordPlaceholder;

    const signUpConfirmPasswordInput = document.getElementById('signUpConfirmPassword');
    if (signUpConfirmPasswordInput) signUpConfirmPasswordInput.placeholder = t.auth.confirmPasswordPlaceholder;

    const signUpButton = document.querySelector('#signUpModal button[type="submit"]');
    if (signUpButton) signUpButton.textContent = t.auth.signUpButton;

    const signUpFooter = document.querySelector('#signUpModal .modal-footer');
    if (signUpFooter) {
        const footerSpan = signUpFooter.querySelector('span');
        const switchLink = signUpFooter.querySelector('a');
        if (footerSpan && switchLink) {
            footerSpan.textContent = t.auth.alreadyHaveAccount + ' ';
            switchLink.textContent = t.auth.signInLink;
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
