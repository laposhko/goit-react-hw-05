import axios from "axios";
// const KEY = "b398ebac404b995c33c65fc89802cac8";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzk4ZWJhYzQwNGI5OTVjMzNjNjVmYzg5ODAyY2FjOCIsInN1YiI6IjY2MjNlNTljMjIxYmE2MDE2MzEyOTc5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T_alKJ5foztWMNac-B4ZUdYkvH5h9KHjL57oyYBSaFo";
const BASE_URL = "https://api.themoviedb.org/";
const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};
export default async function getData() {
  const url = `${BASE_URL}3/trending/movie/day?language=en-US`;

  return await axios.get(url, options);
}

export async function getDataById(id) {
  const url = `${BASE_URL}3/movie/${id}?language=en-US`;
  return await axios.get(url, options);
}
