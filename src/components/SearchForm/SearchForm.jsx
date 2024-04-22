export default function SearchForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="query" />
      <button type="submit">Search</button>
    </form>
  );
}
