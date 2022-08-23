//This file is in charge of building the form
import apiKey from "./key.js";
export default class SearchForm {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  drawForm() {
    //the job of this method is to display the form
    const formTemplate = ` <form>
    <h1>Mo's Movie Search Site</h1> <br><br>

    <label class="control-label" for="image"></label>
    <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80" alt="movie theater pic" width="300" height="400">
    
    <br><br>

<label class="control-label" for="title">Title:</label>

<input
  type="text"
  placeholder="Title of the movie"
  id="title"
  required="required"
/><br />
<label class="control-label" for="plot">Plot:</label>

<select name="plot" id="plot" style="width: 100px">
  <option value="" selected="">Short</option>
  <option value="full">Full</option>
</select>
<br />
<label class="control-label" for="year">Year: </label>

<input
  type="number"
  placeholder="Year"
 
  minlength="4"
  ,
  maxlength="4"
  id="year"
/><br />
<br><br>
<button id="Go" type="submit" class="pinkify">Go</button>
<button id="reset" class="pinkify">Reset</button>
<button id="show-me-the-favorites" class="pinkify">Show Me The Favorites</button>
</form>`;

    //go find form template and put it here
    document.querySelector(".formContainer").innerHTML = formTemplate;
    document
      .querySelector("form")
      .addEventListener("submit", this.search.bind(this));
    document
      .querySelector("#reset")
      .addEventListener("click", this.clearScreen.bind(this));
      document
      //When user clicks invoke the load favvo method
      .querySelector("#show-me-the-favorites")
      .addEventListener("click", this.loadFavorites.bind(this));
  }

  search(ev) {
    //job of this method is to send the search to (OMDB)cloud
    //When user clicks it will prevent normal refresh
    ev.preventDefault();
    console.log("Search!");

    //<img
    const title = document.querySelector("#title").value;
    const year = document.querySelector("#year").value;
    const plot = document.querySelector("#plot").value;
    const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}&apikey=${apiKey}`;

    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then(
        ((data) => {
          //Once form gets info it will notify SM a movie is found
          console.log(data);
          //processes data found
          console.log(this);
          this.stateManager.notify("movie-found", [data]);
        }).bind(this)
      );
  }
  clearScreen(ev) {
    ev.preventDefault();
    document.querySelector("#title").value = "";
    document.querySelector("#year").value = "";
    this.stateManager.notify("clear-everything");
  }

  loadFavorites(ev) {
    ev.preventDefault();
    this.stateManager.loadFavorites();
  }
}
