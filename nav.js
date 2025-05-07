// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mainNav = document.getElementById('mainNav');
    const navBackdrop = document.getElementById('nav-backdrop');

    function toggleMenu(e) {
        e.stopPropagation();
        mainNav.classList.toggle('active');
        navBackdrop.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    function closeMenu() {
        mainNav.classList.remove('active');
        navBackdrop.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Event listeners
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMenu);
    }
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Improved touch handling for horizontal scrolling
    let touchStartX = 0;
    let touchEndX = 0;
    let isScrolling = false;
    
    mainNav.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isScrolling = false;
    }, { passive: true });
    
    mainNav.addEventListener('touchmove', (e) => {
        if (isScrolling) return;
        
        touchEndX = e.touches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        // Only prevent default if we're actually scrolling horizontally
        if (Math.abs(diff) > 5) {
            isScrolling = true;
            e.preventDefault();
        }
    }, { passive: false });
    
    mainNav.addEventListener('touchend', () => {
        touchStartX = 0;
        touchEndX = 0;
        isScrolling = false;
    }, { passive: true });

    // Add padding to body to account for fixed navigation
    const navHeight = document.querySelector('nav').offsetHeight;
    document.body.style.paddingTop = navHeight + 'px';

    window.addEventListener('resize', function() {
        if(window.innerWidth > 900) {
            closeMenu();
        }
        // Update body padding when window is resized
        const navHeight = document.querySelector('nav').offsetHeight;
        document.body.style.paddingTop = navHeight + 'px';
    });

    window.addEventListener('scroll', closeMenu);
});

// Login check
function checkLogin() {
    let user = localStorage.getItem("loggedInUser");
    if (!user) {
        alert("You are not logged in. Redirecting to login page.");
        window.location.href = "login.html";
    } else {
        document.getElementById("logoutNav").style.display = "inline";
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have successfully logged out.");
    window.location.href = "login.html";
} 