function getwishlist(){
return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist){
   localStorage.setItem("wishlist", JSON.stringify(wishlist));
}




const searchBtn = document.getElementById("searchBtn");
const moviesDiv = document.getElementById("movies");
let message_search = document.getElementById("message");
let trendingMovie = document.getElementById("trending");

 const APi_Key = "efa2841b";  


//toggle slider (laptop view)
function toggleSearchSlider(show) {
  const left = document.getElementById("searchLeft");
  const right = document.getElementById("searchRight");

  left.classList.toggle("show", show);
  right.classList.toggle("show", show);
}
//trending
async function trending(){
   try{
     const response = await fetch(`https://www.omdbapi.com/?s=${"India"}&apikey=${APi_Key}`);
     const data = await response.json();
     console.log(data); 
     if(data.Response==="True"){
      renderMovies(data.Search , trendingMovie);
     
       
     }
     else{
   trendingMovie.innerHTML="";
   
     }
    }
    catch (error) {
    console.error(error);
  }
}
trending();




//on search find
async function search() {
const query = document.getElementById("searchInput").value.trim();
 
    if(!query){
        message_search.innerText="Please enter movie name";
        return;
        
        }
       
        message_search.innerText="Loading ! please wait";
        moviesDiv.innerHTML="";

   try{
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${APi_Key}`);
     const data = await response.json();
    console.log(data); 
     if(data.Response==="True"){
         message_search.innerText=" ";
       renderMovies(data.Search , moviesDiv);
      toggleSearchSlider(true);
     }
     else{
       message_search.innerText="No Movies Found";
       moviesDiv.innerHTML="";       
     }
    }
    catch (error) {
    message_search.innerText = "Something went wrong";
    console.error(error);
  }
}

searchBtn.addEventListener("click" , search);


//render function
function renderMovies(movies, container) {
  const wishlist = getwishlist(); // read once

  container.innerHTML = movies.map(movie => {
    const alreadyAdded = wishlist.some(m => m.id === movie.imdbID);

    return `
      <div class="movie" data-id="${movie.imdbID}">
        <img
          src="${movie.Poster}"
          alt="${movie.Title}"
          onerror="this.onerror=null; this.src='placeholder.jpg';"
        />
        <h3 id="title">${movie.Title}</h3>
        <p>${movie.Year}</p>

        <div class="buttons">
        <button class="favourite-btn"
          data-id="${movie.imdbID}"
          data-title="${movie.Title}"
          data-year="${movie.Year}"
          data-poster="${movie.Poster}"
          ${alreadyAdded ? "disabled" : ""}
        >
          ${alreadyAdded ? "✅ Added To Wishlist" : "❤️ Favourite"}
          ${alreadyAdded ? `
 
` : ""}

        </button>

         ${alreadyAdded ? `
  <button class="del-favourite-btn" data-id="${movie.imdbID}">
    🗑 Remove
  </button>
` : ""}
  </div>
      </div>
    `;
  }).join("");

  // ❤️ button click
  container.querySelectorAll(".favourite-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();

      const movie = {
        id: btn.dataset.id,
        title: btn.dataset.title,
        year: btn.dataset.year,
        poster: btn.dataset.poster
      };

      const wishlist = getwishlist();

      if (wishlist.some(m => m.id === movie.id)) return;

      wishlist.push(movie);
      saveWishlist(wishlist);

      btn.innerText = "✅ Added To Wishlist";
      btn.disabled = true;
      btn.style.cursor = "not-allowed";
       renderMovies(movies, container);
    });
  });


  //del button
container.querySelectorAll(".del-favourite-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();

      const movie = {
        id: btn.dataset.id,
       
      };

      const wishlist = getwishlist();

      if (wishlist.length===0) return;

    const updatedWishlist = wishlist.filter(m => m.id !== movie.id);
   saveWishlist(updatedWishlist);


   
       renderMovies(movies, container);
      
    });
  });


  // movie card click
  container.querySelectorAll(".movie").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = `movie.html?id=${card.dataset.id}`;
    });
  });
}

//keyboard support
document.addEventListener("keydown", (e) =>{
  //e.preventDefault();
    if(e.key==="Enter"){
      search();
        return;
    }
});



// how much to slide per click
function attachSlider(leftBtn, rightBtn, container) {


  rightBtn.onclick = () =>
    container.scrollBy({ left: 300, behavior: "smooth" });

  leftBtn.onclick = () =>
    container.scrollBy({ left: -300, behavior: "smooth" });
}

//trending slide 
attachSlider(
   document.getElementById("trendLeft"),
  document.getElementById("trendRight"),
  document.getElementById("trending")
)
//searched slider
attachSlider(
 document.getElementById("searchLeft"),
  document.getElementById("searchRight"),
  document.getElementById("movies")
)
