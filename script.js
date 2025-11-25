/* ========================================
   WHAT DO I TIP - JAVASCRIPT
   Tip Calculator & Spinner Functionality
   ======================================== */

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeCookieBanner();
    initializeCalculator();
    initializeSpinner();
    initializeContactForm();
});

// ========================================
// COOKIE BANNER
// ========================================

/**
 * Initialize and manage cookie consent banner
 */
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');

    if (!cookieBanner) return;

    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('whatDoITip_cookieConsent');
    
    if (cookieConsent === 'accepted') {
        cookieBanner.classList.add('hidden');
    }

    // Handle accept button
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('whatDoITip_cookieConsent', 'accepted');
            cookieBanner.classList.add('hidden');
        });
    }
}

// ========================================
// TIP CALCULATOR
// ========================================

/**
 * Initialize tip calculator event listeners
 */
function initializeCalculator() {
    const form = document.getElementById('calculator-form');
    const billAmount = document.getElementById('bill-amount');
    const numPeople = document.getElementById('num-people');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const customTip = document.getElementById('custom-tip');
    const resultsCard = document.getElementById('results-card');

    if (!form) return; // Not on calculator page

    // Set initial state
    let selectedTipPercentage = null;

    // Handle preset tip buttons
    tipButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectedTipPercentage = parseFloat(btn.getAttribute('data-tip'));
            customTip.value = '';
            
            // Update button states
            tipButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            updateCalculatorResults();
        });
    });

    // Handle custom tip input
    customTip.addEventListener('input', () => {
        if (customTip.value) {
            selectedTipPercentage = parseFloat(customTip.value) || null;
            tipButtons.forEach(b => b.classList.remove('active'));
            updateCalculatorResults();
        }
    });

    // Handle bill amount input
    billAmount.addEventListener('input', () => {
        clearBillError();
        updateCalculatorResults();
    });

    // Handle number of people input
    numPeople.addEventListener('input', () => {
        updateCalculatorResults();
    });

    // Handle form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        updateCalculatorResults();
    });

    /**
     * Update and display calculator results
     */
    function updateCalculatorResults() {
        const bill = parseFloat(billAmount.value) || 0;
        let people = parseInt(numPeople.value) || 1;
        const tipPercent = selectedTipPercentage || 0;

        // Validate bill amount
        if (bill <= 0) {
            showBillError('Please enter a valid bill amount');
            resultsCard.style.display = 'none';
            return;
        }

        // Validate people
        if (people < 1) {
            people = 1;
            numPeople.value = 1;
            showPeopleHelper('Defaulting to 1 person');
        } else {
            hidePeopleHelper();
        }

        // Calculate results
        const tipAmount = (bill * tipPercent) / 100;
        const totalWithTip = bill + tipAmount;
        const perPersonTip = tipAmount / people;
        const perPersonTotal = totalWithTip / people;

        // Display results
        document.getElementById('tip-amount').textContent = '$' + tipAmount.toFixed(2);
        document.getElementById('total-with-tip').textContent = '$' + totalWithTip.toFixed(2);
        document.getElementById('per-person-tip').textContent = '$' + perPersonTip.toFixed(2);
        document.getElementById('per-person-total').textContent = '$' + perPersonTotal.toFixed(2);

        resultsCard.style.display = 'block';
    }

    /**
     * Show bill amount error
     */
    function showBillError(message) {
        const errorElement = document.getElementById('bill-error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        billAmount.classList.add('error');
    }

    /**
     * Clear bill amount error
     */
    function clearBillError() {
        const errorElement = document.getElementById('bill-error');
        errorElement.classList.remove('show');
        billAmount.classList.remove('error');
    }

    /**
     * Show people helper message
     */
    function showPeopleHelper(message) {
        const helperElement = document.getElementById('people-helper');
        helperElement.textContent = message;
        helperElement.classList.add('show');
    }

    /**
     * Hide people helper message
     */
    function hidePeopleHelper() {
        const helperElement = document.getElementById('people-helper');
        helperElement.classList.remove('show');
    }
}

// ========================================
// NAME SPINNER
// ========================================

/**
 * Initialize name spinner functionality
 */
function initializeSpinner() {
    const nameInput = document.getElementById('name-input');
    const addNameBtn = document.getElementById('add-name-btn');
    const namesList = document.getElementById('names-list');
    const spinButton = document.getElementById('spin-button');
    const wheelSvg = document.getElementById('wheel-svg');
    const winnerDisplay = document.getElementById('winner-display');

    if (!nameInput) return; // Not on calculator page with spinner

    let names = [];
    const colors = ['#d4a574', '#8b4645', '#c1956f', '#a1565c', '#b8956a', '#9d5a5f'];

    // Load names from localStorage
    loadNamesFromLocalStorage();

    // Handle add name button
    if (addNameBtn) {
        addNameBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (name) {
                addName(name);
                nameInput.value = '';
                nameInput.focus();
            }
        });
    }

    // Handle enter key in name input
    if (nameInput) {
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const name = nameInput.value.trim();
                if (name) {
                    addName(name);
                    nameInput.value = '';
                }
            }
        });
    }

    // Handle spin button
    if (spinButton) {
        spinButton.addEventListener('click', () => {
            spinWheel();
        });
    }

    /**
     * Add a name to the list
     */
    function addName(name) {
        // Prevent duplicates
        if (names.includes(name)) {
            alert('This name is already in the list!');
            return;
        }

        names.push(name);
        saveNamesToLocalStorage();
        renderNamesList();
        updateWheelSegments();
        updateSpinButton();
    }

    /**
     * Remove a name from the list
     */
    function removeName(name) {
        names = names.filter(n => n !== name);
        saveNamesToLocalStorage();
        renderNamesList();
        updateWheelSegments();
        updateSpinButton();
    }

    /**
     * Render the names list in the DOM
     */
    function renderNamesList() {
        namesList.innerHTML = '';
        names.forEach(name => {
            const tag = document.createElement('div');
            tag.className = 'name-tag';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = name;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'name-delete';
            deleteBtn.textContent = '×';
            deleteBtn.type = 'button';
            deleteBtn.addEventListener('click', () => {
                removeName(name);
            });

            tag.appendChild(nameSpan);
            tag.appendChild(deleteBtn);
            namesList.appendChild(tag);
        });
    }

    /**
     * Create SVG pie chart segments
     */
    function updateWheelSegments() {
        wheelSvg.innerHTML = '';
        
        if (names.length === 0) return;

        const center = 100;
        const radius = 95;
        const sliceAngle = 360 / names.length;

        names.forEach((name, index) => {
            const startAngle = index * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            // Create SVG path for pie slice
            const path = createSlicePath(center, radius, startAngle, endAngle);
            const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathElement.setAttribute('d', path);
            pathElement.setAttribute('fill', colors[index % colors.length]);
            pathElement.setAttribute('stroke', 'white');
            pathElement.setAttribute('stroke-width', '2');
            pathElement.className = 'wheel-segment-path';
            wheelSvg.appendChild(pathElement);

            // Add text label
            const textAngle = startAngle + sliceAngle / 2;
            const textRadius = radius * 0.65;
            const textX = center + textRadius * Math.cos((textAngle - 90) * Math.PI / 180);
            const textY = center + textRadius * Math.sin((textAngle - 90) * Math.PI / 180);

            const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            textElement.setAttribute('x', textX);
            textElement.setAttribute('y', textY);
            textElement.setAttribute('text-anchor', 'middle');
            textElement.setAttribute('dominant-baseline', 'middle');
            textElement.className = 'wheel-segment-text';
            textElement.setAttribute('transform', `rotate(${textAngle} ${textX} ${textY})`);
            textElement.textContent = name;
            wheelSvg.appendChild(textElement);
        });
    }

    /**
     * Create SVG path for a pie slice
     */
    function createSlicePath(center, radius, startAngle, endAngle) {
        const start = polarToCartesian(center, radius, endAngle);
        const end = polarToCartesian(center, radius, startAngle);
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        const path = [
            `M ${center} ${center}`,
            `L ${start.x} ${start.y}`,
            `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
            'Z'
        ].join(' ');

        return path;
    }

    /**
     * Convert polar coordinates to cartesian
     */
    function polarToCartesian(center, radius, angle) {
        const radians = (angle - 90) * Math.PI / 180.0;
        return {
            x: center + (radius * Math.cos(radians)),
            y: center + (radius * Math.sin(radians))
        };
    }

    /**
     * Update spin button state
     */
    function updateSpinButton() {
        if (spinButton) {
            spinButton.disabled = names.length < 2;
        }
    }

    /**
     * Spin the wheel and select a winner
     */
    function spinWheel() {
        if (names.length < 2) {
            alert('Please add at least 2 names!');
            return;
        }

        spinButton.classList.add('spinning');
        spinButton.disabled = true;

        // Select random winner
        const randomIndex = Math.floor(Math.random() * names.length);
        const sliceAngle = 360 / names.length;
        
        // Calculate where the pointer should be (pointing up at 0 degrees)
        // We want segment at randomIndex to be at top, so we rotate wheel backwards
        const segmentCenter = randomIndex * sliceAngle + (sliceAngle / 2);
        const rotations = 10; // Full rotations for visual effect
        const randomOffset = Math.random() * sliceAngle * 0.8; // Randomize within segment
        const totalRotation = (rotations * 360) + (360 - segmentCenter) + randomOffset;

        // Apply rotation animation to SVG
        wheelSvg.style.transition = 'transform 3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        wheelSvg.style.transformOrigin = '50% 50%';
        wheelSvg.style.transform = `rotate(${totalRotation}deg)`;

        // Show winner after animation
        setTimeout(() => {
            const winner = names[randomIndex];
            showWinner(winner);
            spinButton.classList.remove('spinning');
            spinButton.disabled = false;
        }, 3000);
    }

    /**
     * Display the winner
     */
    function showWinner(name) {
        const winnerName = document.getElementById('winner-name');
        winnerName.textContent = name;
        winnerDisplay.style.display = 'block';

        // Scroll to winner display
        setTimeout(() => {
            winnerDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    /**
     * Save names to localStorage
     */
    function saveNamesToLocalStorage() {
        localStorage.setItem('whatDoITip_names', JSON.stringify(names));
    }

    /**
     * Load names from localStorage
     */
    function loadNamesFromLocalStorage() {
        const saved = localStorage.getItem('whatDoITip_names');
        if (saved) {
            names = JSON.parse(saved);
            renderNamesList();
            updateWheelSegments();
            updateSpinButton();
        }
    }
}

// ========================================
// CONTACT FORM
// ========================================

/**
 * Initialize contact form validation and submission
 */
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return; // Not on contact page

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateAndSubmitContactForm();
    });

    /**
     * Validate and handle form submission
     */
    function validateAndSubmitContactForm() {
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');
        const successMessage = document.getElementById('form-success');

        // Clear previous errors
        clearAllErrors();

        let isValid = true;

        // Validate name
        const name = nameInput.value.trim();
        if (!name) {
            showError('name-error', 'Please enter your name');
            isValid = false;
        }

        // Validate email
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('email-error', 'Please enter your email address');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate message
        const message = messageInput.value.trim();
        if (!message) {
            showError('message-error', 'Please enter a message');
            isValid = false;
        }

        // If valid, show success message
        if (isValid) {
            successMessage.style.display = 'block';
            form.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }

    /**
     * Show error message
     */
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    /**
     * Clear all error messages
     */
    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format number as currency
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// ACCESSIBILITY & PROGRESSIVE ENHANCEMENT
// ========================================

/**
 * Handle keyboard navigation for buttons
 */
document.addEventListener('keydown', (e) => {
    // Allow Enter/Space to activate buttons
    if (e.target.tagName === 'BUTTON' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        e.target.click();
    }

    // Close cookie banner with Escape key
    const cookieBanner = document.getElementById('cookie-banner');
    if (e.key === 'Escape' && cookieBanner && !cookieBanner.classList.contains('hidden')) {
        cookieBanner.classList.add('hidden');
    }
});

/**
 * Announce dynamic content changes to screen readers
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
        announcement.remove();
    }, 1000);
}