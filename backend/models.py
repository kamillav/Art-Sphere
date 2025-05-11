# models.py
from extensions import db, bcrypt
from datetime import datetime

# ===============================
# User Management
# ===============================

class User(db.Model):
    __tablename__ = 'user'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    collections = db.relationship('UserCollection', backref='user', lazy=True)

class UserCollection(db.Model):
    __tablename__ = 'user_collection'
    collection_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    object_id = db.Column(db.Integer, db.ForeignKey('artobject.object_id'), nullable=False)
    note = db.Column(db.Text)
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

# ===============================
# Artworks
# ===============================

class ArtObject(db.Model):
    __tablename__ = 'artobject'
    object_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    object_name = db.Column(db.String(200), nullable=False)
    objectmuseum_id = db.Column(db.String(100))
    museum_id = db.Column(db.Integer, db.ForeignKey('museum.Museum_ID'))
    creator_id = db.Column(db.Integer, db.ForeignKey('creator.creator_id'))
    year = db.Column(db.String(50))
    medium_id = db.Column(db.Integer, db.ForeignKey('medium.medium_id'))
    type_id = db.Column(db.Integer, db.ForeignKey('type.type_id'))
    dept_id = db.Column(db.Integer, db.ForeignKey('department.dept_id'))
    # price and image_url REMOVED because they don't exist in database

    collections = db.relationship('UserCollection', backref='artobject', lazy=True)

# ===============================
# Creator Info
# ===============================

class Creator(db.Model):
    __tablename__ = 'creator'
    creator_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator_type = db.Column(db.String(50))

    art_objects = db.relationship('ArtObject', backref='creator', lazy=True)
    artist = db.relationship('Artist', backref='creator_entity', lazy=True, uselist=False)
    company = db.relationship('Company', backref='creator_entity', lazy=True, uselist=False)

class Artist(db.Model):
    __tablename__ = 'artist'
    artist_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('creator.creator_id'), nullable=False)
    begin_date = db.Column(db.String(50))
    end_date = db.Column(db.String(50))
    nationality = db.Column(db.String(100))
    artist_name = db.Column(db.String(200), nullable=False)

class Company(db.Model):
    __tablename__ = 'company'
    company_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('creator.creator_id'), nullable=False)
    nationality = db.Column(db.String(100))
    company_name = db.Column(db.String(200), nullable=False)

# ===============================
# Museum
# ===============================

class Museum(db.Model):
    __tablename__ = 'museum'
    Museum_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Museum_Name = db.Column(db.String(200), nullable=False)
    Address = db.Column(db.String(300))
    Latitude = db.Column(db.Float)
    Longitude = db.Column(db.Float)

    art_objects = db.relationship('ArtObject', backref='museum', lazy=True)

# ===============================
# Artwork Classification
# ===============================

class Department(db.Model):
    __tablename__ = 'department'
    dept_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dept_name = db.Column(db.String(100), nullable=False)

    art_objects = db.relationship('ArtObject', backref='department', lazy=True)

class Medium(db.Model):
    __tablename__ = 'medium'
    medium_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    material = db.Column(db.String(200))

    art_objects = db.relationship('ArtObject', backref='medium', lazy=True)

class Type(db.Model):
    __tablename__ = 'type'
    type_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type_name = db.Column(db.String(100), nullable=False)

    art_objects = db.relationship('ArtObject', backref='type', lazy=True)
