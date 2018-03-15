(function(document){
    let mykey = config.KEY_OMDB;
    let mainHolder = document.getElementById('main-holder');
    let searchBoxHolder = document.getElementById('search-box');

 function addListener(selector, eventName, callback) {
     document.getElementById(selector).addEventListener(eventName, callback);
}

function fetchOneMovieData(id){

 //   http://www.omdbapi.com/?i=tt3896198&apikey=92ebbf53

    let url = "https://www.omdbapi.com/?i=" + id + "&apikey=" + mykey;
    logicFunctions.makeCall(url, function(response){
        console.log(response);
        displayDetailedResults(response);
    });
}

function fetchAllMoviesData(keyword, page){
    let url = "https://www.omdbapi.com/?s=" + keyword + "&page=" + page + "&apikey=" + mykey;
    logicFunctions.makeCall(url, function(response){
        displayResults(response.Search);
    });
}
addListener('submit-button', 'click', function(event){
    event.preventDefault();
    let keyword = searchBoxHolder.value;
    fetchAllMoviesData(keyword, 1);
});

function displayResults(moviesArray) {
    console.log(moviesArray);
    while (mainHolder.firstChild) {
        mainHolder.removeChild(mainHolder.firstChild);
    }
    moviesArray.forEach(function(movie) {
        let movieHolder = document.createElement('div');
        let posterHolder = document.createElement('img');
        let titleHolder = document.createElement('p');
        let posterURL = movie.Poster;
        posterHolder.src = posterURL;
        posterHolder.addEventListener("click", function(e){
            fetchOneMovieData(movie.imdbID);
        })
        movieHolder.appendChild(posterHolder);
        movieHolder.appendChild(titleHolder);
        mainHolder.appendChild(movieHolder);
    });
}

function displayDetailedResults(response){
    while (mainHolder.firstChild) {
        mainHolder.removeChild(mainHolder.firstChild);
    }
    let cleanJSON = logicFunctions.cleanJSON(response);
    console.log(logicFunctions.cleanJSON(response));
    let contentHolder = document.createElement('div');
    contentHolder.innerHTML = designFunctions.pageCreator(cleanJSON);
    contentHolder.setAttribute("class", "content-holder");
    
    // let imageHolder = document.createElement('div');
    // let imageContent = document.createElement('img');
    // let titleHolder = document.createElement('h2');
    // titleHolder.textContent = response.Title;
    // let posterURL = response.Poster;
    // imageContent.src = posterURL;
    // contentHolder.appendChild(titleHolder);
    // contentHolder.appendChild(imageContent);
    
    mainHolder.appendChild(contentHolder);
}

})(document);