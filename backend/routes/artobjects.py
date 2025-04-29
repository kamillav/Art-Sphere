# routes/artobjects.py
from flask import Blueprint, request, jsonify
from sqlalchemy import or_, func
from models import ArtObject, Creator, Artist, Company, Museum, Medium, Type, Department
from app import db

artobjects_bp = Blueprint('artobjects', __name__)

@artobjects_bp.route('/', methods=['GET'])
def get_art_objects():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('limit', 20, type=int)
    search = request.args.get('search', '')
    creator_id = request.args.get('creator_id', type=int)
    medium_id = request.args.get('medium_id', type=int)
    type_id = request.args.get('type_id', type=int)
    dept_id = request.args.get('dept_id', type=int)
    museum_id = request.args.get('museum_id', type=int)

    query = db.session.query(
        ArtObject,
        Museum.Museum_Name,
        func.coalesce(Artist.artist_name, Company.company_name).label('creator_name'),
        Medium.name.label('medium_name'),
        Type.type_name,
        Department.dept_name
    ).outerjoin(Museum, ArtObject.museum_id == Museum.Museum_ID) \
     .outerjoin(Creator, ArtObject.creator_id == Creator.creator_id) \
     .outerjoin(Artist, Creator.creator_id == Artist.creator_id) \
     .outerjoin(Company, Creator.creator_id == Company.company_id) \
     .outerjoin(Medium, ArtObject.medium_id == Medium.medium_id) \
     .outerjoin(Type, ArtObject.type_id == Type.type_id) \
     .outerjoin(Department, ArtObject.dept_id == Department.dept_id)

    # Apply filters
    if search:
        query = query.filter(or_(
            ArtObject.object_name.ilike(f'%{search}%'),
            Artist.artist_name.ilike(f'%{search}%'),
            Company.company_name.ilike(f'%{search}%'),
            Museum.Museum_Name.ilike(f'%{search}%')
        ))

    if creator_id:
        query = query.filter(ArtObject.creator_id == creator_id)
    if medium_id:
        query = query.filter(ArtObject.medium_id == medium_id)
    if type_id:
        query = query.filter(ArtObject.type_id == type_id)
    if dept_id:
        query = query.filter(ArtObject.dept_id == dept_id)
    if museum_id:
        query = query.filter(ArtObject.museum_id == museum_id)

    total = query.count()

    results = query.order_by(ArtObject.object_name) \
                   .offset((page - 1) * per_page) \
                   .limit(per_page).all()

    art_objects = []
    for art_object, museum_name, creator_name, medium_name, type_name, dept_name in results:
        art_objects.append({
            'object_id': art_object.object_id,
            'object_name': art_object.object_name,
            'year': art_object.year,
            'museum_name': museum_name,
            'creator_name': creator_name,
            'medium_name': medium_name,
            'type_name': type_name,
            'dept_name': dept_name
        })

    return jsonify({
        'art_objects': art_objects,
        'pagination': {
            'total': total,
            'page': page,
            'per_page': per_page,
            'pages': (total + per_page - 1) // per_page
        }
    }), 200


@artobjects_bp.route('/<int:object_id>', methods=['GET'])
def get_art_object(object_id):
    result = db.session.query(
        ArtObject,
        Museum,
        Creator,
        func.coalesce(Artist.artist_name, Company.company_name).label('creator_name'),
        Artist.begin_date,
        Artist.end_date,
        func.coalesce(Artist.nationality, Company.nationality).label('nationality'),
        Medium,
        Type,
        Department
    ).outerjoin(Museum, ArtObject.museum_id == Museum.Museum_ID) \
     .outerjoin(Creator, ArtObject.creator_id == Creator.creator_id) \
     .outerjoin(Artist, Creator.creator_id == Artist.creator_id) \
     .outerjoin(Company, Creator.creator_id == Company.company_id) \
     .outerjoin(Medium, ArtObject.medium_id == Medium.medium_id) \
     .outerjoin(Type, ArtObject.type_id == Type.type_id) \
     .outerjoin(Department, ArtObject.dept_id == Department.dept_id) \
     .filter(ArtObject.object_id == object_id) \
     .first()

    if not result:
        return jsonify({'error': 'Art object not found'}), 404

    art_object, museum, creator, creator_name, begin_date, end_date, nationality, medium, type_, dept = result

    response = {
        'object_id': art_object.object_id,
        'object_name': art_object.object_name,
        'year': art_object.year,
        'museum': {
            'id': museum.Museum_ID if museum else None,
            'name': museum.Museum_Name if museum else None,
            'address': museum.Address if museum else None,
            'latitude': museum.Latitude if museum else None,
            'longitude': museum.Longitude if museum else None
        } if museum else None,
        'creator': {
            'id': creator.creator_id if creator else None,
            'type': creator.creator_type if creator else None,
            'name': creator_name,
            'begin_date': begin_date,
            'end_date': end_date,
            'nationality': nationality
        } if creator else None,
        'medium': {
            'id': medium.medium_id if medium else None,
            'name': medium.name if medium else None,
            'material': medium.material if medium else None
        } if medium else None,
        'type': {
            'id': type_.type_id if type_ else None,
            'name': type_.type_name if type_ else None
        } if type_ else None,
        'department': {
            'id': dept.dept_id if dept else None,
            'name': dept.dept_name if dept else None
        } if dept else None
    }

    return jsonify(response), 200


@artobjects_bp.route('/filters', methods=['GET'])
def get_filters():
    creators = []
    artists = db.session.query(Artist.creator_id, Artist.artist_name.label('name')).all()
    companies = db.session.query(Company.creator_id, Company.company_name.label('name')).all()

    for creator_id, name in artists + companies:
        creators.append({'id': creator_id, 'name': name})

    mediums = [{'id': medium.medium_id, 'name': medium.name} for medium in Medium.query.all()]
    types = [{'id': type_.type_id, 'name': type_.type_name} for type_ in Type.query.all()]
    departments = [{'id': dept.dept_id, 'name': dept.dept_name} for dept in Department.query.all()]
    museums = [{'id': museum.Museum_ID, 'name': museum.Museum_Name} for museum in Museum.query.all()]

    return jsonify({
        'creators': creators,
        'mediums': mediums,
        'types': types,
        'departments': departments,
        'museums': museums
    }), 200