from mongoengine import Document, StringField, DateTimeField, IntField, ReferenceField
from datetime import datetime

class Treatment(Document):
    patientId = IntField(required=True)
    treatment_date = DateTimeField(default=datetime.utcnow)
    problem = StringField(required=True)
    TherapeuticProcess = StringField()
    homeWork = StringField()
    patient = ReferenceField('Patient')