// Custom JavaScript for codebrief Documentation

// Ensure headings are visible immediately
document.documentElement.style.setProperty('--heading-visibility', 'visible');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all headings are visible first
    ensureHeadingVisibility();

    // Initialize all features with a small delay to prevent rendering issues
    setTimeout(() => {
        initSmoothScrolling();
        initCodeCopyEnhancements();
        initScrollToTop();
        initProgressIndicator();
        initSearchEnhancements();
        initCardAnimations();
        initTableEnhancements();
        initThemeTransitions();

        // Initialize LED effects last to prevent interference
        setTimeout(() => {
            initLEDEffects();
        }, 100);

        console.log('codebrief documentation enhanced! 🚀');
    }, 50);
});

/**
 * Ensure headings are always visible
 */
function ensureHeadingVisibility() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        heading.style.opacity = '1';
        heading.style.visibility = 'visible';
        // Prevent text-fill-color issues during load
        if (getComputedStyle(heading).webkitTextFillColor === 'rgba(0, 0, 0, 0)') {
            heading.style.webkitTextFillColor = 'initial';
        }
    });
}

/**
 * Enhanced smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });
}

/**
 * Enhanced code copy functionality
 */
function initCodeCopyEnhancements() {
    // Add copy success feedback
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('md-clipboard')) {
            const button = e.target;
            const originalTitle = button.title;

            // Show success feedback
            button.title = 'Copied! ✓';
            button.style.background = '#10b981';

            // Reset after 2 seconds
            setTimeout(() => {
                button.title = originalTitle;
                button.style.background = '';
            }, 2000);
        }
    });

    // Add keyboard shortcut for code copy (Ctrl+Shift+C)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            const activeCodeBlock = document.querySelector('.md-typeset .highlight:hover');
            if (activeCodeBlock) {
                const copyButton = activeCodeBlock.querySelector('.md-clipboard');
                if (copyButton) {
                    copyButton.click();
                }
            }
        }
    });
}

/**
 * Scroll to top functionality
 */
function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.title = 'Scroll to top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb, #10b981);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(scrollButton);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Reading progress indicator
 */
function initProgressIndicator() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #10b981);
        z-index: 9999;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Enhanced search functionality
 */
function initSearchEnhancements() {
    const searchInput = document.querySelector('.md-search__input');
    if (searchInput) {
        // Add keyboard shortcut (Ctrl+K or Cmd+K)
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });

        // Add search hint
        if (!searchInput.placeholder) {
            searchInput.placeholder = 'Search documentation... (Ctrl+K)';
        }
    }
}

/**
 * Card hover animations
 */
function initCardAnimations() {
    const cards = document.querySelectorAll('.grid.cards .card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Table enhancements
 */
function initTableEnhancements() {
    const tables = document.querySelectorAll('.md-typeset table');

    tables.forEach(table => {
        // Add responsive wrapper
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
            overflow-x: auto;
            margin: 1.5rem 0;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        `;

        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);

        // Add hover effects to rows
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
            });

            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    });
}

/**
 * Theme transition improvements
 */
function initThemeTransitions() {
    // Smooth theme transitions
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);

    // Watch for theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
                // Theme changed, trigger any necessary updates
                updateThemeSpecificElements();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
    });
}

/**
 * Update elements based on theme
 */
function updateThemeSpecificElements() {
    const isDark = document.documentElement.getAttribute('data-md-color-scheme') === 'slate';

    // Update custom elements for dark/light theme
    const customElements = document.querySelectorAll('.scroll-to-top, .reading-progress');
    customElements.forEach(element => {
        if (isDark) {
            element.style.filter = 'brightness(0.9)';
        } else {
            element.style.filter = 'brightness(1)';
        }
    });
}

/**
 * Keyboard navigation enhancements
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key to close search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('.md-search__input');
            if (searchInput && document.activeElement === searchInput) {
                searchInput.blur();
            }
        }

        // Tab navigation improvements
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * Performance monitoring (development helper)
 */
function initPerformanceMonitoring() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Log page load performance
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('📊 Page Performance:', {
                    'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart) + 'ms',
                    'Full Load Time': Math.round(perfData.loadEventEnd - perfData.navigationStart) + 'ms',
                    'Time to Interactive': Math.round(perfData.domInteractive - perfData.navigationStart) + 'ms'
                });
            }, 0);
        });
    }
}

/**
 * Accessibility improvements
 */
function initAccessibilityEnhancements() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2563eb;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
    `;

    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Mark main content area
    const mainContent = document.querySelector('.md-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

/**
 * Code syntax highlighting enhancements
 */
function initCodeEnhancements() {
    // Add language labels to code blocks
    const codeBlocks = document.querySelectorAll('.md-typeset .highlight');

    codeBlocks.forEach(block => {
        const code = block.querySelector('code');
        if (code && code.className) {
            const langMatch = code.className.match(/language-(\w+)/);
            if (langMatch) {
                const label = document.createElement('div');
                label.textContent = langMatch[1].toUpperCase();
                label.style.cssText = `
                    position: absolute;
                    top: 8px;
                    right: 50px;
                    background: rgba(0, 0, 0, 0.1);
                    color: rgba(255, 255, 255, 0.7);
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    z-index: 1;
                `;

                block.style.position = 'relative';
                block.appendChild(label);
            }
        }
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initKeyboardNavigation();
    initPerformanceMonitoring();
    initAccessibilityEnhancements();
    initCodeEnhancements();
});

// Add CSS for keyboard navigation
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #10b981 !important;
        outline-offset: 2px !important;
    }

    .skip-link:focus {
        outline: none !important;
    }
`;
document.head.appendChild(keyboardStyles);

// Custom JavaScript for animations and UX enhancements

document.addEventListener("DOMContentLoaded", function() {
    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Fade-in Animations ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Add fade-in class to elements you want to animate
    document.querySelectorAll('.md-content h1, .md-content h2, .md-content h3, .grid.cards > *').forEach(el => {
        el.classList.add('fade-in');
    });

    // --- Code Block Copy Feedback ---
    const codeBlocks = document.querySelectorAll('.md-clipboard');
    codeBlocks.forEach(block => {
        block.addEventListener('click', () => {
            const originalIcon = block.innerHTML;
            block.innerHTML = '<span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg></span>';
            setTimeout(() => {
                block.innerHTML = originalIcon;
            }, 2000);
        });
    });
});

/**
 * LED Effects Initialization and Dynamic Behaviors
 */
function initLEDEffects() {
    const ledText = document.querySelector('.led-text.neon-flicker');
    const heroSection = document.querySelector('.hero-section');

    if (!ledText) return;

    // More authentic random flicker intensity with varied timing
    let flickerInterval1 = setInterval(() => {
        const flickerIntensity = Math.random() * 0.4 + 0.6; // 0.6 to 1.0
        ledText.style.filter = `brightness(${flickerIntensity})`;

        // Random micro-flickers
        if (Math.random() < 0.15) { // 15% chance
            setTimeout(() => {
                ledText.style.filter = `brightness(${Math.random() * 0.3 + 0.2})`;
                setTimeout(() => {
                    ledText.style.filter = `brightness(1)`;
                }, Math.random() * 50 + 10); // 10-60ms
            }, Math.random() * 100 + 50); // 50-150ms delay
        }
    }, Math.random() * 300 + 100); // 100-400ms intervals

    // Secondary random flicker layer
    let flickerInterval2 = setInterval(() => {
        if (Math.random() < 0.08) { // 8% chance of deep flicker
            const originalOpacity = ledText.style.opacity || '1';
            ledText.style.opacity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4

            setTimeout(() => {
                ledText.style.opacity = originalOpacity;
            }, Math.random() * 80 + 20); // 20-100ms
        }
    }, Math.random() * 500 + 200); // 200-700ms intervals

    // Occasional power surge effect (more random timing)
    let surgeTimeout;
    function schedulePowerSurge() {
        const delay = Math.random() * 8000 + 2000; // 2-10 seconds
        surgeTimeout = setTimeout(() => {
            if (Math.random() < 0.3) { // 30% chance when triggered
                ledText.classList.add('power-surge');
                setTimeout(() => ledText.classList.remove('power-surge'), 300);
            }
            schedulePowerSurge(); // Schedule next surge
        }, delay);
    }
    schedulePowerSurge();

    // Add mouse interaction effects
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            // Faster flicker on hover with more intensity variation
            clearInterval(flickerInterval1);
            clearInterval(flickerInterval2);

            flickerInterval1 = setInterval(() => {
                const flickerIntensity = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
                ledText.style.filter = `brightness(${flickerIntensity})`;
            }, Math.random() * 150 + 50); // Faster: 50-200ms

            heroSection.style.background = 'radial-gradient(circle at center, rgba(0, 255, 255, 0.2), rgba(0, 0, 0, 0.8))';
        });

        heroSection.addEventListener('mouseleave', () => {
            // Reset to normal flicker speed
            clearInterval(flickerInterval1);
            clearInterval(flickerInterval2);

            // Restart normal intervals
            flickerInterval1 = setInterval(() => {
                const flickerIntensity = Math.random() * 0.4 + 0.6;
                ledText.style.filter = `brightness(${flickerIntensity})`;
            }, Math.random() * 300 + 100);

            heroSection.style.background = 'radial-gradient(circle at center, rgba(0, 255, 255, 0.1), rgba(0, 0, 0, 0.9))';
        });
    }

    // Add click effect for LED display
    const ledContainer = document.querySelector('.led-display-container');
    if (ledContainer) {
        ledContainer.addEventListener('click', () => {
            // Temporarily boost all effects
            ledContainer.style.boxShadow = `
                inset 0 0 30px rgba(0, 255, 255, 0.3),
                0 0 60px rgba(0, 255, 255, 0.5),
                0 0 4px var(--neon-primary)
            `;

            ledText.style.textShadow = `
                0 0 10px var(--neon-primary),
                0 0 20px var(--neon-primary),
                0 0 30px var(--neon-primary),
                0 0 40px var(--neon-primary)
            `;

            // Add temporary fast flicker
            let clickFlickerCount = 0;
            const clickFlicker = setInterval(() => {
                ledText.style.filter = `brightness(${Math.random() * 0.6 + 0.4})`;
                clickFlickerCount++;
                if (clickFlickerCount > 20) {
                    clearInterval(clickFlicker);
                    ledText.style.filter = '';
                }
            }, 50);

            // Reset after 1 second
            setTimeout(() => {
                ledContainer.style.boxShadow = '';
                ledText.style.textShadow = '';
            }, 1000);
        });
    }

    // Add keyboard shortcuts for LED effects
    document.addEventListener('keydown', (e) => {
        if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            toggleLEDEffects();
        }
    });

    // Clean up intervals when page unloads
    window.addEventListener('beforeunload', () => {
        clearInterval(flickerInterval1);
        clearInterval(flickerInterval2);
        clearTimeout(surgeTimeout);
    });

    // Performance optimization: reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        // Reduce animation frequency on low-end devices
        clearInterval(flickerInterval1);
        clearInterval(flickerInterval2);

        // Slower, less intensive flicker for low-end devices
        flickerInterval1 = setInterval(() => {
            const flickerIntensity = Math.random() * 0.3 + 0.7;
            ledText.style.filter = `brightness(${flickerIntensity})`;
        }, Math.random() * 500 + 200);
    }
}

/**
 * Toggle LED effects on/off
 */
function toggleLEDEffects() {
    const ledElements = document.querySelectorAll('.neon-flicker, .led-indicator, .led-border-top, .led-border-bottom, .led-border-left, .led-border-right');

    ledElements.forEach(element => {
        if (element.style.animationPlayState === 'paused') {
            element.style.animationPlayState = 'running';
        } else {
            element.style.animationPlayState = 'paused';
        }
    });
}

// Add CSS for power surge effect
const powerSurgeCSS = `
.power-surge {
    animation: powerSurge 0.3s ease-out !important;
}

@keyframes powerSurge {
    0% {
        text-shadow:
            0 0 5px var(--neon-primary),
            0 0 10px var(--neon-primary),
            0 0 15px var(--neon-primary),
            0 0 20px var(--neon-primary);
        transform: scale(1);
    }
    50% {
        text-shadow:
            0 0 15px var(--neon-primary),
            0 0 30px var(--neon-primary),
            0 0 45px var(--neon-primary),
            0 0 60px var(--neon-primary);
        transform: scale(1.05);
        filter: brightness(1.5);
    }
    100% {
        text-shadow:
            0 0 5px var(--neon-primary),
            0 0 10px var(--neon-primary),
            0 0 15px var(--neon-primary),
            0 0 20px var(--neon-primary);
        transform: scale(1);
    }
}
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = powerSurgeCSS;
document.head.appendChild(style);
