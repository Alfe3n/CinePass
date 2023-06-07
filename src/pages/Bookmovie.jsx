import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Bookmovie() {
  let { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/` + id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // console.log(movie);
  }, []);
  console.log(ticketCount);
  return (
    <div className="bookmovie-page-container">
      {movie ? (
        <div className="content-container">
          <div
            style={{ backgroundImage: `url(${movie.image.original})` }}
            className=""
          >
            <div className="flex items-center">
              <img src={movie.image.medium}></img>
              <div>
                <p>{movie.name}</p>
                <p>{movie.language}</p>
                <p>{`Ratings:${movie.rating.average}`}</p>
                {movie.genres.map((genre) => {
                  return <span>{genre}/</span>;
                })}
                <br></br>
              </div>
            </div>
          </div>

          <h2>About the movie</h2>
          <div dangerouslySetInnerHTML={{ __html: movie.summary }}></div>
          {/* <p>{movie.summary}</p> */}
        </div>
      ) : (
        <>
          <h1>world</h1>
        </>
      )}
    </div>
  );
}

export default Bookmovie;
