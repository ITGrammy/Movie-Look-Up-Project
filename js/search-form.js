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
<button id="go" type="submit">go</button>
</form>`;

    //go find form template and put it here
    document.querySelector(".formContainer").innerHTML = formTemplate;
    document.querySelector("form").addEventListener("submit", this.search.bind(this));
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
      .then(((data) => {
        //Once form gets info it will notify SM a movie is found
        console.log(data);
        //processes data found
        console.log(this);
        this.stateManager.notify('movie-found', [data]);
      }).bind(this));
  }
  dispayResults() {}
}
