from flask import Flask
from flask_cors import CORS
from mongoengine import connect
from controller import controller_bp 


app = Flask(__name__)
CORS(app)

connect(db="KeAyaal_TaArog", host="localhost", port=27017)
app.register_blueprint(controller_bp)


if __name__ == "__main__":
    app.run(debug=True)