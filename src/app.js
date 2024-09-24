const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: Create a GET /musicians route to return all musicians
app.get("/musicians", async (req, res) => {
  try {
    const musicians = await Musician.findAll();
    res.json(musicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /musicians/:id route
app.get("/musicians/:id", async (req, res) => {
  const musicianId = req.params.id;
  try {
    const musician = await Musician.findByPk(musicianId);
    if (musician) {
      res.json(musician);
    } else {
      res.status(404).json({ error: "Musician not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /musicians route for creating a new musician
app.post("/musicians", async (req, res) => {
  const newMusician = req.body;
  try {
    const musician = await Musician.create(newMusician);
    res.status(201).json(musician);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /musicians/:id route for updating an existing musician
app.put("/musicians/:id", async (req, res) => {
  const musicianId = req.params.id;
  const updatedData = req.body;
  try {
    const [updated] = await Musician.update(updatedData, {
      where: { id: musicianId },
    });

    if (updated) {
      const updatedMusician = await Musician.findByPk(musicianId);
      res.json(updatedMusician);
    } else {
      res.status(404).json({ error: "Musician not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
