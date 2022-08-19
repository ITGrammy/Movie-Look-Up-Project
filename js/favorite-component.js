import { addFavorite } from "./connection";
import Form from "./form-component";
import StateManager from "./state-manager";
const stateManager = new StateManager();
import {apiKey} from "./key"

export default class Favorite {
  favoriteArray = [];;
  constructor() {
    //Created a favorite template to divide code
    const formTemplate = `
        <form>
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
            required="required"
            minlength="4"
            ,
            maxlength="4"
            id="year"
          /><br />
          <button id="submit" type="submit">go</button>
        </form>   
        `;
//Putting the form into the website
    document.querySelector(".form-container").innerHTML = formTemplate;
    //appends to the DOM says go find the "form container" does search function
    document
      .querySelector("form")
      .addEventListener("submit", this.search.bind(this));
    //adds event listener when user clicks submit add comment
  }
//Search function
  search = (ev) => {
    ev.preventDefault();
    const title = document.querySelector("#title").value;
    const year = document.querySelector("#year").value;
    const plot = document.querySelector("#plot").value;
    const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}&apikey=${apiKey}`;

    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const parent = document.querySelector(".movie-details");
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
        //Create var/String holding HTML
        //h2 is the thing holding the title  that is coming back go into data(template literal and give me  the title)
        //p tag  is holding the year
        //img  tag gives you the poster for the movie displayed
        //template takes in the data from the url
        const movieTemplate = `
          
        <h2>${data.Title}</h2>
        <p>${data.Year}</p>
        <img src="${data.Poster}" alt= "poster image"/>
        <p>${data.Plot}</p>
        
        `;           




        

        //Target information  or Movie  Details by adding to the DOM
        document
          .querySelector(".movie-details")
          .insertAdjacentHTML("afterend", movieTemplate);
        // here we are targeting the #movie-details element and
        // adding the html to the end of the element:
        //what to display: created h2 template to bring back whatever title sought
        //where to inject what is displayed
        const form = new Form()
        console.log(data.Title);
        console.log(data.Poster);
        document.getElementById("favorite").addEventListener("click" , stateManager.submitFavorite(data))
      });
  };





  

}
