/* all imports */
const http = require("http");
const fs = require("fs");
const path = require ("path");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    console.log("Request for " + req.url + " by method " + req.method);

    /*we will only service get requests */
    if (req.method == "GET") {
        var fileUrl;
        /* if you dont give a specific file name but send a request to local host 3000, it will default to the index.html*/
        if (req.url == "/") fileUrl = "/index.html";
        else fileUrl = req.url;

        /*finds the path of the file*/
        var filePath = path.resolve("./public" + fileUrl);
        /*examines the filename extension*/
        const fileExt = path.extname(filePath);
        if(fileExt == ".html") {
            /*checks if the file exists and if it does, it sends a callback function with "exists" as a parameter*/
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/html");
                    res.end("<html><body><h1>Error 404: " + fileUrl + " not found</h1></body></html>");

                    return;
                }
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                /*reads in the file from the file path and converts it to a stream of pipes, then inserts it into the body of the response*/
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end("<html><body><h1>Error 404: " + fileUrl + " not an HTML File</h1></body></html>");

            return;
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<html><body><h1>Error 404: " + req.method + " not supported</h1></body></html>");

        return;
    }
});

/*activates the server*/
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});