var movieElement = document.getElementById("movie");
var searchbtnElement = document.getElementById("search-btn");
let movieContainerElement = document.getElementById("movie-container");
var movieStatusElement = document.getElementById("movie-status");

searchbtnElement.addEventListener("click", function() {
    movieContainerElement.innerHTML = " ";
    movieStatusElement.innerText = "Loading..... ";
    let movieName = movieElement.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            movieContainerElement.innerHTML = " ";
            movieStatusElement.innerText = " ";

            let movieResult = JSON.parse(this.responseText);
            console.log(movieResult);
            if (movieResult.Response == "True") {
                let movies = movieResult.Search;
                movies.map((item, i) => {
                    console.log(item);
                    movieContainerElement.innerHTML += `
                    <div class="movie-cards">
                        <img 
                        class="movie-poster"
                        src=${item.Poster}
                        />
                        <p><b>Name: </b>${item.Title}</p>
                        <p><b>Year: </b>${item.Year}</p>
                        <p><b>Type: </b>${item.Type}</p>
                    </div>
                    `;
                });
            } else {
                movieStatusElement.innerText = "404 Movies Not Found!!!!!";
            }
        }
    };
    xhttp.open("GET", `https://www.omdbapi.com/?apikey=45f0782a&s=${movieName}`, true);
    xhttp.send();
});
