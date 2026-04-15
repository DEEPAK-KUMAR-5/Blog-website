✍️ Full Stack Blog Website

A modern full-stack blog web application built using the MERN stack. Users can create, edit, and share blog posts, interact through comments, and explore content with a clean and responsive UI.

🚀 Features
🔐 User Authentication (JWT-based)
📝 Create, Edit, Delete Blog Posts
💬 Comment System
❤️ Like & Bookmark Posts
🔎 Search & Filter Blogs
📱 Fully Responsive Design

Deployed -> https://voluble-heliotrope-cbb6c7.netlify.app

🛠️ Tech Stack

Frontend:

React.js
Tailwind CSS / Bootstrap

Backend:

Node.js
Express.js

Database:

MongoDB (Mongoose)

Other Tools:

JWT Authentication
Cloudinary (Image Uploads)
📂 Project Structure
blog-website/
│
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── comment.controller.js
│   │   ├── post.controller.js
│   │   └── user.controller.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   │
│   ├── models/
│   │   ├── bookmark.model.js
│   │   ├── comment.model.js
│   │   ├── like.model.js
│   │   ├── post.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── post.route.js
│   │   └── user.route.js
│   │
│   ├── utility/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   └── Cloudinary.js
│   │
│   ├── public/
│   │   └── temp/
│   │
│   ├── .env
│   ├── app.js
│   ├── constants.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   └── blog/
│       ├── src/
│       │   ├── assets/
│       │   │   ├── hero.png
│       │   │   ├── react.svg
│       │   │   └── vite.svg
│       │   │
│       │   ├── components/
│       │   │   ├── Navbar.jsx
│       │   │   └── ProtectedRoute.jsx
│       │   │
│       │   ├── context/
│       │   │   └── AuthContext.jsx
│       │   │
│       │   ├── Pages/
│       │   │   ├── BlogDetail.jsx
│       │   │   ├── Blogs.jsx
│       │   │   ├── Bookmarks.jsx
│       │   │   ├── Categories.jsx
│       │   │   ├── Dashboard.jsx
│       │   │   ├── Home.jsx
│       │   │   ├── Login.jsx
│       │   │   └── Register.jsx
│       │   │
│       │   ├── App.css
│       │   ├── App.jsx
│       │   ├── index.css
│       │   └── main.jsx
│       │
│       ├── public/
│       │   ├── favicon.svg
│       │   └── icons.svg
│       │
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── package-lock.json
│       ├── README.md
│       └── vite.config.js
│
└── node_modules
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/blog-app.git
cd blog-app
2️⃣ Install dependencies

Backend:

cd server
npm install

Frontend:

cd client
npm install
3️⃣ Environment Variables

Create a .env file in the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
4️⃣ Run the project

Backend:

npm run server

Frontend:

npm start
🔌 API Endpoints
Auth
POST /api/register
POST /api/login
Posts
GET /api/posts
GET /api/posts/:id
POST /api/posts
PUT /api/posts/:id
DELETE /api/posts/:id
Comments
POST /api/comments
GET /api/comments/:postId
📸 Screenshots

Add screenshots of your project here (homepage, editor, etc.)

🧠 Future Improvements
🧑‍💼 User Profiles
📊 Analytics Dashboard
🔔 Notifications
🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.


👨‍💻 Author

Deepak Kumar
