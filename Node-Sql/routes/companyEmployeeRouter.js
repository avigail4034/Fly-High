
const express = require("express");
const router = express.Router();
const controller = require("../controllers/companyEmployeeController")
const dynamicCheckAbilities  = require('../middlewares/dynamicCheckAbilities ');
const roleAuthorization = require('../middlewares/roleAuthorization');

//איך אני יכולה להביא בגט את USERDETAILES????????????????????????????זה צריך להיות בגוף הבקשה ואין בגט
//  router.get("/",roleAuthorization([1, 2]), async (req, res) => {
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