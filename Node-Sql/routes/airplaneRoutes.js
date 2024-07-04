
const express = require("express");
const router = express.Router();
const controller = require("../controllers/airplaneController")
const dynamicCheckAbilities  = require('../middlewares/dynamicCheckAbilities ');


// router.get("/",dynamicCheckAbilities, async (req, res) => {
router.get("/", async (req, res) => {
  try {
    const airplaneId = req.query.id;
    const company = req.query.company;

    if (airplaneId) {
      const airplane = await controller.getAirplaneById(airplaneId);
      if (!airplane) {
        return res.status(404).send({ error: "Airplane not found" });
      }
      res.status(200).send(airplane);
    } else if (company) {
      const company1 = await controller.getAirplaneByCompany(company);
      if (!company1) {
        return res.status(404).send({ error: "Company not found" });
      }
      res.status(200).send(company1);
    } else {
      res.status(400).send({ error: "Missing query parameters" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to process request" });
  }
});

module.exports = router;