const Image = require("../models/image.model");

// guardar imagen
exports.createImage = async (req, res) => {
  try {
    const { cityId, title, comments } = req.body;

    const url = `/uploads/${req.file.filename}`;

    const image = await Image.create({
      cityId: parseInt(cityId),
      title,
      comments,
      url
    });

    res.json(image);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, comments } = req.body;

    await Image.update(
      { title, comments },
      { where: { id } }
    );

    res.json({ message: "Imagen actualizada" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// obtener imágenes por ciudad (máx 3)
exports.getImagesByCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    const images = await Image.findAll({
      where: { cityId },
       order: [['id', 'DESC']], // 🔥 clave
      limit: 3,
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// listar todas (para mantenedor)
exports.getAll = async (req, res) => {
  const images = await Image.findAll();
  res.json(images);
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    await Image.destroy({
      where: { id }
    });

    res.json({ message: "Imagen eliminada" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};