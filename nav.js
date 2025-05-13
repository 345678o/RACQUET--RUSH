// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Hamburger menu functionality
        const hamburger = document.getElementById('hamburger');
        const mainNav = document.getElementById('mainNav');
        
        if (hamburger && mainNav) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                mainNav.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInsideNav = mainNav.contains(event.target);
                const isClickOnHamburger = hamburger.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnHamburger && mainNav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            });

            // Close menu when clicking a link
            const navLinks = document.querySelectorAll('.main-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 900) {
                        hamburger.classList.remove('active');
                        mainNav.classList.remove('active');
                    }
                });
            });
        }

        // Set active nav item based on current page
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                const hamburger = document.getElementById('hamburger');
                const mainNav = document.getElementById('mainNav');
                if (hamburger && mainNav) {
                    hamburger.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            }
        });

        // Check login status and update navigation
        checkLoginStatus();
    } catch (error) {
        console.error("Error in navigation setup:", error);
    }
});

// Check login status
function checkLoginStatus() {
    const user = localStorage.getItem("loggedInUser");
    const logoutNav = document.getElementById("logoutNav");
    
    if (user) {
        if (logoutNav) {
            logoutNav.style.display = "block";
        }
    } else {
        if (logoutNav) {
            logoutNav.style.display = "none";
        }
    }
}

// Mobile navigation toggle
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const backdrop = document.getElementById('nav-backdrop');
    nav.classList.toggle('active');
    backdrop.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mainNav');
    const hamburger = document.getElementById('hamburger');
    const backdrop = document.getElementById('nav-backdrop');
    
    if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
        nav.classList.remove('active');
        backdrop.classList.remove('active');
    }
});

// Close menu on window resize
window.addEventListener('resize', function() {
    if(window.innerWidth > 900) {
        const nav = document.getElementById('mainNav');
        const backdrop = document.getElementById('nav-backdrop');
        nav.classList.remove('active');
        backdrop.classList.remove('active');
    }
});

// Close menu on scroll
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    const backdrop = document.getElementById('nav-backdrop');
    nav.classList.remove('active');
    backdrop.classList.remove('active');
});

// Add smooth scrolling to navigation
const nav = document.querySelector('.main-nav');
let isDown = false;
let startX;
let scrollLeft;

nav.addEventListener('mousedown', (e) => {
    isDown = true;
    nav.style.cursor = 'grabbing';
    startX = e.pageX - nav.offsetLeft;
    scrollLeft = nav.scrollLeft;
});

nav.addEventListener('mouseleave', () => {
    isDown = false;
    nav.style.cursor = 'grab';
});

nav.addEventListener('mouseup', () => {
    isDown = false;
    nav.style.cursor = 'grab';
});

nav.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - nav.offsetLeft;
    const walk = (x - startX) * 2;
    nav.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile
nav.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - nav.offsetLeft;
    scrollLeft = nav.scrollLeft;
});

nav.addEventListener('touchend', () => {
    isDown = false;
});

nav.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - nav.offsetLeft;
    const walk = (x - startX) * 2;
    nav.scrollLeft = scrollLeft - walk;
}); 