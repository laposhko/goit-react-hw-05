import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews } from "../../getData";
import css from "./MovieReviews.module.css";
import { BallTriangle } from "react-loader-spinner";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoader(true);
        const response = (await getReviews(movieId)).data.results;
        setReviews(response);
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
      {reviews && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className={css.card}>
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews !== null && reviews.length === 0 && (
        <p>Sorry, there are no reviews yet</p>
      )}
    </>
  );
}
