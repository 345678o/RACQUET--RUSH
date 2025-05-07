zzzzzz// Navigation functionality
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