import { Link, useLocation, useParams } from "react-router-dom";
import { getDataById } from "../../getData";
import { useEffect, useState, useRef, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { TbArrowBackUp } from "react-icons/tb";

import { NavLink } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backURL = useRef(location.state).current ?? "/movies";
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoader(true);
        const response = await getDataById(movieId);
        setMovie(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    fetch();
  }, [movieId]);

  return (
    <div className={css.content}>
      <Link to={backURL} className={css.backLink}>
        <TbArrowBackUp />
        Back
      </Link>
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
      {!loader && !error && movie !== null && (
        <div>
          <div>
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                  : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
              }
              alt={movie.overview}
              height="300px"
            />
          </div>
          <div>
            <h2>
              {movie.title} (
              {movie.release_date.slice(0, movie.release_date.indexOf("-"))})
            </h2>
            <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
          <hr />
          <h3>Additional information</h3>
          <ul className={css.info}>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive && css.active;
                }}
                to="cast"
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive && css.active;
                }}
                to="reviews"
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Suspense fallback={<p>Loading data...</p>}>
            <Outlet />
          </Suspense>

          <hr />
        </div>
      )}
    </div>
  );
}
