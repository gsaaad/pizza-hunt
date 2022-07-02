// create the variable for the database

let db;

// indexedDB is basically window.indexedDB. we add the database name, and the version of the database
// establish the database connection called 'pizza_hunt'
const request = indexedDB.open("pizza_hunt", 1);

// this event will emit if the database version changes.
request.onupgradeneeded = function (event) {
  // save a reference to the database

  const db = event.target.result;

  // create an object store (table) calling it 'new_pizza', and auto increment!

  db.createObjectStore("new_pizza", { autoIncrement: true });
};

//   upon a successful creation and connection....
request.onsuccess = function (event) {
  // when the database is successfully created with its object store( from onupgradeneeded) or simply established connection, save reference to db in global variable

  db = event.target.result;

  // check if app is online (network connection)
  // if yes =>run uploadPizza() and send all local DB to the api and save to main DB

  if (navigator.onLine) {
    //uploadPizza()
    console.log("WE ARE ONLINE");
  }
};
// if error
request.onerror = function (event) {
  // log error

  console.log(event.target.errorCode);
};

function saveRecord(recordData) {
  // open a nenw transaction with the database with read and write permissions

  const transaction = db.transaction(["new_pizza", "readwrite"]);

  //   access the object store for 'new_pizza'

  const pizzaObjectStore = transaction.objectStore("new_pizza");

  // add record to your store with add method

  pizzaObjectStore.add(recordData);
}
