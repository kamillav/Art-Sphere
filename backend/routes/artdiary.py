# routes/artdiary.py - Art diary routes
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import User, UserCollection, ArtObject, Creator, Artist, Company

artdiary_bp = Blueprint('artdiary', __name__)


@artdiary_bp.route('/', methods=['GET'])
@jwt_required()
def get_artdiary():
    user_id = get_jwt_identity()

    # Get user's art diary collections
    collections_query = db.session.query(
        UserCollection,
        ArtObject,
        db.func.coalesce(Artist.artist_name, Company.company_name).label('creator_name')
    ).join(ArtObject, UserCollection.object_id == ArtObject.object_id) \
        .outerjoin(Creator, ArtObject.creator_id == Creator.creator_id) \
        .outerjoin(Artist, Creator.creator_id == Artist.creator_id) \
        .outerjoin(Company, Creator.creator_id == Company.company_id) \
        .filter(UserCollection.user_id == user_id) \
        .all()

    items = []
    for user_collection, art_object, creator_name in collections_query:
        price = float(art_object.price) if art_object.price else 0

        items.append({
            'collection_id': user_collection.collection_id,
            'added_at': user_collection.added_at.isoformat(),
            'art_object': {
                'object_id': art_object.object_id,
                'object_name': art_object.object_name,
                'image_url': art_object.image_url,
                'price': price,
                'creator_name': creator_name
            }
        })

    return jsonify({
        'items': items
    }), 200


@artdiary_bp.route('/add', methods=['POST'])
@jwt_required()
def add_to_artdiary():
    user_id = get_jwt_identity()
    data = request.get_json()

    if 'object_id' not in data:
        return jsonify({'error': 'Missing required field: object_id'}), 400

    object_id = data['object_id']

    # Check if art object exists
    art_object = ArtObject.query.get(object_id)
    if not art_object:
        return jsonify({'error': 'Art object not found'}), 404

    # Check if already in user's collection
    existing_entry = UserCollection.query.filter_by(user_id=user_id, object_id=object_id).first()
    if existing_entry:
        return jsonify({'message': 'Item already in art diary'}), 200

    # Add new entry to user collection
    user_collection = UserCollection(user_id=user_id, object_id=object_id)
    db.session.add(user_collection)

    try:
        db.session.commit()
        return jsonify({'message': 'Item added to art diary successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@artdiary_bp.route('/remove/<int:collection_id>', methods=['DELETE'])
@jwt_required()
def remove_from_artdiary(collection_id):
    user_id = get_jwt_identity()

    # Get user collection entry
    user_collection = UserCollection.query.filter_by(collection_id=collection_id, user_id=user_id).first()
    if not user_collection:
        return jsonify({'error': 'Item not found in art diary'}), 404

    try:
        db.session.delete(user_collection)
        db.session.commit()
        return jsonify({'message': 'Item removed from art diary successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500