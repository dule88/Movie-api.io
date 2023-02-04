const btnSearch = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
const resultOfSearch = document.querySelector('#resaultContainer');
const cartElement = document.querySelector('#modalListContent');
// const leftElement = document.querySelector('.left');
// const rightElement = document.querySelector('.right');
const currentPageElement = document.querySelector('.searchPagination');



let currentPage = 1;
let prevPage = 0;
let nextPage = 2;

//Posible API answers
let movieState = [];
let cartMovies = [];
let totalResults = 0;

let lastPage = Math.floor(totalResults / 10);


const setMovieState = (list) => {
  movieState = [...list];
}

const setCartMovies = (list) => {
  cartMovies = [...list];
}

// const setCurrentPage = (num)  => {
//   currentPage = num;
// }


// Event listener for searching the movies
  btnSearch.addEventListener('click', () => {
      
      fetchMovie();

        
      });

      // function for fetching the movies from API
      const fetchMovie = () => {
        // currentPageElement.value = currentPage;
        fetch( `https://www.omdbapi.com/?apikey=56e00a84&s=${searchInput.value}` )
        .then(res => res.json())
        .then(movies => {
          setMovieState(movies.Search);
          render();
        	
        })
        .catch(err => console.log(err));

      }

// function for rendering the result search of Movies
      const render = () => {

        resultOfSearch.innerHTML = '';

        movieState.forEach((movie, idx) => {
          resultOfSearch.innerHTML += 
          `<div class="col text-white py-4">
            <div class="card bg-dark" style="width: 19rem; height:100%;">
              <img src=${movie.Poster} class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">Year: ${movie.Year} Type: ${movie.Type}</p>
                <a class="btn btn-outline-success" onClick="add(${idx})">Add to cart</a>
              </div>
            </div>
          </div>`;
        });
      }

// Function for adding movies into the cart
      const add = (idx) => {
        setCartMovies([...cartMovies, movieState[idx]]);
        render();
        cartRender();
        
      }

// Function for rendering Movies into the cart
      const cartRender = () => {

        cartElement.innerHTML = '';

        cartMovies.forEach((movie, idx) => {
          cartElement.innerHTML += 
          `
                <div class="">
                    <div class="movie__card d-flex mb-3">
                        <img src=${movie.Poster} alt=${movie.Title} style="height: 220px;">

                        <div>
                            <ul class="list-group list-group-flush border-dark" >
                                <li class="list-group-item text-bg-dark fs-6 border-dark text-white-50 py-1 pe-0 pt-0">Title: <span class="text-white">${movie.Title}</span> </li>
                                </li>
                                <li class="list-group-item text-bg-dark fs-6 border-dark text-white-50 py-1 pe-0">Year: <span class="text-white">${movie.Year}</span></li>
                              
                            </ul>
                        </div>

                    </div>

                    <span class="text-danger me-2" type="button" onclick=deletefunction(${idx})><i class="bi bi-trash3 fs-5 pointer"></i></span>
                </div>
                <hr class="text-bg-dark mb-4">
            `
        });
      }

      // // Function for deleting movies from the cart
      const deletefunction = (idx) => {
        let temp = [...cartMovies];
        temp.splice(idx, 1);
        setCartMovies(temp);
        cartRender();
      }

      // //left Event listener for pagination
      // leftElement.addEventListener('click', () => {
      //   currentPage <=1 ? setCurrentPage(1) : setCurrentPage(currentPage - 1);
      //   setMovieState([]);
      //   fetchMovie();
      //   render();
      // });
      // //right Event listener for pagination
      // rightElement.addEventListener('click', () => {
      //   setCurrentPage(currentPage + 1);
      //   setMovieState([]);
      //   fetchMovie();
      //   render();
      // });
