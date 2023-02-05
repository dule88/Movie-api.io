const btnSearch = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');
const resultOfSearch = document.querySelector('#resaultContainer');
const cartElement = document.querySelector('#modalListContent');
const searchPagination = document.querySelector('#searchPagination');
const alertMessage = document.querySelector('#alertMessage');
// const counter = document.querySelector('#counter');


let currentCart = {};


let page = 1;
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



// Event listener for searching the movies
  btnSearch.addEventListener('click', () => {
      
      fetchMovie();

        
      });

      // function for fetching the movies from API
      const fetchMovie = () => {
  
        fetch( `https://www.omdbapi.com/?apikey=56e00a84&s=${searchInput.value}&page=${page}` )
        .then(res => res.json())
        .then(movies => {
          setMovieState(movies.Search);
          render();
          pagination();
          

        	
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
                                <li class="list-group-item text-bg-dark fs-4 border-dark text-white-50 py-1 pe-0 pt-0">Title: <span class="text-white">${movie.Title}</span> </li>
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

        // moviesCounter();
      }



      // // Function for deleting movies from the cart
      const deletefunction = (idx) => {

        let temp = [...cartMovies];
        temp.splice(idx, 1);
        setCartMovies(temp);
        cartRender();
        // moviesCounter();
      }

 

      // CART COUNTER

    
    //   window.addEventListener('load', () => {

    //     let store = localStorage.getItem('movieList');
    
    //     if (store == null) {
    //         store = localStorage.setItem('movieList', JSON.stringify(''));
    //     }
    
        
    //   moviesCounter();
      
        
    // })



  //   const moviesCounter = () => {
  //     let readStorage = JSON.parse(localStorage.getItem('movieList'));
  //     localStorage.setItem('movieList', JSON.stringify(readStorage));
  //     counter.innerHTML = `<h3 class="text-white m-0">${readStorage.length}</h3>`
      
  // }




      // PAGINATION

      const pagination = () => {
        searchPagination.innerHTML = `

        <ul class="pagination m-0 border-success">

            <li class="page-item ">
                <a class="page-link bg-dark text-white-50 border-secondary" href="#" aria-label="Previous"  onclick=goToPreviousPage()>
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li class="page-item " id='pp'><span class="page-link bg-dark border-secondary text-white-50 ">${prevPage}</span></li>
            <li class="page-item active" ><span class="page-link bg-success border-secondary">${page}</span></li>
            <li class="page-item " ><span class="page-link bg-dark border-secondary text-white-50">${nextPage}</span></li>
            <li class="page-item " ><span class="page-link bg-dark border-secondary text-white-50">...</span></li>
            <li class="page-item " ><span class="page-link bg-dark border-secondary text-white-50">${lastPage + 1}</span></li>

            <li class="page-item">
                <a class="page-link bg-dark text-white-50 border-secondary" href="#" aria-label="Next" onclick=goToNextPage()>
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            
        </ul>
    `
        
      }


      // Pagination - click on Next Page button
      const goToNextPage = async () => {
        resultOfSearch.innerHTML = '';
    
            page = page + 1;
        
            prevPage = page - 1;
            nextPage = page + 1;
            
            fetchMovie();
    
    }
    
    
    // Pagination - click on Previous Page button
    const goToPreviousPage = async () => {
      resultOfSearch.innerHTML = '';
    
        if(prevPage != 0){
    
            page = page - 1;
        
            prevPage = page - 1;
            nextPage = page + 1;
        
            fetchMovie();
        }else{
          fetchMovie();
            alertMessage.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show mx-2 float my-6 z-3 text-center" role="alert">
                    These is first page!!!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `
    
            setTimeout(() => {
                alertMessage.innerHTML = '';
            }, "1500")
        }
    }