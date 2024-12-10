const express = require("express");
const app = express();

// routes
const userRoutes = require("./routes/userRoute");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payment");
const courseRoutes = require("./routes/Course");
// Middleware

app.use(express.json());
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const DBconnect = require("./config/Database");
const cloudinaryConnect = require("./config/Cloudinary");
const cors = require("cors");
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// databases and cloudinary connection

DBconnect();
cloudinaryConnect();

// mount routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);
// Port

const PORT = process.env.PORT || 4000;

// server configuration

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// default routes

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
