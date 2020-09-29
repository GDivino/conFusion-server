const express = require("express");
const bodyParser = require("body-parser");

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route("/")
/* when a request(any request) comes in for the /dishes rest API endpoint, this code will be executed */
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    /*continues to look for additional specifications down below to match the dishes endpoint*/
    next();
})

/* handles the get request*/
.get((req, res, next) => {
    res.end("Will send all the dishes to you")
})

/*handles the post request*/
.post((req, res, next) => {
    res.end("Will add the dish: " + req.body.name + " with details: " + req.body.description)
})

/*handles the put reques*/
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
})

/*handles the delete request*/
.delete((req, res, next) => {
    res.end("Deleting all the dishes");
});


dishRouter.route("/:dishId")
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})

/*handles the get request*/
.get((req, res, next) => {
    res.end("Will send details of the dish: " + req.params.dishId + " to you");
})

/*handles the post request*/
.post((req, res, next) => {
    req.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId); 
})

/*handles the put request*/
.put((req, res, next) => {
    /*used to add a line inside the body*/
    res.write("Updating the dish: " + req.params.dishId + "\n");
    res.end("Will update the dish: " + req.body.name + " with details: " + req.body.description);
})

/*handles the delete request*/
.delete((req, res, next) => {
    res.end("Deleting dish: " + req.params.dishId);
});


module.exports = dishRouter;