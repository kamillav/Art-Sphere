-- artsphere_ddl.sql
-- 🎨 Artsphere Project
-- Author: Kamilla Volkova

-- Drop tables if they already exist
DROP TABLE IF EXISTS user_collection;
DROP TABLE IF EXISTS artobject;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS creator;
DROP TABLE IF EXISTS medium;
DROP TABLE IF EXISTS type;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS museum;
DROP TABLE IF EXISTS user;

-- Create user table
CREATE TABLE user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create museum table
CREATE TABLE museum (
    museum_id INTEGER PRIMARY KEY AUTOINCREMENT,
    museum_name TEXT NOT NULL,
    address TEXT,
    latitude REAL,
    longitude REAL
);

-- Create medium table
CREATE TABLE medium (
    medium_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    material TEXT
);

-- Create type table
CREATE TABLE type (
    type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    type_name TEXT NOT NULL
);

-- Create department table
CREATE TABLE department (
    dept_id INTEGER PRIMARY KEY AUTOINCREMENT,
    dept_name TEXT NOT NULL
);

-- Create creator table
CREATE TABLE creator (
    creator_id INTEGER PRIMARY KEY AUTOINCREMENT,
    creator_type TEXT NOT NULL -- added from ER diagram!
);

-- Create artist table
CREATE TABLE artist (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    creator_id INTEGER NOT NULL,
    artist_name TEXT NOT NULL,
    begin_date TEXT,
    end_date TEXT,
    nationality TEXT,
    FOREIGN KEY (creator_id) REFERENCES creator(creator_id)
);

-- Create company table
CREATE TABLE company (
    company_id INTEGER PRIMARY KEY AUTOINCREMENT,
    creator_id INTEGER NOT NULL,
    company_name TEXT NOT NULL,
    nationality TEXT,
    FOREIGN KEY (creator_id) REFERENCES creator(creator_id)
);

-- Create artobject table
CREATE TABLE artobject (
    object_id INTEGER PRIMARY KEY AUTOINCREMENT,
    object_name TEXT NOT NULL,
    objectmuseum_id INTEGER,
    museum_id INTEGER,
    creator_id INTEGER,
    year INTEGER,
    medium_id INTEGER,
    type_id INTEGER,
    dept_id INTEGER,
    FOREIGN KEY (objectmuseum_id) REFERENCES artobject(object_id),
    FOREIGN KEY (museum_id) REFERENCES museum(museum_id),
    FOREIGN KEY (creator_id) REFERENCES creator(creator_id),
    FOREIGN KEY (medium_id) REFERENCES medium(medium_id),
    FOREIGN KEY (type_id) REFERENCES type(type_id),
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

-- Create user_collection table
CREATE TABLE user_collection (
    collection_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    object_id INTEGER,
    note TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (object_id) REFERENCES artobject(object_id)
);