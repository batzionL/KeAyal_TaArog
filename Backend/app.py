from flask import Flask, jsonify, request
from pymongo import MongoClient
from mongoengine import connect
from datetime import datetime
from models.patient import Patient
from models.treatment import Treatment
from models.owner import Owner
from models.event import Event
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
            phone=data["phone"],
            motherName=data["motherName"],
            dateOfBirth=data["dateOfBirth"]
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
        patient_id = data.get("patientId")
        patient = Patient.objects(patientId=patient_id).first()
        # print(f"Received patientId: {data}")
        # print(f"Received patient: {data}")
        if not patient:
            return jsonify({"error": "Patient not found"}), 404
        
        try:
            treatment_date = datetime.fromisoformat(data["treatment_date"].replace("Z", "+00:00"))
        except ValueError:
            return jsonify({"error": "Invalid date format"}), 400

        new_treatment = Treatment(
            patientId=data["patientId"],
            treatment_date=treatment_date,
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
    
 
#Add event
@app.route("/add_event", methods=["POST"])
def add_event_to_calander():
    data = request.json
    print(f"Received event: {data}")
    try:
        new_event = Event(
            eventDate=data["newDate"],
            eventTime=data["newTime"],
            freeOrBusy=data["freeOrBusy"]
        )
        new_event.save()
        return jsonify({"message": "Event was added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
 
 
 
#  Get patient
@app.route("/get_patient", methods=["POST"])
def validate_patient():
    try:
        data = request.json
        patient_id = data.get("patientId")
        password = data.get("password")
        
        patient = Patient.objects(patientId=patient_id, password=password).first()
        if patient:
            return jsonify({"firstName": patient.firstName}), 200
        else:
            return jsonify({"error": "Patient not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


#get owner
@app.route("/get_owner", methods=["POST"])
def get_owner():
    try:
        data = request.json
        patient_id = data.get("patientId")
        
        owner = Owner.objects(ownerId=int(patient_id)).first()
        if owner:
            return jsonify({"message": "owner found successfully"}), 200
        else:
            return jsonify({"error": "Owner not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    

@app.route("/get_patient_details", methods=["POST"])
def get_patient_details():
    try:
        data = request.json
        patient_id = data.get("patientId")
        
        patient = Patient.objects(patientId=patient_id).first()
        if patient:
            return jsonify({"firstName": patient.firstName, "motherName": patient.motherName, "age":patient.dateOfBirth}), 200
        else:
            return jsonify({"error": "Patient not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    
        
@app.route("/get_patient_treatments", methods=["POST"])
def get_patient_treatments():
    try:
        data = request.json
        id = data.get("id")
        
        treatments = Treatment.objects(patientId=id)

        if treatments:
            treatments_list = [
                {
                    "treatment_date": treatment.treatment_date,
                    "problem": treatment.problem,
                    "TherapeuticProcess": treatment.TherapeuticProcess,
                    "homeWork": treatment.homeWork,
                }
                for treatment in treatments
            ]
            return jsonify(treatments_list), 200
        else:
            return jsonify({"error": "Treatment not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/get_all_events", methods=["GET"])
def get_all_events():
    try:
        events = Event.objects()
        if events:
            events_list = [
                {
                    "eventDate": event.eventDate,
                    "eventTime": event.eventTime,
                    "freeOrBusy": event.freeOrBusy
                }
                for event in events
            ]
            return jsonify(events_list), 201
        else:
            return jsonify({"error": "Events not found"}), 404
    except Exception as e:
        return jsonify({"Error: ": str(e)}), 400
    
    
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

    
 #Gat all treatments of patient
# @app.route("/get_all_treatments", methods=["POST"])
# def get_all_treatments():
    # try:
        # data = request.json
        # patient_id = data.get("patientId")
        # password = data.get("password")
        
        # patient = Patient.objects(patientId=patient_id, password=password).first()
        # if patient:
            # return jsonify({"firstName": patient.firstName, "patientId": patient.patientId}), 200
        # else:
            # return jsonify({"error": "Patient not found"}), 404
    # except Exception as e:
        # return jsonify({"error": str(e)}), 400
    


# @app.route("/add", methods=["POST"])
# def add_data():
# data = request.json
# collection.insert_one(data)
# return jsonify({"message": "Data added successfully"}), 201



if __name__ == "__main__":
    app.run(debug=True)
