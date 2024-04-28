import { useParams } from "react-router-dom";
import { getCast } from "../../getData";
import { useEffect, useState } from "react";
import css from "./MovieCast.module.css";
import { BallTriangle } from "react-loader-spinner";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoader(true);
        const response = (await getCast(movieId)).data.cast;
        setCast(response);
      } catch (err) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    fetch();
  }, [movieId]);
  return (
    <>
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
      {cast && (
        <ul className={css.list}>
          {cast.map((cast) => {
            if (cast.profile_path !== null) {
              return (
                <li key={cast.cast_id} className={css.card}>
                  <h4>{cast.name}</h4>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                    alt={cast.name}
                  />
                </li>
              );
            }
          })}
        </ul>
      )}
    </>
  );
}
