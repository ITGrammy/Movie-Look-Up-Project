//Db variable and initialized db w/name and version
let db;
let dbReq = indexedDB.open('myDatabase', 2);

//Initializing the two tables
dbReq.onupgradeneeded = function(event) {
    db = event.target.result;
    db.createObjectStore('notes', {autoIncrement: true});
    db.createObjectStore('favorites', {autoIncrement: true});
  }
//Stores results in db
  dbReq.onsuccess = function(event) {
    db = event.target.result;
  }
//error handling
  dbReq.onerror = function(event) {
    alert('error opening database ' + event.target.errorCode);
  }
//Takes care of addding note to the database
 export function addNote(message) {
    // Start a database transaction and get the notes object store
    let tx = db.transaction(['notes'], 'readwrite');
    let store = tx.objectStore('notes');
    // Put the sticky note into the object store
    store.add(message);
    // Wait for the database transaction to complete
    tx.oncomplete = function() { console.log('stored note!') }
    tx.onerror = function(event) {
      alert('error storing note ' + event.target.errorCode);
    }
 }
 //Takes in the favorite obj and store in the db
    export function addFavorite(message) {
        // Start a database transaction and get the notes object store
        let tx = db.transaction(['favorites'], 'readwrite');
        let store = tx.objectStore('favorites');
        // Put the sticky note into the object store
        store.add(message);
        // Wait for the database transaction to complete
        tx.oncomplete = function() { console.log('stored note!') }
        tx.onerror = function(event) {
          alert('error storing note ' + event.target.errorCode);
        }
    }