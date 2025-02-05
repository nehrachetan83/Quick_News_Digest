import bcrypt
from supabase import create_client

# Set your Supabase credentials
SUPABASE_URL = "https://bajhhvpalxxwahactfjk.supabase.co"  # Replace with your Supabase project URL
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhamhodnBhbHh4d2FoYWN0ZmprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDI5NTczMywiZXhwIjoyMDQ5ODcxNzMzfQ.VNrL_c90uDa09vE6zKkmBbwFpTNH2VJoOwIOUoj_g6Q"  # Replace with your Service Role Key

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Hash the password before storing it
def hash_password(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

# Create a new user in the database
def create_user(full_name, email, password):
    try:
        # Hash the password before inserting into the database
        hashed_password = hash_password(password)
        
        # Insert user into Supabase
        response = supabase.table("users").insert({
            "full_name": full_name, 
            "email": email, 
            "password": hashed_password
        }).execute()
        
        # Check if the insertion was successful
        if response.data:
            return True, "User created successfully"
        else:
            return False, response.error_message or 'Error creating user'
    
    except Exception as e:
        return False, str(e)

# Get a user by email
def get_user_by_email(email):
    try:
        response = supabase.table("users").select("*").eq("email", email).execute()
        
        if response.data:
            return response.data[0]
        return None
    
    except Exception as e:
        return None

# Verify if the provided password matches the stored password
def verify_password(stored_password, provided_password):
    return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password.encode('utf-8'))
