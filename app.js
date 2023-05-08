var createError = require("http-errors");
var express = require("express");
const ejs = require("ejs");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Create data for routes to use
var messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello world!",
    user: "Charles",
    added: new Date(),
  },
];

// Routes

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var newMessageRouter = require("./routes/new-message");

indexRouter.use((req,res,next) => {
  res.locals.messages = messages;
  next();
})

newMessageRouter.use((req,res,next) => {
  res.locals.messages = messages;
  next();
})

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/new", newMessageRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
