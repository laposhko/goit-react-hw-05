import MoviesList from "../../components/MovieList/MovieList";
export default function HomePage({ movies }) {
  return (
    <>
      this is home page
      <MoviesList movies={movies}></MoviesList>
    </>
  );
}
