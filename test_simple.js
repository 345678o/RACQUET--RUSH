const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Test MongoDB connection
async function testMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully');
        
        // Test User model
        const User = require('./src/models/User');
        console.log('✅ User model loaded successfully');
        
        // Test Facility model
        const SportFacility = require('./src/models/SportFacility');
        console.log('✅ SportFacility model loaded successfully');
        
        // Test Booking model
        const Booking = require('./src/models/Booking');
        console.log('✅ Booking model loaded successfully');
        
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// Test Express setup
function testExpress() {
    try {
        app.use(express.json());
        console.log('✅ Express JSON middleware loaded');
        
        // Test routes
        const authRoutes = require('./src/routes/auth');
        console.log('✅ Auth routes loaded');
        
        const facilityRoutes = require('./src/routes/facilities');
        console.log('✅ Facility routes loaded');
        
        const bookingRoutes = require('./src/routes/bookings');
        console.log('✅ Booking routes loaded');
        
        console.log('✅ All routes loaded successfully');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// Run tests
async function runTests() {
    console.log('Starting backend tests...\n');
    
    console.log('Testing MongoDB connection and models:');
    await testMongoDB();
    
    console.log('\nTesting Express setup and routes:');
    testExpress();
    
    console.log('\nAll tests completed!');
}

runTests(); 