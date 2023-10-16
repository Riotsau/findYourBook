import { useEffect, useRef, useState } from "react";
import { useBooks } from "./useBooks";

export default function App() {
  const [query, setQuery] = useState("");
  const { books, isLoading, error } = useBooks(query);
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults books={books} />
      </NavBar>
      <Main>
        <Box books={books}>
          {isLoading && <Loader />}
          {!isLoading && !error && <BookList books={books} />}
          {error && <ErrorMessage message={error} />}
        </Box>
      </Main>
    </>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>;
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⚠️</span> {message}
    </p>
  );
}
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">📖</span>
      <h1>FindYourBook</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  const inputEI = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Enter") {
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
      inputEI.current.focus();
    },
    [setQuery]
  );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search books..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEI}
    />
  );
}
function Numresults({ books }) {
  return (
    <p className="num-results">
      Found <strong>{books?.length}</strong> results
    </p>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function BookList({ books, onSelectBook }) {
  return (
    <ul className="list list-movies">
      {books?.map((book) => (
        <Book book={book} key={book.id} onSelectBook={onSelectBook} />
      ))}
    </ul>
  );
}
function Book({ book, onSelectBook }) {
  return (
    <li onClick={() => onSelectBook(book.title)}>
      <img src={book.image} alt={`${book.title} poster`} />
      <h3>{book.title}</h3>
      <div>
        <p>
          <span>Written by: </span>
          <span>{book.authors}</span>
        </p>
      </div>
    </li>
  );
}
