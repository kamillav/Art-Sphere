# 🎨 ArtSphere - Database Application Project

### 🙋‍♂️ By Kamilla Volkova

## 🚀 Application Title
**ArtSphere: A Personalized Art Management Platform**

## 🎯 Application Purpose and Summary
ArtSphere is designed to enhance the art exploration and collection experience by allowing users to effortlessly track art pieces they encounter, manage their personal art collections, and discover new artworks. 🌟 It solves the common problem of losing track of art pieces visited or desired, creating a seamless connection between art enthusiasts and artworks across various museums and galleries, particularly focusing on museums located in New York City. 🗽

An exciting feature is the location-based notifications 📍—users can receive real-time alerts when they are near an art piece they have saved in their personal galleries, enhancing their museum visits.

## 📌 Proposed Entities
Initially, the application will focus on core entities such as Art Pieces 🖼️, Creators (both Artists 👨‍🎨 and Companies 🏢), Museums 🏛️, and Users 👥.
Each art piece will have attributes including ID, name/title, creator (whether an artist or a company), creation year, medium, type, department, and museum location.
Creators will be managed through a unified system, where Artists will have additional profile details like begin date, end date, and nationality, while Companies will have their own information.
Museums will manage their exhibition locations, addresses, and geographical coordinates.
Users will be able to maintain personal collections of favorite or visited art pieces, enabling deeper interaction and engagement.
As the project evolves, additional entities like Exhibitions 🎟️, Categories 📂, and Reviews 🌟 may be introduced to enrich the experience.

![image](https://github.com/user-attachments/assets/fa61d93e-8f9d-4809-a4ef-af7780c1fd94)


## 🛠️ Proposed Technology Stack
- 🐍 **Programming Language:** Python
- 🌐 **User Interface:** Web Interface (React frontend)
- 📦 **Database Type:** SQLite
- 🚧 **Frameworks and Tools:** Flask (backend), React (frontend), Pandas (data manipulation)

## 👩‍💻 User Interaction and CRUD Operations
Users will interact with the ArtSphere application through a responsive web interface built with React, interacting seamlessly with Flask backend APIs:

- ➕ **Create:** Users can add new artworks to their personal collections through intuitive web forms.
- 🔍 **Read:** Users can search, filter, and view detailed information about art pieces through interactive pages.
- ✏️ **Update:** Users can update details of the artworks in their personal collections, adding notes or personalized details.
- ❌ **Delete:** Users can easily remove art pieces from their collections through simple interactions provided in the UI.

## 💡 Why This Domain?
ArtSphere's domain offers a unique and rich database structure supporting many-to-many relationships (e.g., artworks belonging to multiple categories or collections), complex queries, and an engaging user experience. 🎉 The chosen domain supports robust database modeling, providing practical experience in database fundamentals, and aligns closely with personal interest and course requirements.
