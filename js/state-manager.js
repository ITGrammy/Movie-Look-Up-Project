/* 
The state manager's job is to:
    (a) manage the application's data, 
    (b) notify components when critical changes have happened, and 
    (c) allow components to notify it that data has changed.
*/

export default class StateManager {
  constructor() {
    //Where data is stored and manipulated
    // initialize the data store.
    // This is our state. When anything changes
    // with any of these variables, we need to
    // notify our components:
    this.movies = [];
    this.searchResults = [];
    this.favorites = [];
    this.subscribers = [];
    //list of data
    //allows components to listen to changes in state
    this.searchMode = true;
    this.showNotes = true;
  }
  //A method to read a user's favorites from IndexedDB when the page first loads.
  loadFavorites() {
    //reads IndexDB, stores  data
    //to this.fav, and notifies
    //other components
  }
  //A method to add a new movie to the user's favorites and save it to IndexedDB.
  saveNovieToFavories(movieData) {
    // appends the new movieto this.fav and
    //stores in DB
  }
  //A method to notify components that something has changed.
  notify(eventName) {
    //loops thru all the subscribers
    //invokes corresponding function
    //in specific event

    for (let i = 0; i < this.subscribers.length; i++) {
      const subscriber = this.subscribers[i];
    //looking 
      const subscriberEvent = subscriber[0];
      const callbackFunction = subscriber[1];

      //is the event fired somnthatthe subscriber wants
      if (eventName == subscriberEvent){
        callbackFunction(data);
      }
    }
  }

  subscriber(eventName, callbackFunction) {
    //here when component wants to subscr to SM
    //they need to tell  the SM which event interested  in
    //also, what should happen if thtevent is fired(callback  Function)
    //component listens to somn happening redraws
    this.subscribers.push([eventName, callbackFunction]);
    //asks for datalist
    //keeping trackof what component wants to do once an event happens
  }
}
