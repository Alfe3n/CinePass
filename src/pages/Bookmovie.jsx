import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
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
              <Popup
                trigger={<button className="button"> Open Modal </button>}
                modal
                nested
              >
                {(close) => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <div className="header"> Modal Title </div>
                    <div className="content">
                      <form>
                        <button onClick={() => setTicketCount(count + 1)}>
                          +
                        </button>
                        <p>{ticketCount}</p>
                        <button onClick={() => setTicketCount(count - 1)}>
                          -
                        </button>
                      </form>
                    </div>
                    <div className="actions">
                      <Popup
                        trigger={<button className="button"> Trigger </button>}
                        position="top center"
                        nested
                      ></Popup>
                      <button
                        className="button"
                        onClick={() => {
                          console.log("modal closed ");
                          close();
                        }}
                      >
                        close modal
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>

          <h2>About the movie</h2>
          <p>{movie.summary}</p>
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
