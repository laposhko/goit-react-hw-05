import css from "./SearchForm.module.css";
export default function SearchForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const input = event.target.query.value.trim();
    onSubmit(input);
    event.target.reset();
  }
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input className={css.input} type="text" name="query" />
      <button className={css.btn} type="submit">
        Search
      </button>
    </form>
  );
}
