const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");
const roleAuthorization = require('../middlewares/roleAuthorization');
const dynamicCheckAbilities  = require('../middlewares/dynamicCheckAbilities ');

// router.get("/",dynamicCheckAbilities, async (req, res) => {
  router.get("/", async (req, res) => {
  const userId = req.query.user_id;
  const flightId = req.query.flightId;
  if (userId) {
    //פה כל משתמש יכול לקבל את הטיסות שלו
    try {
      const flights = await controller.getFlightsOfUser(userId);
      if (!flights) {
        return res.status(404).send({ error: "flights not found" });
      }
      res.status(200).send(flights);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch flights" });
    }
    //פה רק עובד או מנהל יכול לקבל
  } if (flightId) {
    try {
      const flights = await controller.getUsersOfFlight(flightId);
      if (!flights) {
        return res.status(404).send({ error: "flights not found" });
      }
      res.status(200).send(flights);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch flights" });
    }
  }
});

//כל המשתמשים יכולים להזמין טיסה- נבדק כבר באפפ שהמשתמש מחובר
router.post("/", async (req, res) => {
  try {
    const { user_id, flight_id, places_arr } = req.body;
    const order = await controller.createOrder(user_id, flight_id, places_arr);
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create order" });
  }
});


 router.delete("/",dynamicCheckAbilities, async (req, res) => {
  const flight_id = req.query.flight_id;
  const flight_id_arr = req.query.flight_id_arr;
  const user_id = req.query.user_id;
  const { arrPlaces } = req.body;
  //פה משתמש מוחק את הטיסה שלו לאחר שהוא מאשר ביטול של טיסה שנמחקה
  try {
    if (user_id) {
      const result = await controller.deleteOrderToCancel(flight_id_arr, user_id);
      if (!result) {
        return res.status(404).send({ error: "order not found" });
      }
    }
    //פה כל משתמש יכול למחוק את ההזמנה של הטיסה שלו
    else {
      const result = await await controller.deleteOrder(flight_id, arrPlaces);
      if (!result) {
        return res.status(404).send({ error: "order not found" });
      }
    }
    res.status(200).send({ message: "order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete order" });
  }
});

module.exports = router;
