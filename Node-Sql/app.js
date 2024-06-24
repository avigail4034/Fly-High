
const path = require('path');
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));


const flightsRouter = require("./routes/flightsRoutes")
app.use("/flights", flightsRouter);

const usersRouter = require("./routes/usersRoutes")
app.use("/users", usersRouter);
const logInRouter = require("./routes/logInRoutes")
app.use("/LogIn", logInRouter);
const orderRouter = require("./routes/orderRoutes")
app.use("/Order", orderRouter);
const cancelRouter = require("./routes/cancelRouter")
app.use("/Cancel", cancelRouter);
const PlacesRouter = require("./routes/placesRouter")
app.use("/Places", PlacesRouter);
const companyEmploeeRouter = require("./routes/companyEmployeeRouter")
app.use("/company_employees", companyEmploeeRouter);
const airplanesRouter = require("./routes/airplaneRoutes")
app.use("/airplanes", airplanesRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});






