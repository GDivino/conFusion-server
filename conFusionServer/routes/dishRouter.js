const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Dishes = require("../models/dishes");

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route("/")
/*prof fucken made us delete this code but i dont wanna waste effort and time copying this so im gonna leavet his here
when a request(any request) comes in for the /dishes rest API endpoint, this code will be executed
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    continues to look for additional specifications down below to match the dishes endpoint
    next();
})
*/
/* handles the get request*/
.get((req, res, next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));

    /*I also have to comment this out bc this dude is a fucken bitch*/
    /*res.end("Will send all the dishes to you")*/
})

/*handles the post request*/
.post((req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log("Dish Created", dish);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));

    /*also have to comment this out
    res.end("Will add the dish: " + req.body.name + " with details: " + req.body.description)
    */
})

/*handles the put reques*/
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
})

/*handles the delete request*/
.delete((req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));

    /*also have to comment this out
    res.end("Deleting all the dishes");
    */
});


dishRouter.route("/:dishId")
/*same process as the earlier dish router, this has to be commented out
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})
*/
/*handles the get request*/
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
    }, (err) => next(err)).catch((err) => next(err));

    /*
    res.end("Will send details of the dish: " + req.params.dishId + " to you");
    */
})

/*handles the post request*/
.post((req, res, next) => {
    req.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId); 
})

/*handles the put request*/
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));

    /*
    used to add a line inside the body
    res.write("Updating the dish: " + req.params.dishId + "\n");
    res.end("Will update the dish: " + req.body.name + " with details: " + req.body.description);
    */
})

/*handles the delete request*/
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));

    /*
    res.end("Deleting dish: " + req.params.dishId);
    */
});

dishRouter.route("/:dishId/comments")
/*prof fucken made us delete this code but i dont wanna waste effort and time copying this so im gonna leavet his here
when a request(any request) comes in for the /dishes rest API endpoint, this code will be executed
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    continues to look for additional specifications down below to match the dishes endpoint
    next();
})
*/
/* handles the get request*/
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish.comments);
        }
        else {
            err = new Error("Dish " + req.params.dishId + " not found");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));

    /*I also have to comment this out bc this dude is a fucken bitch*/
    /*res.end("Will send all the dishes to you")*/
})

/*handles the post request*/
.post((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null) {
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(dish);
            }, (err) => next(err));
        }
        else {
            err = new Error("Dish " + req.params.dishId + " not found");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));

    /*also have to comment this out
    res.end("Will add the dish: " + req.body.name + " with details: " + req.body.description)
    */
})

/*handles the put reques*/
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes" + req.params.dishId + " /comments");
})

/*handles the delete request*/
.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null) {
           for (var i = (dish.comments.length - 1); i >=0; i--) {
               dish.comments.id(dish.comments[i]._id).remove();
           }
           dish.save()
           .then((dish) => {
               res.statusCode = 200;
               res.setHeader("Content-type", "application/json");
               res.json(dish);
           }, (err) => next(err));
        }
        else {
            err = new Error("Dish " + req.params.dishId + " not found");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));

    /*also have to comment this out
    res.end("Deleting all the dishes");
    */
});


dishRouter.route("/:dishId/comments/:commentId")
/*same process as the earlier dish router, this has to be commented out
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})
*/
/*handles the get request*/
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish.comments.id(req.params.commentId));
        }
        else if(dish == null) {
            err = new Error("Dish " + req.params.dishId + " not found");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error("Comment " + req.params.commentId + " not found");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err)).catch((err) => next(err));

    /*
    res.end("Will send details of the dish: " + req.params.dishId + " to you");
    */
})

/*handles the post request*/
.post((req, res, next) => {
    req.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId + "/comments/" + req.params.commentId); 
})

/*handles the put request*/
.put((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null) {
            if(req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if(req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(dish);
            }, (err) => next(err));
        }
        else if(dish == null) {
            err = new Error("Dish " + req.params.dishId + " not found");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error("Comment " + req.params.commentId + " not found");
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err)).catch((err) => next(err));

    /*
    used to add a line inside the body
    res.write("Updating the dish: " + req.params.dishId + "\n");
    res.end("Will update the dish: " + req.body.name + " with details: " + req.body.description);
    */
})

/*handles the delete request*/
.delete((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(dish);
            }, (err) => next(err));
        }
        else if(dish == null) {
            err = new Error("Dish " + req.params.dishId + " not found");
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error("Comment " + req.params.commentId + " not found");
            err.status = 404;
            return next(err);
        }
    })
    /*
    res.end("Deleting dish: " + req.params.dishId);
    */
});


module.exports = dishRouter;