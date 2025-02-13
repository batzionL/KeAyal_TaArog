from mongoengine import Document, StringField, IntField

class Event(Document):
    eventDate = StringField(required=True)
    eventTime = StringField(required=True)
    freeOrBusy = StringField(required=True)
    patientId = IntField(required=True)