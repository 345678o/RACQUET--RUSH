// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Load navigation HTML
        fetch('nav.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('nav-placeholder').innerHTML = data;
                
                // Get elements after nav is loaded
                const hamburger = document.getElementById('hamburger');
                const mainNav = document.getElementById('mainNav');
                const backdrop = document.getElementById('nav-backdrop');
                
                if (hamburger && mainNav && backdrop) {
                    // Toggle menu on hamburger click
                    hamburger.addEventListener('click', function(e) {
                        e.stopPropagation();
                        hamburger.classList.toggle('active');
                        mainNav.classList.toggle('active');
                        backdrop.classList.toggle('active');
                    });
                    
                    // Close menu on backdrop click
                    backdrop.addEventListener('click', function() {
                        hamburger.classList.remove('active');
                        mainNav.classList.remove('active');
                        backdrop.classList.remove('active');
                    });
                    
                    // Close menu on nav link click
                    mainNav.querySelectorAll('a').forEach(link => {
                        link.addEventListener('click', function() {
                            hamburger.classList.remove('active');
                            mainNav.classList.remove('active');
                            backdrop.classList.remove('active');
                        });
                    });
                    
                    // Close menu on window resize
                    window.addEventListener('resize', function() {
                        if (window.innerWidth > 900) {
                            hamburger.classList.remove('active');
                            mainNav.classList.remove('active');
                            backdrop.classList.remove('active');
                        }
                    });

                    // Close menu on scroll
                    window.addEventListener('scroll', function() {
                        hamburger.classList.remove('active');
                        mainNav.classList.remove('active');
                        backdrop.classList.remove('active');
                    });

                    // Add smooth scrolling to navigation
                    let isDown = false;
                    let startX;
                    let scrollLeft;

                    mainNav.addEventListener('mousedown', (e) => {
                        isDown = true;
                        mainNav.style.cursor = 'grabbing';
                        startX = e.pageX - mainNav.offsetLeft;
                        scrollLeft = mainNav.scrollLeft;
                    });

                    mainNav.addEventListener('mouseleave', () => {
                        isDown = false;
                        mainNav.style.cursor = 'grab';
                    });

                    mainNav.addEventListener('mouseup', () => {
                        isDown = false;
                        mainNav.style.cursor = 'grab';
                    });

                    mainNav.addEventListener('mousemove', (e) => {
                        if (!isDown) return;
                        e.preventDefault();
                        const x = e.pageX - mainNav.offsetLeft;
                        const walk = (x - startX) * 2;
                        mainNav.scrollLeft = scrollLeft - walk;
                    });

                    // Touch events for mobile
                    mainNav.addEventListener('touchstart', (e) => {
                        isDown = true;
                        startX = e.touches[0].pageX - mainNav.offsetLeft;
                        scrollLeft = mainNav.scrollLeft;
                    });

                    mainNav.addEventListener('touchend', () => {
                        isDown = false;
                    });

                    mainNav.addEventListener('touchmove', (e) => {
                        if (!isDown) return;
                        e.preventDefault();
                        const x = e.touches[0].pageX - mainNav.offsetLeft;
                        const walk = (x - startX) * 2;
                        mainNav.scrollLeft = scrollLeft - walk;
                    });
                }

                // Set active link based on current page
                const currentPage = window.location.pathname.split('/').pop();
                const navLinks = document.querySelectorAll('.main-nav a');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Check login status
                checkLoginStatus();
            })
            .catch(error => console.error('Error loading navigation:', error));
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