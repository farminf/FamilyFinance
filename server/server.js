const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 9000;

app.use(express.static(publicPath));

const redirectionFilter = function(req, res, next) {
  const theDate = new Date();
  const receivedUrl = `${req.protocol}:\/\/${req.hostname}:${port}${req.url}`;
  console.log(req.get("X-Forwarded-Proto"));
  if (
    req.get("X-Forwarded-Proto") === "http" ||
    req.get("X-Forwarded-Proto") === undefined
  ) {
    const redirectTo = `https:\/\/${req.hostname}:443${req.url}`;
    console.log(`${theDate} Redirecting ${receivedUrl} --> ${redirectTo}`);
    res.redirect(301, redirectTo);
  } else {
    next();
  }
};

app.get("/*", redirectionFilter);

app.get("/*", function(req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
