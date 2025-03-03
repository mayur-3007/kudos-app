# Kudos App - React + Django

This is a full-stack application where users can give "kudos" to other users in their organization. Built with React for the frontend and Django for the backend.

## Features

- **User Authentication**: Login and signup with username.
- **Kudos System**: Users can give kudos to others in their organization.
- **Organization-Based**: Users are associated with an organization.
- **Dynamic UI**: Built with Material-UI for a modern and responsive design.

## Prerequisites

Before running this application, ensure that you have the following:

- Python 3.8+
- Node.js 14+
- sqlite (or any database supported by Django)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/mayur-3007/kudos-app.git
cd kudos-app
```

### 2. Backend Setup

```bash
cd kudos_project
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
brew install redis # On Linux: sudo apt install redis-server, Windows: https://github.com/microsoftarchive/redis
brew services start redis #Stop cmd: brew services stop redis
python manage.py migrate
python manage.py load_demo_data
python manage.py createsuperuser
honcho start #backend run command #honcho - Python-based process manager
```

### 3. Frontend Setup

```bash
# In another terminal
cd ../kudos-frontend
npm install
npm start #frontend run command
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000


### 6. Testing Details

- Postman collection is provided in root directory.
- username and password are case sensitive
- password of all demo data is 'password'
- Schedule the task to run every Monday at midnight:
    - Go to the Django admin panel (http://localhost:8000/admin)
    - Navigate to Periodic Tasks under Periodic Tasks
    - Add a new periodic task:
        - Name: Reset Kudos Weekly
        - Task: kudos_app.tasks.reset_kudos_for_all_users
        - Interval: 1 week
        - Start Time: Next Monday at 00:00