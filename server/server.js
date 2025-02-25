const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5003;
const morgan = require("morgan");
require("dotenv/config");

const { readdirSync } = require("fs");

const tester = require("./routes/tester")

// const campingRoute = require("./routes/camping");
// const profileRoute = require("./routes/profile");

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Route
app.get("/", (req, res) => {
  console.log("Hello world ");
  res.json({ message: "Hello World" });
});

// readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
// console.log(readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r))))

// app.use("/api", campingRoute);
// app.use("/api",profileRoute)

app.use("/api/tester",tester)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
