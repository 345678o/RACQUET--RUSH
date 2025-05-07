from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection string
mongo_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/college-sports-hub')

try:
    # Create a MongoDB client
    client = MongoClient(mongo_uri)
    
    # Test the connection
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
    
    # Get the database
    db = client['college-sports-hub']
    
    # List all collections
    collections = db.list_collection_names()
    print("\nCollections in database:")
    for collection in collections:
        print(f"- {collection}")
    
    # Close the connection
    client.close()
    
except Exception as e:
    print(f"Error connecting to MongoDB: {e}") 