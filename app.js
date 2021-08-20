// internal node package
const path = require("path");

//external node packages
const express = require("express");

//module imports
const errorController = require("./controllers/errorController.js");

//app settings
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

//routers
const homeRoutes = require("./routes/home");

//models

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(homeRoutes);

app.use(errorController.error404NotFound);






















const port = process.env.PORT;
app.listen(port||3000, (req) => {
console.log("Server Up at 3000");
});
