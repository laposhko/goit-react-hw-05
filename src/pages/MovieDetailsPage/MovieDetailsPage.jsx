import { Link, useLocation, useParams } from "react-router-dom";
import { getDataById } from "../../getData";
import { useEffect, useState, useRef, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { TbArrowBackUp } from "react-icons/tb";

import { NavLink } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
export default function MovieDetailsPage() {
  const [movie, setMovie] = useState();
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
  let title, genres, overview, score, path, year;
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  if (movie !== undefined) {
    const ind = movie.release_date.indexOf("-");
    title = movie.title;
    year = movie.release_date.slice(0, ind);
    path = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
      : defaultImg;
    score = movie.vote_average;
    overview = movie.overview;
    genres = movie.genres.map((genre) => genre.name).join(", ");
  }

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
      {!loader && !error && (
        <div>
          <div>
            <img src={path} alt={overview} height="300px" />
          </div>
          <div>
            <h2>
              {title} ({year})
            </h2>
            <p>User Score: {Math.round(score * 10)}%</p>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h3>Genres</h3>
            <p>{genres}</p>
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
