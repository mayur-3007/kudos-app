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
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py load_demo_data
python manage.py createsuperuser
python manage.py runserver #backend run command
```

### 3. Frontend Setup

```bash
# In another terminal
cd kudos-frontend
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