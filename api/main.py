# ----------------------
# Imports
from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS
from mongo_client import mongo_client

# Mongo setup
gallery = mongo_client["gallery"]
images_collection = gallery.images
users_collection = gallery.users


## loads the ACCESS KEY for the Unsplash API 
# from the environment variable
ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")
if not ACCESS_KEY:
    raise RuntimeError("UNSPLASH_ACCESS_KEY is not set!") ##Error Handles

UNSPLASH_URL = "https://api.unsplash.com/photos/random"

app = Flask(__name__)
##ENABLES CORS for the Flask application,
#  allowing cross-origin requests from the frontend to the backend.
#From the website 
CORS(app)
  

# ----------------------
# Routes
# ----------------------

# Get a new image from Unsplash based on a query
@app.route("/new-image", methods=["GET"])
def new_image():
    word = request.args.get("query") #Sets the word to search for in the query parameters
    headers = {
        "Accept-Version": "v1",
        "Authorization": f"Client-ID {ACCESS_KEY}" #Sets the headers for the request to the Unsplash API, including the access key for authentication
    }
    params = {"query": word}
    response = requests.get(UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    #Error Handles
    if "errors" in data:
        return jsonify(data), 400

    return jsonify(data)
# Get all images from the database or add a new image to the database based on User
@app.route("/images", methods=["POST", "GET"])
def images():
    if request.method == "GET":
        images = images_collection.find()#Finds all the images in the images collection of the MongoDB database and returns them as a JSON response.
        return jsonify([img for img in images])

    if request.method == "POST":#Sest the request to a POST to the Database
        image = request.get_json()
        if "id" in image:
            image["_id"] = image["id"]
        result = images_collection.insert_one(image)
        return jsonify({"inserted_id": str(result.inserted_id)})#Returns the id of the image that was inserted

# Delete an image from the database based on its id    
@app.route("/images/<id>", methods=["DELETE"])
def delete_image(id):
    if request.method == "DELETE":
        result = images_collection.delete_one({"_id": id})#Deletes the image from the database
        if not result:
            #Error Handles for if the image is not found in the database
            return {"error": "Image not found"}, 404
        if result and not result.deleted_count:
            return {"error": "Image not found"}, 404
        return {"deleted_id": id}





# ----------------------
# Run server
# ----------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=False)
