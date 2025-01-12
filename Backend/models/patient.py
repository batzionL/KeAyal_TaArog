from mongoengine import Document, StringField, IntField, ListField

class Patient(Document):
    firstName = StringField(required=True)
    lastName = StringField(required=True)
    patientId = IntField(required=True)
    email = StringField()
    password = StringField(required=True)
    phone = StringField(required=True)
    treatment_ids = ListField(StringField()) 
