require("dotenv").config();
require("express-async-errors");
// Express
const express = require("express");
const app = express();
// Packages
const cors = require("cors");
const morgan = require("morgan");


// Database
const connectDB = require("./db/connect.js");

// Routers
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const categoryRouter = require("./routes/categoryRoutes.js");
const attendeeRouter = require("./routes/attendeeRoutes.js");
const transactionRouter = require("./routes/transactionRoutes.js");


// Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Dependencies application
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/attendees", attendeeRouter);
app.use("/api/v1/transactions", transactionRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
    res.send("<h1>Store Api</h1>");
  });



const port = process.env.PORT || 5000;
const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
startApp();