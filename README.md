The Entity Management Web Application is a simple web application built with Node.js in the backend, and React.js with Redux in frontend. It allows to manage a dataset of two-dimensional named entities. The application allows users to create, edit, and remove entities, visualize the dataset on a canvas.

## Features

- Add new entities with names, 2D coordinates, and labels.
- Edit existing entities' names, coordinates, and labels.
- Remove entities from the dataset.
- Visualize the dataset on a canvas with axes and markup.

## Getting Started

### Clone the Repository

Clone the repository from GitHub using the following command:

git clone https://github.com/levgenprog/entity_visualization_app.git
cd entity_visualization_app
### Installation

Ensure you have Node.js and npm (Node Package Manager) installed on your system.

Install the project dependencies for backend by running:
cd backend
npm install

# Run the Backend

To start the backend server, run:

node index.js

The backend server will run on http://localhost:3001.

### Frontend
 
In other terminal run:
cd frontend
Install dependencies:
npm install 

# Run the frontend
To start the frontend development server, run:
npm start
The frontend will be accessible at http://localhost:3000 in your web browser.

### How to Use
# Backend
The backend server will handle API requests from the frontend.
The database is managed using SQLite, and the entities are stored in the base.db file.
The backend API supports CRUD operations for entities.

# Frontend
The frontend provides a user interface to manage entities and visualize the dataset.
You can add new entities, edit existing ones, and remove entities using the provided interface.
The dataset visualization is displayed on the homepage with X and Y axes, markup, and entities on the canvas.
