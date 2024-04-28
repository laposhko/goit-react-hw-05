import MoviesList from "../../components/MoviesList/MoviesList";
import { useState, useEffect } from "react";
import { getData } from "../../getData";
import { BallTriangle } from "react-loader-spinner";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await getData();
        setMovies(response.data.results);
      } catch (err) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h2>Trending movies</h2> <MoviesList movies={movies}></MoviesList>
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
      {error && <p>Opps.. Please reload the page</p>}
    </>
  );
}
