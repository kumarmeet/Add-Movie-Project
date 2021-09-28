"use strict";

const startAddMovieBtn = document.querySelector("header button");
const addMovieModal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");

const toggleMovieModal = () => {
	addMovieModal.classList.toggle("visible");
	toggleBackdrop();
};

const toggleBackdrop = () => {
	backdrop.classList.toggle("visible");
};

const cancelAddMovie = () => {
	toggleMovieModal();
};

const backdropClickHandler = () => {
	toggleMovieModal();
};

startAddMovieBtn.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovie);
