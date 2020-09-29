/*imports the mongodb node module and the .MongoClient enables us to connect to the server*/
const MongoClient = require("mongodb").MongoClient;
/*imports the assert module*/
const assert = require("assert");
/*since it is a file based node module, we have to give the full path to the node module*/
/* it has to be ./operations because it is in the same folder as the index.js file*/
const dboper = require("./operations2");

/*this index.js uses promises*/
/*the url where the mongodb server can be accessed*/
const url = "mongodb://localhost:27017/";
/*we created the conFusion server in the past*/
const dbname = "conFusion";

/*this code accesses the server*/
/*the connect method allows us to connect to the mongo client from our mongodb server*/
/*takes the mongodb url as the 1st parameter*/
/*the 2nd parameter is a callback function that takes in paramaters: error value and client, which we can use to connect to the database and perform various operations*/
MongoClient.connect(url).then((client) => {
    /*if there is no error, will output:*/
    console.log("Connected correctly to server");

    /*used to connect to the database*/
    const db = client.db(dbname);
    
    /*instead of the code below, we can use dboper*/
    /*the structure is a set of nested operations*/
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes")
    .then((result) => {
        /*ops says how many insert operations that were carried out*/
        console.log("Insert Document:\n", result.ops);

        /*the find method is inside the insert documents*/
        return dboper.findDocuments(db, "dishes");
    })
    .then((docs) => {
        /*prints out the found documents*/
        console.log("Found Documents:\n", docs);

        /*we dont have to specify the whole field, we can only specify one (e.g., {name: "Vadonut"})*/
        return dboper.updateDocument(db, {name: "Vadonut"}, { description: "Updated Test"}, "dishes");
    })
    .then((result) => {
        console.log("Updated Document:\n", result.result);

        return dboper.findDocuments(db, "dishes");
    })
    .then((docs) => {
        console.log("Found updated document:\n", docs);

        return db.dropCollection("dishes");
    })
    .then((result) => {
        console.log("Dropped Collection: ", result);

        /*We only do this to start the next exercise with a cleaner database*/
        return client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));