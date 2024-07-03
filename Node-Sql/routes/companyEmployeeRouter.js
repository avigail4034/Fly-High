
const express = require("express");
const router = express.Router();
const controller = require("../controllers/companyEmployeeController")


router.get("/", async (req, res) => {
  const employeeId = req.query.employee_id;
  if (employeeId) {
      try {
        const company = await controller.getCompanyByemployeeId(employeeId);
        if (!company) {
          return res.status(404).send({ error: "company not found" });
        }
        res.status(200).send(company);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch company" });
      } 
    }

});
module.exports = router;