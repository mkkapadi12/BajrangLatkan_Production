# My React App

A full-stack web application built with React + Vite for the frontend and Express + MongoDB for the backend.

## Tech Stack

### Frontend

- React 19
- Vite 7
- React Router DOM
- TailwindCSS
- HeroIcons

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- CORS
- dotenv for environment variables

## Getting Started

### Prerequisites

- Node.js
- MongoDB installed and running locally

### Installation

1. Clone the repository

2. Install frontend dependencies:

```bash
cd my-react-app
npm install
```

3. Install backend dependencies:

```bash
cd backend
npm install
```

4. Create a `.env` file in the backend directory and configure your environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd my-react-app
npm run dev
```

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend

- `npm run start` - Start production server
- `npm run dev` - Start development server with nodemon

## Project Structure

```
├── frontend (root)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   └── public/
└── backend/
    ├── models/
    ├── routes/
    └── server.js
```
