const express = require("express");
const app = express();
const sequelize = require("./config/database");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const { DataTypes } = require("sequelize");
const User = require("./models/user.model")(sequelize, DataTypes);

app.use(cors());
app.use(express.json());

// carpeta pública
app.use(express.static("public"));

// servir uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// rutas
const imageRoutes = require("./routes/image.routes");
app.use("/api/images", imageRoutes);

const citiesRoutes = require("./routes/cities");
app.use("/api/cities", citiesRoutes);

// iniciar servidor
sequelize.sync({force:false , alter:true}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.PORT);
  });
});