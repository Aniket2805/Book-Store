# BookStore MERN Application

A comprehensive BookStore application built using the MERN stack (MongoDB, Express.js, React, Node.js) with features including user authentication, an admin panel for managing books and users, and a user-friendly interface.

## Features

- **JWT Authentication**: Secure user sign-in and sign-up with interactive error handling.
- **Admin Panel**: Add, remove, update books, and manage user roles (promote users to admin, delete users).
- **User-Saved Books**: Users can save their favorite books, with all data stored in MongoDB.
- **Interactive UI**: Designed for an enhanced user experience.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/bookstore-mern.git
    cd bookstore-mern
    ```

2. **Install dependencies for both frontend and backend**
    ```bash
    # Install backend dependencies
    cd backend
    npm install
    
    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Run the application**

    Open two terminal windows or tabs.

    In the first terminal, start the backend server:
    ```bash
    cd backend
    npm start
    ```

    In the second terminal, start the frontend development server:
    ```bash
    cd frontend
    npm start
    ```

    The application should now be running at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Usage

- **User Authentication**: Sign up or log in to access the application features.
- **Admin Panel**: Log in as an admin to manage books and user roles.
- **Book Management**: Users can browse and save books, while admins can add, update, or remove books.

## Folder Structure

```plaintext
bookstore-mern/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── index.js
├── bookStore/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── index.js
└── README.md

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to customize it further to match your specific project's details and structure.
