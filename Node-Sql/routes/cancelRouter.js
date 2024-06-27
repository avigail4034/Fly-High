const express = require("express");
const router = express.Router();
const controller = require("../controllers/cancelController");

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const flightId = req.query.flightId;
  try {
    if (userId) {
      const cancel = await controller.getCancelOfUser(userId);
      if (!cancel) {
        return res.status(404).send({ error: "cancel not found" });
      }
      res.status(200).send(cancel);
    }
    else if (flightId) {
      const cancel = await controller.getCancelOfFlight(flightId);
      if (!cancel) {
        return res.status(404).send({ error: "cancel not found" });
      }
      res.status(200).send(cancel);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch cancel" });

  }
});

router.post("/:flightId", async (req, res) => {
  const flightId = req.params.flightId; // קבלת ה־flightId מהפרמטרים של הנתיב
  const arrUsersCancel = req.body; // קבלת המערך של המשתמשים לביטול מהבקשה בגוף הבקשה

  try {
    const cancel = await controller.createCancel(flightId, arrUsersCancel);
    res.status(200).send(cancel);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create cancel" });
  }
});
router.delete("/", async (req, res) => {
  const flight_id_arr = req.query.flight_id_arr;
  const user_id = req.query.user_id;
  try {
    if (user_id && flight_id_arr) {
      const result = await controller.deleteCancel(flight_id_arr, user_id);
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