import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";

import Navigation from "../Navigation/Navigation";
import css from "./App.module.css";
import getData from "../../getData";
import { useEffect, useState } from "react";
export default function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setMovies(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={css.app}>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<HomePage movies={movies} />}></Route>
        <Route path="/movies" element={<MoviesPage />}></Route>
        <Route path="/movie_details/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
