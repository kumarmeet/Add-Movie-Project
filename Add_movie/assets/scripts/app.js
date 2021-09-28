"use strict";

const addMovieModal = document.getElementById("add-modal");
const entryTextSection = document.getElementById("entry-text");
const backdrop = document.getElementById("backdrop");
const deleteMovieModal = document.getElementById("delete-modal");

const startAddMovieBtn = document.querySelector("header button");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const userInputs = addMovieModal.querySelectorAll("input");
const confirmAddMovieBtn = cancelAddMovieButton.nextElementSibling;

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const movieList = document.getElementById("movie-list");
  movieList.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUI();
};

//this method related to delete movie element
const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionBtn = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");
	
  //this is a hacky approach for even listner
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletionBtn.removeEventListener("click", closeMovieDeletionModal);
  //this is a hacky approach end

  cancelDeletionBtn.addEventListener("click", closeMovieDeletionModal);
  confirmDeletionBtn.addEventListener("click", deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (id, ttl, img, rt) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.classList.add("movie-element");
  newMovieElement.innerHTML = `
	<div class = "movie-element__image">
	<img src = "${img} alt = "${ttl}">
	</div>
	<div class = "movie-element__info">
	<h2>${ttl}</h2>
	<p>${rt}/5 Stars</p>
	</div>
	`;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const movieList = document.getElementById("movie-list");
  movieList.appendChild(newMovieElement);
};

const clearMovieInput = () => {
  for (const inputs of userInputs) {
    inputs.value = "";
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please input valid values (rating b/w 1 to 5)");
    return;
  }

  const newMovie = {
    id: Math.random().toString(), // this id related to deleting the movie element
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies); //for log data

  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const backdropClickHandler = () => {
  deleteMovieModal.classList.remove("visible");
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
};

backdrop.addEventListener("click", backdropClickHandler);
startAddMovieBtn.addEventListener("click", showMovieModal);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener("click", addMovieHandler);
