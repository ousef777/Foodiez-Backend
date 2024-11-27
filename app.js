const express = require("express");
const connectDb = require("./database");
const recipesRoutes = require("./api/recipes/recipes.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const passport = require('passport');
const { localStrategy, jwtStrategy } = require('./middlewares/passport');
const cors = require('cors');
require('dotenv').config();
const app = express();
connectDb();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use("/recipes", recipesRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(8001, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
