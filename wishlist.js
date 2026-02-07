

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

const wishlistDiv = document.getElementById("wishlist");

//render wishlist
function renderWishlist() {
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    wishlistDiv.innerHTML = "<p>Your wishlist is empty</p>";
    return;
  }

  wishlistDiv.innerHTML = wishlist.map(movie => `
    <div class="movie">
      <img src="${movie.poster}" width="200">
      <h3>Title : ${movie.title}</h3>
      <p>Year : ${movie.year}</p>
    </div>
  `).join("");
}


renderWishlist();
