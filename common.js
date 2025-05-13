// Common initialization and utility functions
const AppUtils = {
    // Initialize all required storage
    initializeStorage: function() {
        try {
            // Initialize users if not exists
            if (!localStorage.getItem('users')) {
                const defaultUsers = [
                    {
                        email: 'admin@example.com',
                        password: 'admin123',
                        name: 'Admin User'
                    }
                ];
                localStorage.setItem('users', JSON.stringify(defaultUsers));
            }
            
            // Initialize reset tokens if not exists
            if (!localStorage.getItem('resetTokens')) {
                localStorage.setItem('resetTokens', JSON.stringify({}));
            }
            
            // Initialize bookings if not exists
            if (!localStorage.getItem('sportBookings')) {
                localStorage.setItem('sportBookings', JSON.stringify([]));
            }
            
            // Initialize team registrations if not exists
            if (!localStorage.getItem('badmintonPlayers')) {
                localStorage.setItem('badmintonPlayers', JSON.stringify([]));
            }
            
            // Initialize teams if not exists
            if (!localStorage.getItem('badmintonTeams')) {
                localStorage.setItem('badmintonTeams', JSON.stringify([]));
            }

            // Initialize loggedInUser if not exists
            if (!localStorage.getItem("loggedInUser")) {
                localStorage.setItem("loggedInUser", "");
            }
        } catch (e) {
            console.error('Error initializing storage:', e);
            alert('There was an error initializing the application. Please check if your browser supports localStorage and try again.');
        }
    },

    // Check if user is logged in
    checkLogin: function() {
        try {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                window.location.href = 'login.html';
                return false;
            }
            return true;
        } catch (e) {
            console.error('Error checking login status:', e);
            return false;
        }
    },

    // Get current user data
    getCurrentUser: function() {
        try {
            const userData = localStorage.getItem('userData');
            return userData ? JSON.parse(userData) : null;
        } catch (e) {
            console.error('Error getting current user:', e);
            return null;
        }
    },

    // Get all users
    getUsers: function() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    },

    // Save users
    saveUsers: function(users) {
        try {
            localStorage.setItem('users', JSON.stringify(users));
            return true;
        } catch (e) {
            console.error('Error saving users:', e);
            return false;
        }
    },

    // Get all bookings
    getBookings: function() {
        try {
            return JSON.parse(localStorage.getItem('sportBookings')) || [];
        } catch (e) {
            console.error('Error getting bookings:', e);
            return [];
        }
    },

    // Save bookings
    saveBookings: function(bookings) {
        try {
            localStorage.setItem('sportBookings', JSON.stringify(bookings));
            return true;
        } catch (e) {
            console.error('Error saving bookings:', e);
            return false;
        }
    },

    // Get team registrations
    getTeamRegistrations: function() {
        try {
            return JSON.parse(localStorage.getItem('badmintonPlayers')) || [];
        } catch (e) {
            console.error('Error getting team registrations:', e);
            return [];
        }
    },

    // Save team registrations
    saveTeamRegistrations: function(registrations) {
        try {
            localStorage.setItem('badmintonPlayers', JSON.stringify(registrations));
            return true;
        } catch (e) {
            console.error('Error saving team registrations:', e);
            return false;
        }
    },

    // Get teams
    getTeams: function() {
        try {
            return JSON.parse(localStorage.getItem('badmintonTeams')) || [];
        } catch (e) {
            console.error('Error getting teams:', e);
            return [];
        }
    },

    // Save teams
    saveTeams: function(teams) {
        try {
            localStorage.setItem('badmintonTeams', JSON.stringify(teams));
            return true;
        } catch (e) {
            console.error('Error saving teams:', e);
            return false;
        }
    },

    // Logout function
    logout: function() {
        try {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('userData');
            this.showSuccess('Logged out successfully');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        } catch (e) {
            console.error('Error during logout:', e);
            alert('There was an error logging out. Please try again.');
        }
    },

    // Show error message
    showError: function(message) {
        console.error(message);
    },

    // Show success message
    showSuccess: function(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message success';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 3000);
    },

    // Clear message
    clearMessage: function() {
        const message = document.querySelector('.message');
        if (message) {
            message.remove();
        }
    },

    // Validate email format
    validateEmail: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Validate phone number format
    validatePhone: function(phone) {
        return /^\d{10}$/.test(phone);
    },

    // Format date to YYYY-MM-DD
    formatDate: function(date) {
        return date.toISOString().split('T')[0];
    },

    // Format time to HH:MM
    formatTime: function(time) {
        return time.padStart(5, '0');
    },

    // Navigation
    setActiveNavLink: function() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    },

    // Mobile navigation
    initMobileNav: function() {
        const nav = document.querySelector('.main-nav');
        if (!nav) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        // Mouse events
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

        // Touch events
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
    },

    // Check login status and handle navigation
    checkLoginStatus: function() {
        const user = localStorage.getItem("loggedInUser");
        if (!user) {
            // Don't redirect on login page
            if (!window.location.pathname.includes('login.html')) {
                alert("You are not logged in. Redirecting to login page.");
                window.location.href = "login.html";
            }
        } else {
            const logoutNav = document.getElementById("logoutNav");
            if (logoutNav) {
                logoutNav.style.display = "inline";
            }
        }
    }
};

// Initialize storage when the script loads
document.addEventListener('DOMContentLoaded', function() {
    AppUtils.initializeStorage();
    AppUtils.checkLoginStatus();
    AppUtils.setActiveNavLink();
    AppUtils.initMobileNav();
}); 