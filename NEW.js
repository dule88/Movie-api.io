const btnSearch = document.querySelector('.btnSearch');
const searchInput = document.querySelector('.searchInput');
const resultOfSearch = document.querySelector('.resultOfSearch');
const cartElement = document.querySelector('.cart');
const leftElement = document.querySelector('.left');
const rightElement = document.querySelector('.right');
const currentPageElement = document.querySelector('.currentPage');



let movieState = [];
let cartMovies = [];
let currentPage = 1;

const setMovieState = (list) => {
  movieState = [...list];
}

const setCartMovies = (list) => {
  cartMovies = [...list];
}

const setCurrentPage = (num)  => {
  currentPage = num;
}



  btnSearch.addEventListener('click', () => {
      
      fetchMovie();

        
      });

      const fetchMovie = () => {
        currentPageElement.value = currentPage;
        fetch( `https://www.omdbapi.com/?apikey=56e00a84&s=${searchInput.value}&page=${currentPage}` )
        .then(res => res.json())
        .then(movies => {
          setMovieState(movies.Search);
          render();
        	
        })
        .catch(err => console.log(err));

      }


      const render = () => {

        resultOfSearch.innerHTML = '';

        movieState.forEach((movie, idx) => {
          resultOfSearch.innerHTML += 
          `<div class="col text-dark m-2 pb-4">
            <div class="card" style="width: 18rem; height:100%;">
              <img src=${movie.Poster} class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">Year: ${movie.Year} Type: ${movie.Type}</p>
                <a class="btn btn-primary" onClick="add(${idx})">Add to cart</a>
              </div>
            </div>
          </div>`;
        });
      }

      const add = (idx) => {
        setCartMovies([...cartMovies, movieState[idx]]);
        cartRender();
      }


      const cartRender = () => {

        cartElement.innerHTML = '';

        cartMovies.forEach((movie, idx) => {
          cartElement.innerHTML += 
          `<div class="col text-dark m-2 pb-4">
            <div class="card" style="width: 18rem; height:100%;">
              <img src=${movie.Poster} class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <p class="card-text">Year: ${movie.Year} Type: ${movie.Type}</p>
                <a class="btn btn-danger" onClick="deletefunction(${idx})">Delete</a>
              </div>
            </div>
          </div>`;
        });
      }

      const deletefunction = (idx) => {
        let temp = [...cartMovies];
        temp.splice(idx, 1);
        setCartMovies(temp);
        cartRender();
      }

      leftElement.addEventListener('click', () => {
        currentPage <=1 ? setCurrentPage(1) : setCurrentPage(currentPage - 1);
        setMovieState([]);
        fetchMovie();
        render();
      });

      rightElement.addEventListener('click', () => {
        setCurrentPage(currentPage + 1);
        setMovieState([]);
        fetchMovie();
        render();
      });
