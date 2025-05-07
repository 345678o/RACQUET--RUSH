const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api';

async function testEndpoints() {
    try {
        console.log('Testing API endpoints...\n');

        // 1. Test User Registration
        console.log('1. Testing User Registration...');
        const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('Registration successful:', registerResponse.data);
        const token = registerResponse.data.token;

        // 2. Test User Login
        console.log('\n2. Testing User Login...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('Login successful:', loginResponse.data);

        // 3. Test Get Current User
        console.log('\n3. Testing Get Current User...');
        const userResponse = await axios.get(`${BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Current user:', userResponse.data);

        // 4. Test Create Facility
        console.log('\n4. Testing Create Facility...');
        const facilityResponse = await axios.post(`${BASE_URL}/facilities`, {
            name: 'Basketball Court',
            sportType: 'basketball',
            description: 'Standard basketball court',
            capacity: 20,
            location: 'Main Campus',
            bookingPrice: 50,
            operatingHours: {
                start: '08:00',
                end: '22:00'
            }
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Facility created:', facilityResponse.data);
        const facilityId = facilityResponse.data._id;

        // 5. Test Create Booking
        console.log('\n5. Testing Create Booking...');
        const bookingResponse = await axios.post(`${BASE_URL}/bookings`, {
            facility: facilityId,
            date: '2024-05-10',
            startTime: '10:00',
            endTime: '12:00',
            participants: 4
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Booking created:', bookingResponse.data);

    } catch (error) {
        console.error('Error testing API:', error.response?.data || error.message);
    }
}

testEndpoints(); 