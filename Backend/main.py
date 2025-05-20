from flask import Flask
from flask_cors import CORS
from mongoengine import connect
from controller import controller_bp 
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

dotenv_path = os.path.join(os.path.dirname(__file__), '../Frontend/.env')
load_dotenv(dotenv_path)

mongo_uri = os.getenv("MONGODB_URI")
print("MONGO URI:", mongo_uri)

connect(
    host=mongo_uri
)

app.register_blueprint(controller_bp)



if __name__ == "__main__":
    app.run(debug=True)