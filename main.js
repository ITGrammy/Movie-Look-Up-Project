import "./style.css";
import {apiKey} from './key.js';

document.querySelector("#app").innerHTML = `
  <h1>Movie Lookup Site</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
const search = (ev) => {
  ev.preventDefault();
  const title = document.querySelector("#title").value;
  const year = document.querySelector("#year").value;
  const plot= document.querySelector("#plot").value;
  const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}=full&apikey=${apiKey}`;

  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const parent = document.querySelector("#movie-details");
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
      //Create var/String holding HTML
      //h2 is the thing holding the title  that is coming back go into data(template literal and give me  the title)
      //p tag  is holding the year
      //img  tag gives you the poster for the movie displayed
      const movieTemplate = `
    
  <h2>${data.Title}</h2>
  <p>${data.Year}</p>
  <img src="${data.Poster}" alt= "poster image"/>
  <p>${data.Plot}</p>
  
  `;
      //Target information  or Movie  Details by adding to the DOM
      document
        .querySelector("#movie-details")
        .insertAdjacentHTML("beforeend", movieTemplate);
      // here we are targeting the #movie-details element and
      // adding the html to the end of the element:
      //what to display: created h2 template to bring back whatever title sought
      //where to inject what is displayed

      console.log(data.Title);
      console.log(data.Poster);
    });
};

document.querySelector("form").addEventListener("submit", search);
