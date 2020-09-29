/*encapsulates all the database operations*/
/*organized as a file based node module*/
const assert = require("assert");

/*takes in 4 paramaters: db (the mongoDB database connection within the node application), document (the document that we want to insert), collection (where we will insert the document), callback (a callback function that will be called when the code is completed)*/
exports.insertDocument = (db, document, collection, callback) => {
    /*looks for the collection*/
    const coll = db.collection(collection);
    
    /*inserts a document with a callback*/
    /*the insert method is supported by the mongodb driver*/
    coll.insert(document, (err, result) => {
        assert.equal(err, null);

        /*logs the information*/
        /*the result object has a property called result, which has a value (is also a javascript object) called n, which tells us how many documents have been inserted*/
        console.log("Inserted " + result.result.n + " documents into the collection " + collection);
        callback(result);
    });
};

/*looks for the collection*/
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);

        /*passes back the retrieved documents to the calling function*/
        callback(docs);
    });
};

/*removes a document*/
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);

    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);

        /*the comma is used her because it is a javascript object. It allows the document to be printed out*/
        console.log("Removed the document ", document);
        callback(result);
    });
};

/*updates the document*/
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);

    /*update takes the update information being sent as a parameter of the exports.updateDocument method and passes it into coll.updateOne*/
    /*the $set refers to the document being referred to*/
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.equal(err, null);

        console.log("Updated the document with ", update);
        callback(result);
    });
};