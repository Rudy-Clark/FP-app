const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const PORT = process.env.NODE_ENV || 8000;
const routes = {
  home: "/",
  script: "/client.js"
};

const requestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url);
  switch (parsedUrl.pathname) {
    case routes.home: {
      fs.readFile("./index.html", (err, data) => {
        if (err) {
          console.log("Error", err);
          process.exit(1);
        }
        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        res.end(data);
      });
      break;
    }
    case routes.script: {
      fs.readFile("./client.js", (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end("script not found");
        }
        res.writeHead(200, {
          "Content-Type": "text/javascript"
        });
        res.end(data);
      });
      break;
    }
    default: {
      fs.readFile("./index.html", (err, data) => {
        if (err) {
          console.log("Error", err);
          process.exit(1);
        }
        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        res.end(data);
      });
      break;
    }
  }
};

const app = http.createServer(requestHandler);

app.listen(PORT, err => console.log(`App running on http://localhost:${PORT}`));
