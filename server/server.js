const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 9000;

app.use(express.static(publicPath));

app.get("*", function(req, res, next) {
  if (req.headers["x-forwarded-proto"] != "https")
    res.redirect("https://" + req.hostname + ":443" + req.url);
  else next(); /* Continue to other routes if we're not redirecting */
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
