const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 9000;

app.use(express.static(publicPath));

app.get("/*", function(req, res, next) {
  if (
    req.headers["x-forwarded-proto"] != "https" ||
    req.get("x-forwarded-Proto") === undefined
  ) {
    let redirectTo = "https://" + req.hostname + ":443" + req.url;
    res.redirect(301, redirectTo);
  } else next(); /* Continue to other routes if we're not redirecting */
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
