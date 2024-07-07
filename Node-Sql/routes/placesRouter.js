
const express = require("express");
const router = express.Router();
const controller = require("../controllers/placesController")
const roleAuthorization = require('../middlewares/roleAuthorization');
const dynamicCheckAbilities  = require('../middlewares/dynamicCheckAbilities ');

router.get("/", async (req, res) => {
  const airplaneId = req.query.airplane_id;
  const arrOfPlacesId = req.query.arrOfPlacesId;
  try {
    if (airplaneId) {
      const places = await controller.getPlacesByAirplaneId(airplaneId);
      if (!places) {
        return res.status(404).send({ error: "places not found" });
      }
      res.status(200).send(places);
    }
    if (arrOfPlacesId) {
      const places = await controller.getPlacesById(arrOfPlacesId);
      if (!places) {
        return res.status(404).send({ error: "places not found" });
      }
      res.status(200).send(places);
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch places" });
  }



});
// - צריך רק שיהיה מחובר כל סוגי המשתמשים יכולים להזמין טיסה...
  router.put("/:airplaneId", async (req, res) => {
  try {
    const airplaneId = req.params.airplaneId;
    const arrPlaces = req.body;
    const places = await controller.updatePlaces(airplaneId, arrPlaces);
    if (places) {
      return res.status(404).send({ error: "Place not found" });
    }
    res.status(200).send(places);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update Place" });
  }
});


module.exports = router;