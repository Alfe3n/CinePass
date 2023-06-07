import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import PulseLoader from "react-spinners/PulseLoader";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
function Home() {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    axios
      .get(" https://api.tvmaze.com/search/shows?q=all")
      .then((response) => {
        setMovieList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full home-container">
      <div className="nav-container"></div>
      {movieList ? (
        <>
          {movieList ? (
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {movieList.map((movie) => {
                return (
                  <SwiperSlide
                    className="image-banner"
                    style={{
                      backgroundImage: `url(${movie.show.image.original})`,
                    }}
                  >
                    <Link to={`bookmovie/${movie.show.id}`}>
                      <div className="flex items-center justify-evenly ">
                        <img
                          src={movie.show.image.medium}
                          className="z-10 p-4 md:p-16"
                        ></img>
                        <p className="z-10 text-2xl font-bold text-white md:text-6xl">
                          {movie.show.name}
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <>
              <h2>hello</h2>
            </>
          )}

          <div className="filter-container"></div>
          <div className="mx-4 cards-container">
            <h2 className="my-10 text-2xl font-bold text-b4">
              Recommended movies
            </h2>
            <div className="flex flex-col items-center mb-12 sm:flex sm:flex-row sm:flex-wrap sm:gap-x-8 gap-y-10">
              {movieList.map((movie) => {
                return (
                  <Link to={`bookmovie/${movie.show.id}`}>
                    <div key={movie.show.id}>
                      <img
                        src={movie.show.image.medium}
                        alt="movie poster"
                        className="rounded-lg"
                      />
                      <p className="my-4">{movie.show.name}</p>
                      <div className="text-g4 ">
                        {movie.show.genres.map((genre) => {
                          return (
                            <span className="p-1 mr-2 rounded-lg bg-g1">
                              {genre}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="mt-52">
          <PulseLoader color={"#009C51"} />
        </div>
      )}
    </div>
  );
}

export default Home;
