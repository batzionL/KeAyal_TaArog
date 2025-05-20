from mongoengine import Document, IntField

class Owner(Document):
    ownerId = IntField()