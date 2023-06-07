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
  }, []);
  console.log(ticketCount);
  return (
    <div className="flex items-center justify-start bookmovie-page-container">
      {movie ? (
        <div className="content-container">
          <div
            className="image-banner"
            style={
              {
                background: `url(${movie.image.original})`,
              }
              //   { filter: "blur(8px)" })
            }
          >
            <div className="flex items-center justify-start md:gap-x-16">
              <img
                src={movie.image.medium}
                className="z-10 p-4 md:p-16 rounded-xl"
              ></img>
              <div className="z-10 flex flex-col text-white gap-y-4">
                <p className="text-xl font-extrabold md:text-4xl text-b2">
                  {movie.name}
                </p>
                <p className="z-10 text-lg font-semibold text-b2">
                  {movie.language}
                </p>
                <p className="font-semibold text-b2">{`Ratings:${movie.rating.average}`}</p>
                <div className="text-b2">
                  {movie.genres.map((genre) => {
                    return (
                      <span className="p-1 mr-1 text-sm rounded-lg bg-g1">
                        {genre}
                      </span>
                    );
                  })}
                </div>

                <Popup
                  trigger={
                    <button className="p-1 rounded-lg md:p-2 bg-b1 text-b4">
                      {" "}
                      Book Tickets
                    </button>
                  }
                  modal
                  nested
                  className="bg-g4"
                >
                  {(close) => (
                    <div className="bg-b4">
                      <div className="mt-4 text-center">Book you Show!!!</div>
                      <div className="flex flex-col p-8 gap-y-6">
                        <form className="flex">
                          <input
                            type="text"
                            value={movie.name}
                            disabled
                            className="bg-red-500 "
                          ></input>
                          {/* <input
                            type="text"
                            value={movie.language}
                            disabled
                            className="bg-transparent"
                          ></input> */}
                        </form>
                        <div className="flex justify-between">
                          <p>No of Tickets:</p>
                          <div className="flex">
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
            <h2 className="mb-6 text-xl font-bold text-b4">About the movie</h2>
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
