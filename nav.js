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
    hamburger.addEventListener('click', toggleMenu);
    navBackdrop.addEventListener('click', closeMenu);
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Improved touch handling
    let touchStartX = 0;
    let touchEndX = 0;
    
    mainNav.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    mainNav.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        // Only prevent default if we're actually scrolling horizontally
        if (Math.abs(diff) > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    mainNav.addEventListener('touchend', () => {
        touchStartX = 0;
        touchEndX = 0;
    }, { passive: true });

    window.addEventListener('resize', function() {
        if(window.innerWidth > 900) closeMenu();
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