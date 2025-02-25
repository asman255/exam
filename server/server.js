const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5003;
const morgan = require("morgan");
require("dotenv/config");


const tester = require("./routes/tester")



// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Route
app.get("/", (req, res) => {
  console.log("Hello world ");
  res.json({ message: "Hello World" });
});



app.use("/api/tester",tester)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
