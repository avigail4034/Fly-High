
const express = require("express");
const router = express.Router();
const controller = require("../controllers/flightsController");
const roleAuthorization = require('../middlewares/roleAuthorization');

router.get("/", async (req, res) => {
  const { arrOfFlightsIdToCancel, exitP, target, date, isDirect, company, id, arrOfFlightsId } = req.query;
  let flights;

  try {
    if (arrOfFlightsId) {
      flights = await controller.getArrFlightsById(arrOfFlightsId);
    } else if (arrOfFlightsIdToCancel) {
      flights = await controller.getArrFlightsByIdToCancel(arrOfFlightsIdToCancel);
    }
    else if (exitP && target && date) {
      if (isDirect == "true") {
        flights = await controller.getFlightByParams(exitP, target, date);
      }
      else {
        flights = await controller.getFlightByParamsNotDirect(exitP, target, date);
      }
    } else if (id) {
      flights = await controller.getFlightById(id);
    } else {
      flights = await controller.getAllflights();
    }
    if (flights || flights.length > 0) {
      res.status(200).send(flights);
    } else {
      return res.status(404).send({ error: "Flight not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || "Failed to fetch flights" });
  }
});


//יצירת טיסה חדשה
// router.post("/", roleAuthorization([1, 2]), async (req, res) => {
  router.post("/", async (req, res) => {
  try {
    const airplane_id = req.query.airplane_id;

    if (airplane_id) {
      const { departureDate, arrivalDate } = req.body;
      const response = await controller.checkDatesController(departureDate, arrivalDate, airplane_id);
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(404).send({ error: "Error to post" });
      }
    } else {
      const { company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, image } = req.body;
      const response = await controller.createFlight(company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, image);
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(404).send({ error: "Error to post" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to process request" });
  }
});



//עדכון טיסה לטיסה לא פעילה
// router.put("/:ID",roleAuthorization([1, 2]), async (req, res) => {
  router.put("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const flight = await controller.updateFlight(ID);
    if (!flight) {
      return res.status(404).send({ error: "Flight not found" });
    }
    res.status(200).send(flight);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update Flight" });
  }
});


// router.delete("/:ID",roleAuthorization([1, 2]), async (req, res) => {
  router.delete("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const result = await await controller.deleteFlight(ID);
    if (result === false) {
      return res.status(404).send({ error: "Flight not found" });
    }
    res.status(200).send({ message: "Flight deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete Flight" });
  }
});

module.exports = router;
