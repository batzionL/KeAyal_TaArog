from datetime import datetime
from models.patient import Patient
from models.treatment import Treatment
from models.owner import Owner
from models.event import Event


# 
def add_patient_to_db(data):
    try:
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
        return new_patient
    except Exception as e:
        raise Exception(f"Error fetching patient: {str(e)}")
    

# 
def add_treatment_to_db(data):
    try:
        patient_id = data.get("patientId")
        patient = Patient.objects(patientId=patient_id).first()
        if not patient:
            return {"error": "Patient not found"}
        try:
            treatment_date = datetime.fromisoformat(data["treatment_date"].replace("Z", "+00:00"))
        except ValueError:
            return {"error": "Invalid date format"}
        
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

        return new_treatment
    except Exception as e:
        return {"Error fetching treatment": str(e)}

# 
def add_event_to_db(data):
    try:
        new_event = Event(
            eventDate=data["newDate"],
            eventTime=data["newTime"],
            freeOrBusy=data["freeOrBusy"],
            patientId="0"
        )
        new_event.save()
        return new_event
    except Exception as e:
        return {"Error fetching event": str(e)}

# 
def get_patient_from_db(patient_id, password):
    # print(f"Fetching patient with ID: {patient_id} and Password: {password}")
    try:
        patient = Patient.objects(patientId=patient_id, password=password).first()
        # print(patient)
        return patient
    except Exception as e:
        return {"Error fetching patient": str(e)}


def get_patient_by_id_from_db(patient_id):
    try:
        patient = Patient.objects(patientId=patient_id).first()
        return patient
    except Exception as e:
        return {"Error fetching patient": str(e)}


def get_owner_from_db(id):
    try:
        owner = Owner.objects(ownerId=int(id)).first()
        return owner
    except Exception as e:
        return {"Error fetching owner": str(e)}


def get_patient_treatments_from_db(id):
    try:
        treatments = Treatment.objects(patientId=id)
        return treatments
    except Exception as e:
        return {"Error fetching treatments": str(e)}
    

def get_all_events_from_db():
    try:
        events = Event.objects()
        return events
    except Exception as e:
        return {"Error fetching events": str(e)}
        

def update_event_in_db(eventDate, eventTime):
    try:
        event = Event.objects(eventDate=eventDate, eventTime=eventTime).first()
        return event
    except Exception as e:
        return {"Error update event": str(e)}
        