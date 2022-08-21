//Component used to draw movie
import Movie from "./movie.js";

export default class MovieList {

  constructor(stateManager) {
    this.stateManager = stateManager;
    this.stateManager.subscribe('movie-found', this.drawMoviesToScreen.bind(this));
  }

  //Function draw movies to screen
  //when the server give back a movie result after user clicks screen
  drawMoviesToScreen(movieDataList) {
    console.log(movieDataList);
    //job of method to draw all  movies  to screen
    for (let i = 0; i < movieDataList.length; i++) {
        //When we create a new movie two things to pass in
      const movie = new Movie(this.stateManager, movieDataList[i]);

      const parentElement = document.querySelector (".movies");

      movie.attachMovieToDOM(parentElement);

      
    }
  }
}
