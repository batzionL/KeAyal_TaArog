from flask import Blueprint, request, jsonify
# from main import app
from service import add_patient_to_db, add_treatment_to_db, add_event_to_db, get_patient_from_db, get_patient_by_id_from_db, get_owner_from_db, get_patient_treatments_from_db, get_all_events_from_db, get_all_patients_from_db, update_event_in_db
  

controller_bp = Blueprint("controller", __name__)
  
@controller_bp.route("/add_patient", methods=["POST"])
def add_patient():
    try:
        data = request.json
        answer = add_patient_to_db(data)
        if answer:
            return jsonify({"message": "atient added successfully!"}), 200
        else:
            return jsonify({"message": "Could not add this patient"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@controller_bp.route("/add_treatment", methods=["POST"])
def add_treatment():
    try:
        data = request.json
        answer = add_treatment_to_db(data)
        if "error" in answer:
            if answer["error"] == "Patient not found":
                return jsonify({"error": answer["error"]}), 404
            elif answer["error"] == "Invalid date format":
                return jsonify({"error": answer["error"]}), 400
            else:
                return jsonify({"error": answer["error"]}), 500
        return jsonify({"message": "Treatment added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@controller_bp.route("/add_event", methods=["POST"])
def add_event():
    try:
        data = request.json
        answer = add_event_to_db(data)
        if answer:
            return jsonify({"message": "Event was added successfully!"}), 201
        else:
            return jsonify({"message": "Could not add this event!"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@controller_bp.route("/get_patient", methods=["POST"])
def validate_patient():
    try:
        data = request.json
        patient_id = data.get("patientId")
        password = data.get("password")
        answer = get_patient_from_db(patient_id, password)
        if answer:
            return jsonify({"firstName": answer.firstName}), 201
        else:
            return jsonify({"error": "Patient not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@controller_bp.route("/get_patient_id", methods=["POST"])
def get_patient():
  try:
      data = request.json
      patient_id = data.get("id")
      answer = get_patient_by_id_from_db(patient_id)
      if answer:
          return jsonify({"firstName": answer.firstName}), 201
      else:
          return jsonify({"error": "Patient not found"}), 404
  except Exception as e:
      return jsonify({"error": str(e)}), 500
  
  
@controller_bp.route("/get_owner", methods=["POST"])
def get_owner():
    try:
        data = request.json
        patient_id = data.get("patientId")
        answer = get_owner_from_db(patient_id)
        if answer:
            return jsonify({"message": "Owner found successfully"}), 201
        else:
            return jsonify({"error": "Owner not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@controller_bp.route("/get_patient_details", methods=["POST"])
def get_patient_details():
    try:
        data = request.json
        patient_id = data.get("patientId")
        answer = get_patient_by_id_from_db(patient_id)
        if answer:
            return jsonify({"firstName": answer.firstName, "motherName": answer.motherName, "age":answer.dateOfBirth}), 201
        else:
            return jsonify({"error": "Patient not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    

@controller_bp.route("/get_patient_treatments", methods=["POST"])
def get_patient_treatments():
    try:
        data = request.json
        id = data.get("id")
        answer = get_patient_treatments_from_db(id)
        if answer:
            treatments_list = [
                {
                    "treatment_date": treatment.treatment_date,
                    "problem": treatment.problem,
                    "TherapeuticProcess": treatment.TherapeuticProcess,
                    "homeWork": treatment.homeWork,
                }
                for treatment in answer
            ]
            return jsonify(treatments_list), 200
        else:
            return jsonify({"error": "Treatment not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@controller_bp.route("/get_all_events", methods=["GET"])
def get_all_events():
    try:
        events = get_all_events_from_db()
        if events:
            patient_ids = {event.patientId for event in events}
            patient_names = get_fName_and_lName_by_id(patient_ids)
            
            events_list = [
                {
                    "eventDate": event.eventDate,
                    "eventTime": event.eventTime,
                    "freeOrBusy": event.freeOrBusy,
                    "fullName": f"{patient_names.get(str(event.patientId), {}).get('firstName', '')} {patient_names.get(str(event.patientId), {}).get('lastName', '')}".strip()
                }
                for event in events
            ]
            return jsonify(events_list), 201
        else:
            return jsonify({"error": "Events not found"}), 404
    except Exception as e:
        return jsonify({"Error: ": str(e)}), 500


def get_fName_and_lName_by_id(patient_ids):
    try:
        all_patients = get_all_patients_from_db()
        patients_dicts = [patient.to_mongo().to_dict() for patient in all_patients]

        patient_ids = {str(pid) for pid in patient_ids}

        patients_data = {}

        for patient in patients_dicts:
            patient_id_str = str(patient.get("patientId", ""))

            if patient_id_str in patient_ids:
                patients_data[patient_id_str] = {
                    "firstName": patient["firstName"],
                    "lastName": patient["lastName"]
                }
            else:
                print(f"Skipping {patient_id_str}, not in {patient_ids}")
        return patients_data
    except Exception as e:
        print(f"Error fetching patient names: {e}")
        return {}



@controller_bp.route("/update_event", methods=["PUT"])
def update_event():
    try:
        data = request.json
        eventDate = data.get("eventDate")
        eventTime = data.get("eventTime")
        freeOrBusy = data.get("freeOrBusy")
        patientId = data.get("id")
        
        if not all([eventDate, eventTime, freeOrBusy, patientId]):
            return jsonify({"error": "Missing required fields"}), 400
        answer = update_event_in_db(eventDate=eventDate, eventTime=eventTime)
        if not answer:
            return jsonify({"error": "Event not found"}), 404
        answer.update(
            set__freeOrBusy=freeOrBusy,
            set__patientId=patientId
        )
        return jsonify({"message": "Event updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
