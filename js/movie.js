export default class Movie {
    //Setting global variable for this instance of movie data
  constructor(stateManager, movieData) {
    this.stateManager = stateManager;
    this.movieData = movieData;

  }

  //Create var/String holding HTML
  //h2 is the thing holding the title  that is coming back go into data(template literal and give me  the title)
  //p tag  is holding the year
  //img  tag gives you the poster for the movie displayed

  //Created and added movie to the DOM
  attachMovieToDOM(parentElement) {
    const html = this.toHTML(this.movieData);
    parentElement.insertAdjacentHTML("beforeend", html);

    //Target the right button by giving it a unique ID
    //Create an event listener
    const thumbsupButtonSelector = `#thumbsup_${this.movieData.imdbID}`;
        document.querySelector(thumbsupButtonSelector).addEventListener('click', this.thumbsUp.bind(this));


  }

  toHTML(data) {
    //returns an  HTMLrep of the JSON data
    const movieTemplate = `
        <h2>${data.Title}</h2>
        <p>${data.Year}</p>
        <img src="${data.Poster}" alt= "poster image"/>
        <p>${data.Plot}</p>

        <button class="thumbsup" id="thumbsup_${data.imdbID}">Thumbs Up</button>
        `;
    return movieTemplate;
  }

  //givedata and it will  giveu the html

  thumbsUp(ev) {
    //notifies statemanager that it would like to
    //save the movie to the db
    console.log('Thumbs up: add  to idb!');
    this.stateManager.notify('thumbsup-requested', this.movieData);

  }
  saveComment() {
    //updates  the comment  after the user has added
    //some notes
  }
}
