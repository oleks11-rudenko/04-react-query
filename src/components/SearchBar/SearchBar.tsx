import css from "./SearchBar.module.css";
import { Formik, Form, Field, type FormikHelpers } from "formik";
import toast from "react-hot-toast/headless";

interface SearchBarValues {
  query: string;
}

const initialValues: SearchBarValues = { query: "" };

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (
    values: SearchBarValues,
    actions: FormikHelpers<SearchBarValues>
  ) => {
    const query = values.query;
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(query);
    actions.resetForm();
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className={css.form}>
            <Field
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
