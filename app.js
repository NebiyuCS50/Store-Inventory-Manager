require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const { router } = require("./Routes/index");

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
