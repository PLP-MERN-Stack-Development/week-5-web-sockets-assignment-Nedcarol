socketio-chat/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── socket/         # Socket.io client setup
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Node.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Socket event handlers
│   ├── models/             # Data models
│   ├── socket/             # Socket.io server setup
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
# Real-Time Chat App (Socket.io, React, Node.js)

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19951011&assignment_repo_type=AssignmentRepo)

## Overview
A real-time chat application built with Node.js, Express, Socket.io, and React. Supports public and private messaging, typing indicators, and online user status.

## Features
- Real-time public chat
- Private messaging between users
- Typing indicators
- Online users list
- (Optional) File sharing (to be implemented)
- (Optional) Emoji reactions (to be implemented)
- (Optional) Message history (to be implemented)

## Folder Structure
```
week-5-web-sockets-assignment-Nedcarol/
  client/   # React frontend
  server/   # Node.js/Express backend
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### 1. Clone the repository
```sh
git clone https://github.com/PLP-MERN-Stack-Development/week-5-web-sockets-assignment-Nedcarol.git
cd week-5-web-sockets-assignment-Nedcarol
```

### 2. Install dependencies
#### Server
```sh
cd server
npm install
```
#### Client
```sh
cd ../client
npm install
```

### 3. Run the app locally
#### Start the backend
```sh
cd server
npm run dev
```
#### Start the frontend
```sh
cd ../client
npm run dev
```

- The backend runs on [http://localhost:5002](http://localhost:5002)
- The frontend runs on [http://localhost:5173](http://localhost:5173)

## Deployment

### Deploying the Server (Node.js/Express)
- **Render**: [https://render.com/](https://render.com/)
  - Create a new Web Service, connect your repo, set build/start commands (`npm install`, `npm run dev` or `npm start`), and set environment variables if needed.
- **Railway**: [https://railway.app/](https://railway.app/)
  - Similar process: new project, connect repo, deploy.

### Deploying the Client (React/Vite)
- **Vercel**: [https://vercel.com/](https://vercel.com/)
- **Netlify**: [https://netlify.com/](https://netlify.com/)
  - Connect your repo, set build command (`npm run build`), and publish directory (`dist`).

**Note:**
- Update the Socket.io client URL in `client/src/socket/socket.js` to point to your deployed backend.
- Make sure CORS is configured on the backend to allow your frontend domain.

## Screenshots
_Add screenshots or GIFs here_

## Optional Features (To Be Added)
- File sharing (send images/files in chat)
- Emoji reactions to messages
- Message history (persist chat in database)

## License
MIT

---

**Author:** Nedcarol