const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-sports-hub';

async function testConnection() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('Successfully connected to MongoDB!');
        
        // List all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\nCollections in database:');
        collections.forEach(collection => {
            console.log(`- ${collection.name}`);
        });
        
        // Close the connection
        await mongoose.connection.close();
        console.log('\nConnection closed.');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

testConnection(); 