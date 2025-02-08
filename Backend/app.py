from flask import Flask, request, jsonify, make_response
from jwt_utils import generate_jwt, verify_jwt
from supabase_utils import create_user, get_user_by_email
from supabase import create_client, Client
import bcrypt
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
load_dotenv()
import os
# --- Supabase Setup ---
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)
# Create a Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Signup route
@app.route('/auth/signup', methods=['POST'])
def signup():
    data = request.json
    full_name = data.get('fullName')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    if not full_name or not email or not password or not confirm_password:
        return jsonify({"error": "All fields are required"}), 401

    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 402

    # Create user in Supabase
    success, message = create_user(full_name, email, password)
    if not success:
        return jsonify({"error": f"Error with Supabase: {message}"}), 403

    return jsonify({"message": "User signed up successfully"}), 201

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Fetch user from Supabase
    user = get_user_by_email(email)
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"error": "Invalid credentials"}), 401

    # Generate JWT token
    token = generate_jwt({"email": email, "fullName": user['full_name']})
    response = make_response(jsonify({"message": "Login successful"}))
    response.set_cookie(
        "authToken",
        token,
        httponly=True,
        samesite='None',  
        secure=True      
    )

    return response

@app.route('/auth/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Logged out successfully"})
    response.set_cookie('authToken', '', expires=0, httponly=True, secure=True, samesite='None')  # Clear the cookie
    return response

# Protected route
@app.route('/auth/protected', methods=['GET'])
def protected():
    token = request.cookies.get('authToken')
    if not token:
        return jsonify({"error": "Authentication required"}), 401

    try:
        payload = verify_jwt(token)
        return jsonify({"message": "Access granted", "user": payload}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401

# New /auth/me route to get user data
@app.route('/auth/me', methods=['GET'])
def get_user_info():
    token = request.cookies.get('authToken')  # This gets the HttpOnly cookie
    if not token:
        return jsonify({"error": "Authentication required"}), 401

    try:
        # Verify JWT and extract the payload
        payload = verify_jwt(token)
        user_email = payload.get('email')
        if not user_email:
            return jsonify({"error": "Invalid token"}), 401

        # Fetch user from Supabase using email
        user = get_user_by_email(user_email)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Return user details (excluding password)
        user_data = {
            "fullName": user['full_name'],
            "email": user['email'],
        }
        return jsonify(user_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 401

# --- Route to Fetch News for a Specific Category ---
@app.route('/news/<category>', methods=['GET'])
def get_news(category):
    if category not in ["top_stories", "india", "sports", "tech", "education"]:
        return jsonify({"error": "Invalid category"}), 400

    try:
        response = supabase.table(category).select("*").order("created_at", desc=True).execute()
        if response.data:
            return jsonify(response.data), 200
        else:
            return jsonify({"message": "No news available"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/upload/image', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"}), 400

        image_file = request.files['image']
        upload_result = cloudinary.uploader.upload(image_file)

        return jsonify({
            "message": "Image uploaded successfully",
            "url": upload_result.get('url')
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(
        debug=True,
        ssl_context=('localhost.pem', 'localhost-key.pem')
    )
