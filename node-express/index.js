const http = require ("http");
const express = require ("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");
const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/dishes", dishRouter);

app.use("/leaders", leaderRouter);

app.use("/promotions", promoRouter);

/*informs express to look at the root folder that countains the public folder*/
app.use(express.static(__dirname + "/public"));

/*next is used when you need to invoke additional middleware to take care of work on your behalf*/
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><h1>This is an express server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});