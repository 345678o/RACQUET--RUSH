// Common navigation functionality
function checkLogin() {
    let user = localStorage.getItem("loggedInUser");
    if (!user) {
        alert("You are not logged in. Redirecting to login page.");
        window.location.href = "login.html";
    } else {
        document.getElementById("logoutNav").style.display = "inline";
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("You have successfully logged out.");
    window.location.href = "login.html";
}

function toggleMenu(e) {
    e.stopPropagation();
    document.getElementById('mainNav').classList.toggle('active');
    document.getElementById('nav-backdrop').classList.toggle('active');
}

function closeMenu() {
    document.getElementById('mainNav').classList.remove('active');
    document.getElementById('nav-backdrop').classList.remove('active');
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Add click event listeners to close menu
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if(window.innerWidth > 900) closeMenu();
    });

    // Close menu on scroll
    window.addEventListener('scroll', closeMenu);

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
}); 