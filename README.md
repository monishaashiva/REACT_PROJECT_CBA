# Health Emergency Wallet

Overview:
Health Emergency Wallet is a full-stack web application built using MongoDB, Express.js, React.js, and Node.js. The app connects patients, hospitals, and fund managers to facilitate seamless fund requests and approvals during health emergencies.

Features:
- Secure user registration and login using JWT authentication
- Role-based access for Patients, Fund Managers, and Hospitals
- Patients can create fund requests for medical emergencies
- Fund Managers and Hospitals can review and approve or reject fund requests
- Real-time updates on fund request status
- Responsive UI built with React and Tailwind CSS
- RESTful API backend using Express and MongoDB

Technologies Used:
Frontend: React, React Router, Tailwind CSS, Axios
Backend: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens
Development Tools: VS Code, Postman

Prerequisites:
1. Install Node.js LTS version from https://nodejs.org/
2. Install MongoDB locally or create an account with MongoDB Atlas

Installation and Setup:

Backend Setup:
Navigate to your Backend directory. Run 'npm install' to install dependencies. Create a '.env' file with environment variables such as JWT_SECRET and MONGODB_URI. Start the backend server by running 'npm start' or 'node server.js'.

Frontend Setup:
Navigate to your Frontend directory. Run 'npm install' to install frontend dependencies. Start the React development server by running 'npm start'. Open your browser and visit http://localhost:3000 to see the app.

Usage:
Register users with their roles. Patients submit emergency fund requests. Fund Managers and Hospitals approve or reject requests. Track request statuses via user dashboards.

Folder Structure:
- Wallet/
   - Backend/ (Node.js backend)
     - middleware/
     - models/
     - routes/
     - .env (environment variables)
     - server.js (entry point)
   - Frontend/ (React frontend)
     - public/
     - src/
     - package.json
     - package-lock.json
   - .gitignore
   - README.md

Contributing:
Feel free to fork the repository and submit pull requests with improvements or features.

License:
This project is licensed under the MIT License.

