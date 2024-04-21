import { useParams } from "react-router-dom";
import { getDataById } from "../../getData";
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  console.log(movieId);
  const fetch = async () => {
    return await getDataById(movieId);
  };
  const movie = fetch();
  console.log(movie);
  return (
    <div>
      <p>this is movie details page</p>
      <p>Now showing product with id - {movieId}</p>
    </div>
  );
}
