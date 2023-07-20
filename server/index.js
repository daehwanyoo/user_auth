const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true, // use the new URL parser to parse MongoDB connection string, default true
    useUnifiedTopology: true, //use the new Server Discovery and Monitoring engine, default false
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// cookie-based sessions or extracts data from cookies
app.use(cookieParser());
//express.json() add body property to the request or req object. 
app.use(express.json());
app.use("/", authRoute);