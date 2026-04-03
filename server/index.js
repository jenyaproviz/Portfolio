import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import contactRoute from "./routes/contact.js";
import initializeDatabase from "./utils/init-database.js";
import chalk from "chalk";

// Configuring environment variables
dotenv.config();

const app = express();

// Constants
const PORT = process.env.PORT || 8080;

function buildMongoUri({ dbHost, dbPort, dbName, dbUser, dbPassword, dbAuthSource }) {
  const username = encodeURIComponent(dbUser);
  const password = encodeURIComponent(dbPassword);

  return `mongodb://${username}:${password}@${dbHost}:${dbPort}/${dbName}?authSource=${encodeURIComponent(dbAuthSource)}`;
}

function getMongoUriCandidates() {
  if (process.env.MONGODB_URI) {
    return [process.env.MONGODB_URI];
  }

  const dbHost = process.env.DB_HOST || "localhost";
  const dbPort = process.env.DB_PORT || "27017";
  const dbName = process.env.DB_NAME || "youtube";
  const candidates = [];

  if (process.env.DB_USER && process.env.DB_PASSWORD) {
    const authSources = [
      process.env.DB_AUTH_SOURCE,
      dbName,
      "admin",
    ].filter(Boolean);

    for (const authSource of [...new Set(authSources)]) {
      candidates.push(
        buildMongoUri({
          dbHost,
          dbPort,
          dbName,
          dbUser: process.env.DB_USER,
          dbPassword: process.env.DB_PASSWORD,
          dbAuthSource: authSource,
        })
      );
    }
  }

  candidates.push(`mongodb://${dbHost}:${dbPort}/${dbName}`);

  return [...new Set(candidates)];
}

async function connectToMongo() {
  const mongoUriCandidates = getMongoUriCandidates();
  let lastError;

  for (const mongoUri of mongoUriCandidates) {
    try {
      await mongoose.connect(mongoUri);
      return mongoUri;
    } catch (error) {
      lastError = error;

      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
    }
  }

  throw lastError;
}

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
// Serve images from the 'uploads' directory
app.use("/uploads", express.static("uploads"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Middleware for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/contact", contactRoute);

// Connect to MongoDB and start the server
async function start() {
  try {
    const mongoUri = await connectToMongo();

    console.log(chalk.greenBright(`Connected to MongoDB at: ${mongoUri}`));

    if (process.env.SEED_DATABASE === "true") {
      await initializeDatabase();
      console.log(chalk.greenBright("Database initialized successfully"));
    }

    const server = app.listen(PORT, () =>
      console.log(chalk.blueBright(`Server started on port: ${PORT}`))
    );

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          chalk.redBright(
            `Port ${PORT} is already in use. Stop the existing server or change PORT in server/.env.`
          )
        );
        process.exit(1);
      }

      throw error;
    });
  } catch (error) {
    console.error(
      chalk.redBright("Error connecting to MongoDB:", error.message)
    );
    console.error("Error details:", error);
  }
}

start();
