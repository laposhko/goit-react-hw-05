// import { useState } from "react";
import MovieList from "../../components/MoviesList/MoviesList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { getDataByQuery } from "../../getData";
import { BallTriangle } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";

import SearchForm from "../../components/SearchForm/SearchForm";
export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [searchParams, setSearchParams] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const notifySearch = () =>
    toast("The search field should be filled in", {
      position: "top-right",
      autoClose: 2500,
    });
  const notifyEmpty = () =>
    toast("There are no movies from this search", {
      position: "top-right",
      autoClose: 2500,
    });
  useEffect(() => {
    const fetchDataByQuery = async () => {
      if (searchParams.get("query") !== null) {
        try {
          setLoader(true);
          const response = await getDataByQuery(searchParams.get("query"));
          if (response.data.results.length === 0) {
            notifyEmpty();
          }
          setSearchedMovies(response.data.results);
        } catch (err) {
          setError(true);
        } finally {
          setLoader(false);
        }
      }
    };
    fetchDataByQuery();
  }, [searchParams]);

  const handleSubmit = (input) => {
    if (!input) {
      notifySearch();
    } else {
      setSearchParams({ query: input });
    }
  };
  return (
    <>
      <ToastContainer />
      <SearchForm onSubmit={handleSubmit} />
      {loader && (
        <BallTriangle
          height="80"
          width="80"
          radius="9"
          color="#6E0D25"
          ariaLabel="loading"
          wrapperStyle={{
            position: "absolute",
            left: "50%",
          }}
          wrapperClass
        />
      )}
      {error && <p>Opps.. Please reload the page</p>}{" "}
      <MovieList movies={searchedMovies}></MovieList>
    </>
  );
}
