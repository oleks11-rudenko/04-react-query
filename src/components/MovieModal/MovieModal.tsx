import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const handleBackdropClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClose}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
