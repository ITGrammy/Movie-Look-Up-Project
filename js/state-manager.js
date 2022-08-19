//When using functions from other files import here
import { addNote, addFavorite } from "./connection";

import { apiKey } from "./key";

/*

The job of the state manager is to: 
    1. + organize the data.
    2. update the data when a component notifies the state manager.
    3. let other components know when the data has changed.


Each comment has:
    1. Name of the person
    2. Email
    3. Comment
    4. Timestamp
*/

export default class StateManager {
  constructor() {}
  //This function will  data to db
  //This gets value from HTML adds to obj and adds note
  //NoteElement gets input from the user
  submitNote() {
    let noteElement = document.getElementById("note").value;
    let note = { note: noteElement };
    addNote(note);
  }

//Needed to grab data from the url
  submitFavorite(data) {
    let title = data.Title
    let plot = data.Plot
    let year = data.Year
    let favorite = { title: title, plot: plot, year: year,  api: apiKey };

    addFavorite(favorite)


  }
}

