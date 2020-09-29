/*imports the mongodb node module and the .MongoClient enables us to connect to the server*/
const MongoClient = require("mongodb").MongoClient;
/*imports the assert module*/
const assert = require("assert");
/*since it is a file based node module, we have to give the full path to the node module*/
/* it has to be ./operations because it is in the same folder as the index.js file*/
const dboper = require("./operations");

/*the url where the mongodb server can be accessed*/
const url = "mongodb://localhost:27017/";
/*we created the conFusion server in the past*/
const dbname = "conFusion";

/*this code accesses the server*/
/*the connect method allows us to connect to the mongo client from our mongodb server*/
/*takes the mongodb url as the 1st parameter*/
/*the 2nd parameter is a callback function that takes in paramaters: error value and client, which we can use to connect to the database and perform various operations*/
MongoClient.connect(url, (err, client) => {
    /*checks to see if the error is equal to none*/
    /*if it is not null, that means there is an error, and we will show an error on the screen*/
    assert.equal(err, null);

    /*if there is no error, we will output:*/
    console.log("Connected correctly to server");

    /*used to connect to the database*/
    const db = client.db(dbname);
    
    /*instead of the code below, we can use dboper*/
    /*the structure is a set of nested operations*/
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes", (result) => {

        /*ops says how many insert operations that were carried out*/
        console.log("Insert Document:\n", result.ops);

        /*the find method is inside the insert documents*/
        dboper.findDocuments(db, "dishes", (docs) => {

            /*prints out the found documents*/
            console.log("Found Documents:\n", docs);

            /*we dont have to specify the whole field, we can only specify one (e.g., {name: "Vadonut"})*/
            dboper.updateDocument(db, {name: "Vadonut"}, { description: "Updated Test"}, "dishes", (result) => {
                console.log("Updated Document:\n", result.result);

                dboper.findDocuments(db, "dishes", (docs) => {
                    console.log("Found updated document:\n", docs);

                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);

                        /*We only do this to start the next exercise with a cleaner database*/
                        client.close();
                    });
                });
            });
        });
    });
    /*
    tries to access the dishes collection within the database
    const collection = db.collection("dishes");

    collection allows us to use the insertOne method, which inserts 1 document into the collection
    the document is the first argument, while the 2nd argument is the callback function
    collection.insertOne({"name": "Uthappizza", "description": "test"}, (err, result) => {
        if the result is obtained, we are able to access the collection and perform certain operations
        assert.equal(err, null);

        console.log("After Insert:\n");
        the result value which is returned, provides the ops property, which says how many operations have been carried on successfully
        console.log(result.ops);

        the find operation searches for everything that is in the collection
        the to array method converts all the json into an array, which takes in a callback function
        
        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);

            prints out whatever will be found
            console.log("Found:\n");
            returns all the documents in the collection that is specified
            console.log(docs);

            deletes the collection
            db.dropCollection("dishes", (err, result) => {
                assert.equal(err, null);

                closes connection to database
                client.close();
            });
        });
    });
    */
});