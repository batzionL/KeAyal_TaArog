from flask import Flask, jsonify, request
from pymongo import MongoClient
from mongoengine import connect
from models.patient import Patient
from models.treatment import Treatment
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# client = MongoClient("mongodb://localhost:27017/")
# db = client["KeAyaal_TaArog"]
# collection = db["mycollection"]

connect(db="KeAyaal_TaArog", host="localhost", port=27017)

#Add new patient
@app.route("/add_patient", methods=["POST"])
def add_patient():
    data = request.json  # קבלת הנתונים מה-Frontend
    try:
        # יצירת אובייקט פציינט ושמירתו ב-DB
        new_patient = Patient(
            firstName=data["firstName"],
            lastName=data["lastName"],
            patientId=data["patientId"],
            email=data["email"],
            password=data["password"],
            phone=data["phone"]
        )
        new_patient.save()
        return jsonify({"message": "Patient added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


#Add new treatment
@app.route("/add_treatment", methods=["POST"])
def add_treatment():
    data = request.json

    try:
        patient_id = data.get("patient_id")
        patient = Patient.objects(patientId=patient_id).first()
        
        if not patient:
            return jsonify({"error": "Patient not found"}), 404

        new_treatment = Treatment(
            treatment_date=data["treatment_date"],
            age=data["age"],
            firstName=data["firstName"],
            motherName=data["motherName"],
            problem=data["problem"],
            TherapeuticProcess=data["TherapeuticProcess"],
            homeWork=data["homeWork"],
            patient=patient
        )
        new_treatment.save()

        patient.treatment_ids.append(str(new_treatment.id))
        patient.save()

        return jsonify({"message": "Treatment added successfully!", "treatment_id": str(new_treatment.id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# @app.route("/get_patient/<patient_id>", methods=["GET"])
# def get_patient(patient_id):
    # try:
        # Fetch patient by ID
        # patient = Patient.objects(id=patient_id).first()  # Assuming `id` is the unique identifier
        # print(f"Fetched Patient: {patient}")
        # if patient:
            # return jsonify({
                # "firstName": patient.firstName,
                # "lastName": patient.lastName,
                # "patientId": patient.patientId,
                # "email": patient.email,
                # "phone": patient.phone,
                # "treatment_ids": patient.treatment_ids
            # }), 200
        # else:
            # return jsonify({"error": "Patient not found"}), 404
    # except Exception as e:
        # return jsonify({"error": str(e)}), 400
 
 
@app.route("/get_patient", methods=["POST"])
def validate_patient():
    try:
        # קבלת הנתונים מהבקשה
        data = request.json
        patient_id = data.get("patientId")
        password = data.get("password")
        
        # בדיקה אם המטופל קיים
        patient = Patient.objects(patientId=patient_id, password=password).first()
        if patient:
            return jsonify({"message": "Patient exists"}), 200
        else:
            return jsonify({"error": "Patient not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

 
 
 
 
 
 

# patient = Patient(name="John Doe", age=30, address="123 Main St", phone="123-456-7890")
# patient.save()

# @app.route("/add", methods=["POST"])
# def add_data():
# data = request.json
# collection.insert_one(data)
# return jsonify({"message": "Data added successfully"}), 201


# @app.route('/get', methods=['GET'])
# def get_data():
# data = collection.find()  # מקבל את כל הנתונים מהאוסף
# data_list = []
# for item in data:
# item['_id'] = str(item['_id'])  # MongoDB מוסיף _id אוטומטית, להמיר אותו למחרוזת
# data_list.append(item)
# return jsonify(data_list)
# @app.route('/')
# def hello():
# return "Hello from Python backend!"

if __name__ == "__main__":
    app.run(debug=True)
