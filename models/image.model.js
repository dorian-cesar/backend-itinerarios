const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Image = sequelize.define("Image", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // models/image.model.js
title: {
  type: DataTypes.STRING,
  allowNull: true
},
comments: {
  type: DataTypes.TEXT,
  allowNull: true
}
});

module.exports = Image;