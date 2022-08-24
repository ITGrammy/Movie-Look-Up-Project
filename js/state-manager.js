/* 
The state manager's job is to:
    (a) manage the application's data, 
    (b) notify components when critical changes have happened, and 
    (c) allow components to notify it that data has changed.
    //Saves fav everytime it loads
*/
import Database from "./database.js";
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
    this.database = new Database();
    //when the page loads query and let app  run
    this.loadFavorites();

    //Adding function call whenever someone thumbs up request comes
    //in it will save movie to favo
    this.subscribe("thumbsup-requested", this.saveMovieToFavorites.bind(this));
    this.subscribe("movie-found", this.setSearchResults.bind(this));
    this.subscribe('favorites-loaded', this.setFavorites.bind(this));
    this.subscribe('show-notes', this.toggleNotes.bind(this));
    this.subscribe('save-requested', this.saveMovieToFavorites.bind(this));
  }
 
  setSearchResults(movieDataList) {
    this.searchResults = movieDataList;
    this.movies = this.searchResults;
  }

  setFavorites(movieDataList) {
    this.favorites = movieDataList;
    this.movies = this.favorites;
  }

  toggleNotes(val){
    this.showNotes= val;
    this.notify('redraw', this.movies);
  }


  //A method to read a user's favorites from IndexedDB when the page first loads.
  loadFavorites() {
    //reads IndexDB, stores  data
    //to this.fav, and notifies
    //other components

    //Defining what will happen
    //Create cb function will fire after loading all the favorites
    const callbackFunction = function (movieDataList) {
      this.notify("favorites-loaded", movieDataList);
    };

  


    //Invoke  the "getAll" method, with the cb function
    //as an argument. When getAll finishes loading the fav,
    //it will  fire cb  function w/fav
    this.database.getAll(callbackFunction.bind(this));
    //another line of code here...
  }
  //A method to add a new movie to the user's favorites and save it to IndexedDB.
  saveMovieToFavorites(movieData) {
    console.log("I am finna save to idb");
    console.log(movieData);
    // appends the new movieto this.fav and
    //stores in DB
    this.database.addOrUpdate(movieData, function () {
      console.log("We in Here!");
    });
  }
  //A method to notify components that something has changed.
  notify(eventName, data) {
    //loops thru all the subscribers
    //invokes corresponding function
    //in specific event

    for (let i = 0; i < this.subscribers.length; i++) {
      const subscriber = this.subscribers[i];
      //looking
      const subscriberEvent = subscriber[0];
      const callbackFunction = subscriber[1];

      //is the event fired somnthatthe subscriber wants
      if (eventName == subscriberEvent) {
        callbackFunction(data);
      }
    }
  }

  subscribe(eventName, callbackFunction) {
    //here when component wants to subscr to SM
    //they need to tell  the SM which event interested  in
    //also, what should happen if thtevent is fired(callback  Function)
    //component listens to somn happening redraws
    this.subscribers.push([eventName, callbackFunction]);
    //asks for datalist
    //keeping trackof what component wants to do once an event happens
  }
}
