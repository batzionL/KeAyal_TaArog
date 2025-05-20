from mongoengine import Document, StringField, IntField, ListField, DateField

class Patient(Document):
    firstName = StringField(required=True)
    lastName = StringField(required=True)
    dateOfBirth = DateField(required=True)
    motherName = StringField(required=True)
    patientId = IntField(required=True)
    email = StringField()
    password = StringField(required=True)
    phone = StringField(required=True)
    treatment_ids = ListField(StringField()) 
