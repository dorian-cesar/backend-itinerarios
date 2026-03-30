// controllers/auth.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const SECRET = "mi_clave_secreta"; // después lo movemos a .env

// 🔹 registro
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no existe" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ error: "Password incorrecto" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};