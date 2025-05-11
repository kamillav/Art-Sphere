# app.py - Main Flask application file
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from datetime import timedelta
import os

from extensions import db, bcrypt, jwt  # ✅ Imported from extensions.py

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_secret_key')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt_dev_secret')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['JWT_IDENTITY_CLAIM'] = 'sub'

CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://localhost:5173"}}, expose_headers=["Authorization"])

# ✅ Initialize extensions with the app
db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

# Import routes after initializing app
from routes.auth import auth_bp
from routes.artobjects import artobjects_bp
from routes.artdiary import artdiary_bp

# Register blueprints with proper prefixes
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(artobjects_bp, url_prefix='/api/artobjects')
app.register_blueprint(artdiary_bp, url_prefix='/api/artdiary')

# Add a root route for sanity check
@app.route('/')
def index():
    return jsonify({"message": "Welcome to ArtSphere API!"}), 200

if __name__ == '__main__':
    app.run(debug=True)