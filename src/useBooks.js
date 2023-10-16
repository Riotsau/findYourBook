import { useState, useEffect } from "react";
import axios from "axios";

export function useBooks(query) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function axiosGetBooks() {
        try {
          setIsLoading(true);
          setError("");
          const res = await axios.get(
            `https://www.dbooks.org/api/search/${query}`,
            { signal: controller.signal }
          );

          if (res.data.status !== "ok")
            throw new Error("Something went wrong with fetching books");
          const data = await res.data;
          if (data.Response === "false") throw new Error("Books not found");
          setBooks(data.books);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 1) {
        setBooks([]);
        setError("");
        return;
      }

      axiosGetBooks();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { books, isLoading, error };
}
