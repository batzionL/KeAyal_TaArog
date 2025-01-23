from mongoengine import Document, StringField, DateField

class Events(Document):
    eventDate = DateField(required=True)
    eventTime = StringField(required=True)
