from mongoengine import Document, StringField, DateTimeField, IntField, ReferenceField
from datetime import datetime

class Owner(Document):
    ownerId = IntField()