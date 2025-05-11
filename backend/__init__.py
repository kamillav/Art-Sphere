# backend/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    # ✅ Inline configuration (no more config.py needed)
    app.config["SECRET_KEY"] = "dev-secret"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "dev-jwt-secret"

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

    from backend.routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    from backend.routes.artobjects import artobjects_bp
    app.register_blueprint(artobjects_bp, url_prefix="/api/artobjects")

    return app