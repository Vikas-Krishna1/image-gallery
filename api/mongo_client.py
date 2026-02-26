import os
from pymongo import MongoClient
##Load MONGO URI-Database from MONGO Atlas
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
##IF errors in setting
    raise RuntimeError("MONGO_URI environment variable is not set")

mongo_client = MongoClient(MONGO_URI) ##Connect to the database