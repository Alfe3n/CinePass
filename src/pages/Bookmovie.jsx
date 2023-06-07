import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
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
    <div className="flex items-center justify-center bookmovie-page-container">
      {movie ? (
        <div className="content-container">
          <div
            style={{
              backgroundImage: `url(${movie.image.original})`,
            }}
          >
            <div className="flex items-center justify-evenly">
              <img src={movie.image.medium} className="h-1/2"></img>
              <div className="flex flex-col text-white gap-y-4">
                <p className="text-4xl font-bold text-b4">{movie.name}</p>
                <p className="text-xl font-semibold text-b3">
                  {movie.language}
                </p>
                <p className="font-semibold text-b3">{`Ratings:${movie.rating.average}`}</p>
                <div className="text-b2">
                  {movie.genres.map((genre) => {
                    return (
                      <span className="p-1 ml-2 rounded-lg bg-g1">{genre}</span>
                    );
                  })}
                </div>

                <Popup
                  trigger={
                    <button className="p-2 rounded-lg bg-b1 text-b4">
                      {" "}
                      Book Tickets
                    </button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div>
                      <div className="mt-4 text-center">Book you Show!!!</div>
                      <div className="flex flex-col p-8 gap-y-6">
                        <form className="flex">
                          <input
                            type="text"
                            value={movie.name}
                            disabled
                            className="bg-transparent"
                          ></input>
                          <input
                            type="text"
                            value={movie.language}
                            disabled
                            className="bg-transparent"
                          ></input>
                        </form>
                        <div className="flex justify-between">
                          <p>No of Tickets:</p>
                          <button
                            onClick={() => {
                              if (ticketCount != 0)
                                setTicketCount(ticketCount - 1);
                            }}
                          >
                            -
                          </button>
                          {ticketCount}
                          <button
                            onClick={() => setTicketCount(ticketCount + 1)}
                          >
                            +
                          </button>
                        </div>
                        <p>{`Total Amount:${ticketCount * 100}`}</p>

                        <button
                          onClick={() => close()}
                          className="p-4 text-center rounded-lg bg-b3 text-b1"
                        >
                          Book Tickets
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </div>
          <div className="m-12">
            <h2 className="mb-6 text-xl font-extrabold text-b4">
              About the movie
            </h2>
            <div
              className="leading-relaxed tracking-wide text-b3"
              dangerouslySetInnerHTML={{ __html: movie.summary }}
            ></div>
          </div>
        </div>
      ) : (
        <div>
          <PulseLoader color={"#0B2447"} />
        </div>
      )}
    </div>
  );
}

export default Bookmovie;
