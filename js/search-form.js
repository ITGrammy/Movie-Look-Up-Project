
export default class SearchForm {
    constructor() {

    }



drawForm () {
//the job of this method is to display the form
const formTemplate =` <form>
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
<button id="go" type="submit">go</button>
</form>`
}

search () {
//job of this method is to send the search to (OMDB)cloud
}

dispayResults(){

}
}