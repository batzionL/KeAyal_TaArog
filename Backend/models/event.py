from mongoengine import Document, StringField, DateField

class Event(Document):
    eventDate = DateField(required=True)
    eventTime = StringField(required=True)
    freeOrBusy = StringField(required=True)
