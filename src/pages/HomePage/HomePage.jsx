import MoviesList from "../../components/MovieList/MovieList";
export default function HomePage({ movies }) {
  return (
    <>
      <h2>Trending movies</h2> <MoviesList movies={movies}></MoviesList>
    </>
  );
}
