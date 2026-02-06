from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

# Mongo setup
gallery = mongo_client["gallery"]
images_collection = gallery.images
users_collection = gallery.users

# Load env variables
load_dotenv()

ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")
if not ACCESS_KEY:
    raise RuntimeError("UNSPLASH_ACCESS_KEY is not set!")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"

app = Flask(__name__)

CORS(app)
  # Only allow your frontend

# ----------------------
# Routes
# ----------------------
@app.route("/new-image", methods=["GET"])
def new_image():
    word = request.args.get("query")
    headers = {
        "Accept-Version": "v1",
        "Authorization": f"Client-ID {ACCESS_KEY}"
    }
    params = {"query": word}
    response = requests.get(UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    
    if "errors" in data:
        return jsonify(data), 400

    return jsonify(data)

@app.route("/images", methods=["POST", "GET"])
def images():
    if request.method == "GET":
        images = images_collection.find()
        return jsonify([img for img in images])

    if request.method == "POST":
        image = request.get_json()
        if "id" in image:
            image["_id"] = image["id"]
        result = images_collection.insert_one(image)
        return jsonify({"inserted_id": str(result.inserted_id)})
    
@app.route("/images/<id>", methods=["DELETE"])
def delete_image(id):
    if request.method == "DELETE":
        result = images_collection.delete_one({"_id": id})
        if not result:
            return {"error": "Image not found"}, 404
        if result and not result.deleted_count:
            return {"error": "Image not found"}, 404
        return {"deleted_id": id}





# ----------------------
# Run server
# ----------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
