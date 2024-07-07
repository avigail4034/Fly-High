
const express = require("express");
const router = express.Router();
const controller = require("../controllers/flightsController");
const roleAuthorization = require('../middlewares/roleAuthorization');
const jwtAuthentication = require('../middlewares/jwtAuthentication');
const dynamicCheckAbilities  = require('../middlewares/dynamicCheckAbilities ');
//פה יש בעיה כי אפשר שיהיה גט גם אם לא מחוברים כלל-ורוצים תצוגה של כל הטיסות!!!!!!!
// router.get("/",dynamicCheckAbilities, async (req, res) => {
  router.get("/", async (req, res) => {
  const { arrOfFlightsIdToCancel, exitP, target, date, isDirect, company, id, arrOfFlightsId } = req.query;
  let flights;

  try {
    //מאופשר רק אם יש משתמש מחובר--בדיקה ב-dynamicCheckAbilities
    if (arrOfFlightsId) {
      flights = await controller.getArrFlightsById(arrOfFlightsId);
    } else if (arrOfFlightsIdToCancel) {
      flights = await controller.getArrFlightsByIdToCancel(arrOfFlightsIdToCancel);//פונקציה להבאת כל הטיסות שנמחקו של טיסה מסוימת שהתבטלה
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
    } 
    else {//גם אם אין משתשמש מחובר ניתן לקבל את הטיסות
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
  router.post("/",jwtAuthentication, roleAuthorization([1, 2]), async (req, res) => {
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
      const { company, airplane_id, exitP, flightCode, price, target, departureDate, arrivalDate, departureTime, arrivalTime, image } = req.body.flightDetails;
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
 router.put("/:ID",jwtAuthentication, roleAuthorization([1, 2]), async (req, res) => {
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

//מחיקת טיסה
 router.delete("/:ID",jwtAuthentication,roleAuthorization([1, 2]), async (req, res) => {
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
