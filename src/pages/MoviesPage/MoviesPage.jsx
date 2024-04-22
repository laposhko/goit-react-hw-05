import { useState } from "react";
import MovieList from "../../components/MoviesList/MoviesList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchForm from "../../components/SearchForm/SearchForm";
export default function MoviesPage({ onSubmit, movies, activePage }) {
  console.log(activePage);
  const notify = () =>
    toast("The search field should be filled in", {
      position: "top-right",
      autoClose: 2500,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.query.value.trim();
    if (!input) {
      notify();
    } else {
      onSubmit(input);
    }
    event.target.reset();
  };
  return (
    <>
      <ToastContainer />

      <SearchForm onSubmit={handleSubmit} />
      <MovieList movies={movies}></MovieList>
    </>
  );
}
