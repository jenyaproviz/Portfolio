# Portfolio - Jenya Proviz

A full-stack portfolio website showcasing my skills as a Frontend Developer and AI Expert.

## 🚀 Tech Stack

**Frontend:**

- React 18
- Vite
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Router for navigation
- React Icons for UI elements

**Backend:**

- Node.js with Express
- MongoDB for database
- JWT authentication
- File upload handling

## 📁 Project Structure

```text
Portfolio/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
│   └── public/
├── server/          # Node.js backend API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
└── README.md
```

## 🌟 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Portfolio**: Projects showcase with filtering and search
- **Skills Section**: Interactive skill categories with progress bars
- **Professional Timeline**: Education and work experience display
- **Multi-language Support**: Hebrew, Russian, and English
- **Contact Form**: Direct communication capability
- **Dark Theme**: Modern dark UI design

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Clone Repository

```bash
git clone https://github.com/jenyaproviz/Portfolio.git
cd Portfolio
```

### Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Environment Setup

Create `.env` file in the server directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_CODE=your_admin_signup_code
PORT=8080
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_app_password
EMAIL_FROM_NAME=Portfolio Contact Form
CLIENT_URL=http://localhost:3000
```

Optional client environment in the client directory:

```env
VITE_API_URL=http://localhost:8080/api
```

You can copy the production-ready examples from [client/.env.example](c:/Users/jenka/Documents/Projects%20fullstack/Portfolio/client/.env.example) and [server/.env.example](c:/Users/jenka/Documents/Projects%20fullstack/Portfolio/server/.env.example).

### Run the Application

```bash
# From project root - run both client and server
npm run dev

# Or run separately:
# Client (from client directory)
cd client
npm start

# Server (from server directory)
cd ../server
npm run dev
```

The frontend runs on <http://localhost:3000> and the backend runs on <http://localhost:8080> by default.

For a production frontend build:

```bash
cd client
npm run build
```

## Public Deployment

This repo is now prepared for a simple public deployment with:

- Netlify for the React frontend
- Render for the Express API
- MongoDB Atlas for the database

### 1. Deploy the backend API on Render

1. Create a MongoDB Atlas database and copy the connection string.
2. In Render, create a new `Web Service` from this GitHub repository.
3. Set `Root Directory` to `server`.
4. Use `npm install` as the build command.
5. Use `npm start` as the start command.
6. Add these environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
ADMIN_CODE=replace_with_admin_signup_code
PORT=8080
CLIENT_URL=https://your-site-name.netlify.app
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_app_password
EMAIL_FROM_NAME=Portfolio Contact Form
```

7. After deploy, open `https://your-backend-url.onrender.com/api/health` and confirm it returns `{ "ok": true }`.

### 2. Deploy the frontend on Netlify

1. In Netlify, import the same GitHub repository.
2. Netlify will use [netlify.toml](c:/Users/jenka/Documents/Projects%20fullstack/Portfolio/netlify.toml), so the frontend is built from the `client` folder automatically.
3. Add this environment variable in Netlify:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

4. Deploy the site.

The redirect rule in [netlify.toml](c:/Users/jenka/Documents/Projects%20fullstack/Portfolio/netlify.toml) keeps React Router working when visitors refresh routes like `/about` or `/projects`.

### 3. Connect the two services

After Netlify gives you a public site URL:

1. Copy that URL.
2. Put it in the Render `CLIENT_URL` environment variable.
3. Redeploy the backend if Render does not do it automatically.

### Important limitation

Post images are stored in the server's local `uploads` folder. On hosts like Render, that storage is temporary, so uploaded images can disappear after restart or redeploy. For a durable production blog, move image uploads to Cloudinary, S3, or another external file store.

## 📧 Contact

### Jenya Proviz

- LinkedIn: [linkedin.com/in/jenya-proviz-katz]
- Email: [jenka.katz@gmail.com]
- Location: Israel

## 🎯 About

Frontend Developer with 20+ years of Industrial Engineering experience, currently specializing in AI and modern web technologies. Passionate about creating efficient, user-friendly applications and integrating AI-driven solutions.
