import { useParams } from "react-router-dom";
import { getDataById } from "../../getData";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
export default function MovieDetailsPage() {
  const [movie, setMovie] = useState();
  const { movieId } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getDataById(movieId);
        setMovie(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [movieId]);
  console.log(movie);
  let title, genres, overview, score, path;

  if (movie !== undefined) {
    title = movie.title;
    path = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
    score = movie.vote_average;
    overview = movie.overview;
    genres = movie.genres.map((genre) => genre.name).join(", ");
  }
  // const { title, genres, overview } = movie;

  // console.log(genres);
  // console.log(title, genres, overview);
  return (
    <div className={css.content}>
      <div>
        <img src={path} alt={overview} />
      </div>
      <div>
        <h2>{title}</h2>
        <p>User Score: {score * 10}%</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <p>{genres}</p>
      </div>
      <hr />
      <h3>Additional information</h3>
      <ul className={css.info}>
        <li>
          <NavLink>Cast</NavLink>
        </li>
        <li>
          <NavLink>Reviews</NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
}
