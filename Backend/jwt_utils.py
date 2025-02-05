import jwt
import datetime

SECRET_KEY = "your_secret_key_here"  # Replace with a secure key

# Generate a JWT
def generate_jwt(payload):
    payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

# Verify a JWT
def verify_jwt(token):
    return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
