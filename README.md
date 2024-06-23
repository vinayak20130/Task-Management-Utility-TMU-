# Task Management Utility

This project is a Task Management Utility consisting of a React frontend and a Node.js backend. The frontend uses Ant Design (antd) for UI components and dayjs for date manipulation, among other libraries.

## Repository

You can find the repository at [https://github.com/vinayak20130/Task-Management-Utility-TMU-](https://github.com/vinayak20130/Task-Management-Utility-TMU-).

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (includes npm)

## Project Structure

The project consists of two main parts:
1. **Frontend (React)**
2. **Backend (Node.js)**

## Installation and Setup

### 1. Clone the Repository

First, clone the project repository:

```bash
git clone https://github.com/vinayak20130/Task-Management-Utility-TMU-.git
cd Task-Management-Utility-TMU-
```
### 2.Setup the Frontend
Navigate to the frontend directory and install dependencies:

Note yarn is recommended
```bash
cd frontend
npm install -g yarn
yarn install
```
or
```bash
cd frontend
npm install
```
Environment Variables
Create a .env file in the root of the frontend directory and add the following environment variables:
```bash
REACT_APP_GET_TODO_API=http://localhost:4000/api/v1/getaTodo
REACT_APP_CREATE_TODO_API=http://localhost:4000/api/v1/createTodo
REACT_APP_UPDATE_TODO_API=http://localhost:4000/api/v1/updateTodo
REACT_APP_DELETE_TODO_API=http://localhost:4000/api/v1/deleteTodo
```
proxy is available for local host:4000 in package.json in frontend
so this can be used directly

```bash
REACT_APP_GET_TODO_API=/api/v1/getaTodo
REACT_APP_CREATE_TODO_API=/api/v1/createTodo
REACT_APP_UPDATE_TODO_API=/api/v1/updateTodo
REACT_APP_DELETE_TODO_API=/api/v1/deleteTodo
```

### 3. Setup the Backend
Navigate to the backend directory and install dependencies:
```bash
cd ../backend
npm install
```
Environment Variables
Create a .env file in the root of the backend directory and add the necessary environment variables for your backend. For example:
```bash
MONGO_URI=mongodb://localhost:27017/yourdbname
PORT=4000
```
### 4. Starting the Development Servers
Start the Backend Server
Ensure you are in the backend directory and start the backend server:
```bash
npm run dev
```
This will start the backend server with nodemon, which automatically restarts the server when file changes are detected.

Start the Frontend Server
Open a new terminal window/tab, navigate to the frontend directory, and start the frontend server:
```bash
cd frontend
npm start
```
This will start the React development server, which will automatically open the application in your default web browser.
### 5. Accessing the Application
Once both servers are running:

Your React application will be accessible at [http://localhost:3000](http://localhost:3000)  
Your backend API will be accessible at [http://localhost:4000](http://localhost:4000)

## Libraries and Tools Used

### Frontend (React)
- **Ant Design (antd)**: Used for UI components like buttons, modals, and forms. Provides a consistent and professional design language.
- **dayjs**: A lightweight JavaScript library for date manipulation. Used instead of moment.js for better performance and smaller bundle size.
- **axios**: A promise-based HTTP client for making API requests.

### Backend (Node.js)
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js. Provides a schema-based solution to model your application data.
- **dotenv**: A module to load environment variables from a `.env` file into `process.env`.

## Features
- A landing page displaying a list of tasks.
- Ability for users to add new tasks with a title, description, and due date.
- Ability for users to view detailed information of each task.
- Option to edit existing tasks.
- Option to delete tasks.
- Responsive design to ensure usability on both desktop and mobile devices.

## License
This project is licensed under the MIT License.

### Explanation of Libraries Used

- **Ant Design (antd)**: Used for the UI components such as buttons, modals, forms, and other elements, providing a polished and professional design.
- **dayjs**: Chosen for date manipulation due to its smaller size and performance benefits over moment.js.
- **axios**: Used for making HTTP requests to the backend API, handling CRUD operations for tasks.

This `README.md` file provides a comprehensive guide for users to install and start your project, along with information on the libraries and tools used.
getTodoById has been implemented but has not been use in frontend
