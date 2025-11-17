# Portfolio - Jenya Proviz

A full-stack portfolio website showcasing my skills as a Frontend Developer and AI Expert.

## 🚀 Tech Stack

**Frontend:**
- React 18 with TypeScript
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

```
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
PORT=3001
```

### Run the Application
```bash
# From project root - run both client and server
npm run dev

# Or run separately:
# Client (from client directory)
npm start

# Server (from server directory)
npm start
```

## 📧 Contact

**Jenya Proviz**
- LinkedIn: [Your LinkedIn]
- Email: [Your Email]
- Location: Israel

## 🎯 About

Frontend Developer with 20+ years of Industrial Engineering experience, currently specializing in AI and modern web technologies. Passionate about creating efficient, user-friendly applications and integrating AI-driven solutions.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).