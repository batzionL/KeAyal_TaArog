from mongoengine import Document, StringField, DateTimeField, IntField, ReferenceField
from datetime import datetime

class Treatment(Document):
    treatment_date = DateTimeField(default=datetime.utcnow)
    age = IntField()
    firstName = StringField(required=True)
    motherName = StringField(required=True)
    problem = StringField(required=True)
    TherapeuticProcess = StringField()
    homeWork = StringField()
    patient = ReferenceField('Patient')