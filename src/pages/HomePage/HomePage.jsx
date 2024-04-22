import MoviesList from "../../components/MoviesList/MoviesList";
export default function HomePage({ movies }) {
  return (
    <>
      <h2>Trending movies</h2> <MoviesList movies={movies}></MoviesList>
    </>
  );
}
