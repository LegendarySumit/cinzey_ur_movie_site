// Language Dropdown Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language dropdowns
    initLanguageDropdown('langButton', 'langMenu');
    initLanguageDropdown('langButtonFooter', 'langMenuFooter');
});

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

// Close dropdown when clicking outside
document.addEventListener('click', function() {
    const langMenus = document.querySelectorAll('.lang-menu');
    const langButtons = document.querySelectorAll('.lang');
    
    langMenus.forEach(menu => menu.classList.remove('active'));
    langButtons.forEach(button => button.classList.remove('active'));
});

// Load saved language preference
window.addEventListener('load', function() {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        updateLanguageDisplay('langButton', savedLang);
        updateLanguageDisplay('langButtonFooter', savedLang);
    }
});
