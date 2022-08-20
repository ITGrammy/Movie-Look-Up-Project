export default class Movie {
    constructor(){

    }

    //Create var/String holding HTML
      //h2 is the thing holding the title  that is coming back go into data(template literal and give me  the title)
      //p tag  is holding the year
      //img  tag gives you the poster for the movie displayed
    toHTML(data){
        //returns an  HTMLrep of the JSON data
        const movieTemplate = `
        <h2>${data.Title}</h2>
        <p>${data.Year}</p>
        <img src="${data.Poster}" alt= "poster image"/>
        <p>${data.Plot}</p>
        `;
        return movie.Template;
    }

    //givedata and it will  giveu the html
    
    like () {

        //notifies statemanager that it would like to 
        //save the movie  to the db
    }
    saveComment(){
        //updates  the comment  after the user has added 
        //some notes

    }
}