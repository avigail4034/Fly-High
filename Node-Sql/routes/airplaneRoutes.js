
const express = require("express");
const router = express.Router();
const controller = require("../controllers/airplaneController")
// GET all users
router.get("/", async (req, res) => {
  const airplaneId = req.query.id;
  const company = req.query.company;
  if (airplaneId) {
      try {
        const airplane = await controller.getAirplaneById(airplaneId);
        if (!airplane) {
          return res.status(404).send({ error: "airplane not found" });
        }
        res.status(200).send(airplane);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: " airplane" });
      } 
    }
  else
  if (company) {
    try {
      const company1 = await controller.getAirplaneByCompany(company);
      if (!company1) {
        return res.status(404).send({ error: "company not found" });
      }
      res.status(200).send(company1);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch company" });
    } 
  }
//   else {
//     try {
//       const users = await controller.getAllUsers();
//       res.status(200).send(users);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: "Failed to fetch users" });
//     }
//   }
});
module.exports = router;