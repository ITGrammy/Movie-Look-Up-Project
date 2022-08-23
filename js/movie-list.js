//Component used to draw movie
import Movie from "./movie.js";

export default class MovieList {

  constructor(stateManager) {
    this.stateManager = stateManager;
    this.stateManager.subscribe('movie-found', this.drawMoviesToScreen.bind(this));
    this.stateManager.subscribe('favorites-loaded', this.drawMoviesToScreen.bind(this));
    this.stateManager.subscribe('clear-everything', this.clear.bind(this));
    this.stateManager.subscribe('redraw', this.drawMoviesToScreen.bind(this));
  }

  //Function draw movies to screen
  //when the server give back a movie result after user clicks screen
  drawMoviesToScreen(movieDataList) {
    console.log(movieDataList);
    this.clear();
    const parentElement = document.querySelector (".movies");
    //job of method to draw all  movies  to screen
    for (let i = 0; i < movieDataList.length; i++) {
        //When we create a new movie two things to pass in
      const movie = new Movie(this.stateManager, movieDataList[i]);

      

      movie.attachMovieToDOM(parentElement);

      
    }
    //adding the show notes button to the top
    let buttonText = "My Notes";
    if(this.stateManager.showNotes) {
      buttonText = "Hide Notes";
    }

    const buttonHTML = `<button id="show_notes">${buttonText}</button>`;
    parentElement.insertAdjacentHTML('afterbegin', buttonHTML)

    document.querySelector(`#show_notes`).addEventListener('click', this.toggleNotes.bind(this));
  }

  toggleNotes(ev) {
    ev.preventDefault();
    const btn = document.querySelector(`#show_notes`);
    if(this.stateManager.showNotes) {
      
      this.stateManager.notify('show-notes', false);
      //notify the sm

    } else{
      //notify the sm
      
      this.stateManager.notify('show-notes', true);
    }
  }

  //This function will clear all selections
  clear() {
    document.querySelector('.movies').innerHTML =""
  }
}
