# routes/auth.py
from flask import Blueprint, request, jsonify
from backend import db, bcrypt
from models import User  # 🔥 Fixed (capital U)
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing username, email, or password'}), 400

    # Check if username or email already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({'error': 'Username or email already exists'}), 400

    # Hash password
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create new user
    new_user = User(
        username=username,
        email=email,
        password_hash=password_hash
    )
    db.session.add(new_user)
    db.session.commit()

    # Generate access token using the new_user.user_id
    access_token = create_access_token(identity=str(new_user.user_id))

    return jsonify({
        'message': 'User registered successfully',
        'access_token': access_token
    }), 200

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400

    user = User.query.filter_by(email=email).first()  # 🔥 Fixed (capital U)

    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid email or password'}), 401

    # Create JWT token
    access_token = create_access_token(identity=str(user.user_id))  # 🔥 Added str()

    return jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'user_id': user.user_id,
        'username': user.username
    }), 200