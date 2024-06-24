const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");


router.get("/", async (req, res) => {
  const userId = req.query.user_id;
  const flightId = req.query.flightId;
  if (userId) {
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
  }if (flightId) {
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
router.post("/", async (req, res) => {
  try {
    const {user_id,flight_id ,places_arr } = req.body; // Assuming you meant to include completed
    const order = await controller.createOrder(user_id,flight_id ,places_arr);
    res.status(200).send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create order" });
  }
});
router.delete("/", async (req, res) => {
  const flight_id = req.query.flight_id;
  const flight_id_arr = req.query.flight_id_arr;
  const user_id = req.query.user_id;
  const {arrPlaces} = req.body;
  try {
    if(user_id){    const result = await await controller.deleteOrderToCancel(flight_id_arr, user_id);
      if (!result) {
        return res.status(404).send({ error: "order not found" });
      }}
    else
{    const result = await await controller.deleteOrder(flight_id,arrPlaces);
  if (!result) {
    return res.status(404).send({ error: "order not found" });
  }}    
    res.status(200).send({ message: "order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete order" });
  }
});

/////////////////?????????????????????????????????????????????????????????????????????????????????????????????????????
module.exports = router;
