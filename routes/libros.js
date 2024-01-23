const express = require("express");
const router = express.Router();
const libros = require("../data");
const Joi = require("joi");

const libroSchema = Joi.object({
  titulo: Joi.string().required().label("Título"),
  autor: Joi.string().required().label("Autor"),
});

//obtener todos los libros

router.get("/", (req, res, next) => {
  try {
    res.json(libros);
  } catch (error) {
    next(error);
  }
});

//obtener un libro por ID

router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const libro = libros.find((libro) => libro.id === parseInt(id));

    if (!libro) {
      const error = new Error("Libro no encontrado");
      error.status = 404;
      throw error;
    }
    res.json(libro);
  } catch (error) {
    next(error);
  }
});

//crear un libro

router.post("/", (req, res, next) => {
  try {
    const { error, value } = libroSchema.validate(req.body);
    if (error) {
      const validationError = new Error("Error de validación");
      validationError.status = 400;
      validationError.details = error.details.map((detail) => detail.message);
      throw validationError;
    }

    const { titulo, autor } = value;

    const nuevoLibro = {
      id: libros.length + 1,
      titulo,
      autor,
    };

    libros.push(nuevoLibro);

    res.status(201).json(nuevoLibro);
  } catch (error) {
    next(error);
  }
});

// update libro

router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = libroSchema.validate(req.body);
    if (error) {
      const validationError = new Error("Error de validación");
      validationError.status = 400;
      validationError.details = error.details.map((detail) => detail.message);
      throw validationError;
    }

    const { titulo, autor } = value;
    const libroEncontrado = libros.find((libro) => libro.id === id);

    if (!libroEncontrado) {
      const error = new Error("Libro no encontrado");
      error.status = 404;
      throw error;
    }

    libroEncontrado.titulo = titulo || libroEncontrado.titulo;
    libroEncontrado.autor = autor || libroEncontrado.autor;

    res.json(libroEncontrado);
  } catch (error) {
    next(error);
  }
});

//delete libro

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const libroEncontrado = libros.find((libro) => libro.id === id);

    if (!libroEncontrado) {
      const error = new Error("Libro no encontrado");
      error.status = 404;
      throw error;
    }

    const libroEliminado = libros.splice(index, 1);
    res.json(libroEliminado[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
