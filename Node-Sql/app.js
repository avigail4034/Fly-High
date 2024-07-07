
const path = require('path');
const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
const cookieParser = require("cookie-parser");


const jwtAuthentication = require('./middlewares/jwtAuthentication')
const flightsRouter = require("./routes/flightsRoutes")
const usersRouter = require("./routes/usersRoutes")
const logInRouter = require("./routes/logInRoutes")
const orderRouter = require("./routes/orderRoutes")
const cancelRouter = require("./routes/cancelRouter")
const LogOutRouter = require("./routes/LogOutRouter")
const PlacesRouter = require("./routes/placesRouter")
const checkConnect = require("./routes/checkConnectRouter")
const companyEmploeeRouter = require("./routes/companyEmployeeRouter")
const airplanesRouter = require("./routes/airplaneRoutes")


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use("/flights", flightsRouter);
app.use("/users", usersRouter);
app.use("/LogIn", logInRouter);
app.use("/checkConnect", checkConnect);


 app.use(jwtAuthentication)
app.use("/Order", orderRouter);
app.use("/LogOut", LogOutRouter);
app.use("/Places", PlacesRouter);
app.use("/airplanes", airplanesRouter);
app.use("/company_employees", companyEmploeeRouter);
app.use("/Cancel", cancelRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});






