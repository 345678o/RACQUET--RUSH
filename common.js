// Common initialization and utility functions
const AppUtils = {
    // Initialize all required storage
    initializeStorage: function() {
        try {
            // Initialize users if not exists
            if (!localStorage.getItem('users')) {
                localStorage.setItem('users', JSON.stringify({}));
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
        try {
            return JSON.parse(localStorage.getItem('users')) || {};
        } catch (e) {
            console.error('Error getting users:', e);
            return {};
        }
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
            window.location.href = 'login.html';
        } catch (e) {
            console.error('Error during logout:', e);
            alert('There was an error logging out. Please try again.');
        }
    },

    // Show error message
    showError: function(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
        }
    },

    // Show success message
    showSuccess: function(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
        }
    },

    // Clear message
    clearMessage: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    },

    // Validate email format
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone number format
    validatePhone: function(phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    },

    // Format date to YYYY-MM-DD
    formatDate: function(date) {
        return date.toISOString().split('T')[0];
    },

    // Format time to HH:MM
    formatTime: function(time) {
        return time.padStart(5, '0');
    }
};

// Initialize storage when the script loads
document.addEventListener('DOMContentLoaded', function() {
    AppUtils.initializeStorage();
}); 