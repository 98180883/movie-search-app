const APi_Key =  OMDB_APi_Key;
let movieInfo = document.getElementById("movieinfo");

const params = new URLSearchParams(window.location.search);
const imdbID = params.get("id");
 

async function movieinfo() {
    const response = await fetch(
         `https://www.omdbapi.com/?i=${imdbID}&apikey=${APi_Key}`
    )
     const data = await response.json();
      rendermovieinfo(data);
}

function rendermovieinfo(movie) {
    movieInfo.innerHTML = `
    <div class="movie">
    <h2>${movie.Title}</h2>
    <img src="${movie.Poster}" width="300">
    <p><strong>Year : </strong>${movie.Year}</p>
    <p><strong>Type : </strong>${movie.Genre}</p>
    <p><strong>Description : </strong>${movie.Plot}</p>
    </div>
    `
}

movieinfo() ;