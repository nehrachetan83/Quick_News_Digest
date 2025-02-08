import jwt
import datetime
from dotenv import load_dotenv
load_dotenv()
import os
SECRET_KEY = os.getenv("SECRET_KEY")

# Generate a JWT
def generate_jwt(payload):
    payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(hours=1) 
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

# Verify a JWT
def verify_jwt(token):
    return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
