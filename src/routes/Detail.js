import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  //   let history = useHistory();

  const getMovie = async () => {
    const res = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await res.json();
    setMovies(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Link to="/" className={styles.title_text}>
          <p>HOME</p>
        </Link>
        <div className={styles.title_text}>
          {loading ? <p>Loading...</p> : <p>{movies.title_long}</p>}
        </div>
      </div>
      <hr />
      {loading ? null : (
        <div className={styles.inner}>
          <div className={styles.innerImg}>
            <img src={movies.large_cover_image} alt="" />
          </div>
          <div className={styles.innerText}>
            <div>
              <h2>Description</h2>
              <div>{movies.description_full}</div>
              <br />
              <div className={styles.innerText__small}>
                <div className={styles.innerText__genre}>
                  <h2>Genres</h2>
                  <ul>
                    {movies.genres.map((genre, index) => {
                      return <li key={index}>{genre}</li>;
                    })}
                  </ul>
                </div>
                <div>
                  <h2>Rating</h2>
                  <div>{movies.rating} / 10</div>
                </div>
                <div>
                  <h2>Runtime</h2>
                  <div>{movies.runtime} mins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
