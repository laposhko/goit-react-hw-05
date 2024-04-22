import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";

import Navigation from "../Navigation/Navigation";
import css from "./App.module.css";
import { getData, getDataByQuery } from "../../getData";
import { useEffect, useState } from "react";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  //useEffect for trending movies
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
  //useEffect for searched movies
  useEffect(() => {
    console.log(searchParams);
    if (!searchParams) {
      return;
    }
    const fetchDataByQuery = async () => {
      try {
        const response = await getDataByQuery(searchParams);
        console.log(response.data.results);
        if (response.data.results) {
          setSearchedMovies(response.data.results);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataByQuery();
  }, [searchParams]);
  return (
    <div className={css.app}>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<HomePage movies={movies} />}></Route>
        <Route
          path="/movies"
          element={
            <MoviesPage onSubmit={setSearchParams} movies={searchedMovies} />
          }
        ></Route>
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
