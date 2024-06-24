const model = require('../models/companyEmployeeModel');



async function getCompanyByemployeeId(employeeId)
{
    try {
        return model.getCompanyByemployeeId(employeeId)

    } catch (err) {
        throw err;
    }

}
module.exports = { getCompanyByemployeeId}