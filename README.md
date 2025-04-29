# 🎨 ArtSphere - Database Application Project

### by Kamilla Volkova

## 🎯 Application Purpose and Summary
ArtSphere is designed to enhance the art exploration and collection experience by allowing users to effortlessly track art pieces they encounter, manage their personal art collections, and discover new artworks. 🌟 It solves the common problem of losing track of art pieces visited or desired, creating a seamless connection between art enthusiasts and artworks across various museums and galleries, particularly focusing on museums located in New York City. 🗽

An exciting feature is the location-based notifications 📍—users can receive real-time alerts when they are near an art piece they have saved in their personal galleries, enhancing their museum visits.

## 📌 Proposed Entities
Initially, the application will focus on core entities such as Art Pieces 🖼️, Creators (both Artists 👨‍🎨 and Companies 🏢), Museums 🏛️, and Users 👥.
Each art piece will have attributes including ID, name/title, creator (whether an artist or a company), creation year, medium, type, department, and museum location.
Creators will be managed through a unified system, where Artists will have additional profile details like begin date, end date, and nationality, while Companies will have their own information.
![image](https://github.com/user-attachments/assets/fa61d93e-8f9d-4809-a4ef-af7780c1fd94)

## 📚 E-R Model Compliance Checklist

The E-R model for **ArtSphere** fulfills all project requirements as detailed below:

| **Requirement** | **Included?** | **Details** |
|:-----------------|:--------------|:------------|
| **8–10 Entities** | ✅ | The model includes `User`, `Museum`, `Creator`, `Artist`, `Company`, `ArtObject`, `UserCollection`, `Medium`, `Type`, and `Department`. |
| **Weak Entity** | ✅ | `UserCollection` is a weak entity, dependent on both `User` and `ArtObject` for its identification. |
| **Composite Attribute** | ✅ | `Museum` includes a composite `address` attribute (street, city, state, and zip code components). |
| **Multivalued Attribute** | ✅ | `ArtObject` can belong to multiple categories via attributes like `Medium` and `Type`. |
| **Many-to-Many Relationship** | ✅ | ArtObjects can be associated with multiple categories (mediums, types), forming many-to-many relationships. |
| **Descriptive Attribute on Relationship** | ✅ | `UserCollection` includes the `added_at` timestamp to track when a user saved an artwork. |



## 🛠️ Proposed Technology Stack
- 🐍 **Programming Language:** Python
- 🌐 **User Interface:** Web Interface (React frontend)
- 📦 **Database Type:** SQLite
- 🚧 **Frameworks and Tools:** Flask (backend), React (frontend), Pandas (data manipulation)
  
## 📂 Project Structure: ArtSphere

### Backend (`/backend`)
- `app.py` — Main Flask application
- `models.py` — Database models (User, ArtObject, etc.)
- `requirements.txt` — Python dependencies
- `database.db` — SQLite database file
- **SQL Scripts** (`/backend/sql/`)
  - `DDL.sql` — Database schema (CREATE tables)
  - `DML.sql` — Sample data inserts
  - `QUERIES.sql` — Example queries
- **Routes** (`/backend/routes/`)
  - `auth.py` — Authentication routes
  - `artobjects.py` — Art object retrieval routes
  - `artdiary.py` — User art diary CRUD routes
- **Instance folder** (`/backend/instance/`)
  - `database.db` — Local database (Flask default instance)

### Frontend (`/frontend`)
- **React Application (`/frontend/src/`)**
  - `assets/`
    - `react.svg`
  - `components/`
    - `auth/ProtectedRoute.jsx` — Protected route component
    - `layout/Navbar.jsx` — Navigation bar
  - `contexts/`
    - `AuthContext.jsx` — Authentication context
    - `CollectionContext.jsx` — User's collection context
  - `pages/`
    - `Home.jsx` — Homepage
    - `Login.jsx` — Login page
    - `Register.jsx` — Registration page
    - `Profile.jsx` — User profile
    - `ArtDiary.jsx` — Art diary page
    - `ArtObjectDetails.jsx` — Detailed view of an artwork
    - `Search.jsx` — Search artworks
  - `services/`
    - `api.js` — Axios instance
    - `authService.js` — Authentication services
  - `App.jsx` — Root component
  - `App.css` — App styling
  - `index.css` — Global styling
  - `main.jsx` — React app entry point
- `index.html` — Main HTML file
- `vite.config.js` — Vite config
- `tailwind.config.js` — TailwindCSS config
- `postcss.config.js` — PostCSS config
- `eslint.config.js` — ESLint config
- `package.json` — NPM dependencies
- `package-lock.json`
- `README.md` — Frontend README

### Documentation (`/docs`)
- `UserGuide.md` — Full user guide and installation instructions

### UML Diagrams (`/uml`)
- `Artsphere_Tiny.puml` — PlantUML ER diagram for database design

### Root Level
- `README.md` — Main project documentation
- `.git/` — Git repository data




## 👩‍💻 User Interaction and CRUD Operations
Users will interact with the ArtSphere application through a responsive web interface built with React, interacting seamlessly with Flask backend APIs:

- ➕ **Create:** Users can add new artworks to their personal collections through intuitive web forms.
- 🔍 **Read:** Users can search, filter, and view detailed information about art pieces through interactive pages.
- ✏️ **Update:** Users can update details of the artworks in their personal collections, adding notes or personalized details.
- ❌ **Delete:** Users can easily remove art pieces from their collections through simple interactions provided in the UI.

## 💡 Why This Domain?
ArtSphere's domain offers a unique and rich database structure supporting many-to-many relationships (e.g., artworks belonging to multiple categories or collections), complex queries, and an engaging user experience. 🎉 The chosen domain supports robust database modeling, providing practical experience in database fundamentals, and aligns closely with personal interest and course requirements.
