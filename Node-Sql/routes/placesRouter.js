
const express = require("express");
const router = express.Router();
const controller = require("../controllers/placesController")
// GET all users
router.get("/", async (req, res) => {
  const airplaneId = req.query.airplane_id;
  const arrOfPlacesId = req.query.arrOfPlacesId;


    try {
      console.log(airplaneId,"dsf");
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
      console.error(error);
      res.status(500).send({ error: "Failed to fetch places" });
    }

});
  router.put("/:airplaneId", async (req, res) => {
    try {
      const airplaneId = req.params.airplaneId;
      const arrPlaces = req.body;
      const places = await controller.updatePlaces(airplaneId, arrPlaces);
      // const updatedFlight = await controller.getFlight(ID);
      if (places) {
        return res.status(404).send({ error: "Place not found" });
      }
      res.status(200).send(places);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to update Place" });
    }
  });
  //   else {
  //     try {
  //       const users = await controller.getAllUsers();
  //       res.status(200).send(users);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).send({ error: "Failed to fetch users" });
  //     }
  //   }

module.exports = router;