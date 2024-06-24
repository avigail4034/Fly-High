
const express = require("express");
const router = express.Router();
const controller = require("../controllers/flightsController");

router.get("/", async (req, res) => {
  const {arrOfFlightsIdToCancel, exitP, target, date, isDirect, company, id, arrOfFlightsId } = req.query;
  let flights;

  try {
    if (arrOfFlightsId) {
      flights = await controller.getArrFlightsById(arrOfFlightsId);
    } else if (arrOfFlightsIdToCancel) {
      flights = await controller.getArrFlightsByIdToCancel(arrOfFlightsIdToCancel);
    }
   else if (exitP && target && date) {
    console.log("exitP && target && date",exitP, target , date,isDirect);
      if (isDirect=="true") {
        flights = await controller.getFlightByParams(exitP, target, date);
      }
      else{
        console.log("durect");
        flights = await controller.getFlightByParamsNotDirect(exitP, target, date);
      }
    } else if (id) {
      flights = await controller.getFlightById(id);
    } else {
      flights = await controller.getAllflights();
    }
    if (flights || flights.length > 0) {
      console.log(flights,"fhfhgjhrjhevdjgh");
      res.status(200).send(flights);
    } else {
      return res.status(404).send({ error: "Flight not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || "Failed to fetch flights" });
  }
});



router.post("/", async (req, res) => {
  const airplane_id = req.query.airplane_id;
  if (airplane_id) {
    try {
      const { departureDate, arrivalDate } = req.body;
      const response = await controller.checkDatesController(departureDate, arrivalDate, airplane_id);
      res.status(200).send(response);
      return;
    }
    catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to checkDates" });
    }
  }
  else {
    try {
      const { company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime } = req.body;
      const response = await controller.createFlight(company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime);
      res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to create Flight" });
    }
  }


});



router.put("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const { company, airplain_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, active} = req.body;
    const flight = await controller.updateFlight(ID,  company, airplain_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, active);
    // const updatedFlight = await controller.getFlight(ID);
    if (!flight) {
 
      return res.status(404).send({ error: "Flight not found" });
    }
    res.status(200).send(flight);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update Flight" });
  }
});

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
