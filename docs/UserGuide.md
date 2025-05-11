# 🎨 ArtSphere - User Guide

Welcome to **ArtSphere**, your personal art management platform!  
This guide will help you set up and use the project easily.

---

## 🚀 How to Set Up and Run ArtSphere

Follow these simple steps:

---

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/kamillav/ArtSphere.git
cd ArtSphere
```

---

### 2. Backend Setup (Flask API)

1. **Create a virtual environment:**

```bash
python -m venv venv
```

*If it does not work, please try downloading python from the official website and installing it.*

2. **Activate the virtual environment:**

- **macOS/Linux:**

```bash
source venv/bin/activate
```

- **Windows:**

```bash
venv\Scripts\activate
```

3. **Install Python dependencies:**

```bash
pip install -r requirements.txt
```
*Might also need to run*

```bash
pip install flask-bcrypt
pip install flask-jwt-extended
```

*In case never worked with flask on your computer before*

4. **Start the backend server:**

```bash
python -m backend.main
```


The backend will run at:

```
http://127.0.0.1:5000/
```

---

### 3. Frontend Setup (React App)

In a **new terminal window**:

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173/
```

✅ **Important:** Keep both backend and frontend servers running simultaneously.

---

## 🔑 How to Log In

You have two options:

### Option 1: Create a New Account

- Click the **Register** button on the homepage.
- Fill in your username, email, and password.
- Start using ArtSphere immediately!

### Option 2: Use the Provided Test Account

- **Email:** `kv@trincoll.edu`
- **Password:** `kv`

No need to create a new account if you prefer using the demo account.

---

## 🖌️ Features Available

Once logged in, you can:

- 🎨 **Browse Artworks:** View various art objects with details like creator, museum, and year.
- 📚 **Save to Your Art Diary:** Save your favorite artworks to your personal collection.
- 📝 **Manage Your Collection:** View and manage the artworks you’ve saved.
- 🗑️ **Delete Saved Artworks:** Remove items from your Art Diary easily.

---

## 🛠️ Technology Stack

- **Backend:** Python Flask
- **Frontend:** React.js (Vite)
- **Database:** SQLite
- **Authentication:** JWT (JSON Web Tokens)

---

## ⚙️ Additional Notes

- If you encounter any issues, make sure both frontend and backend servers are running.
- Ensure you have Python 3.x installed for the backend.
- Ensure you have Node.js and npm installed for the frontend.

Thank you for using ArtSphere! 🎉

