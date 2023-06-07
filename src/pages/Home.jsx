import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

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
    <div className="home-container">
      <div className="nav-container"></div>
      {movieList ? (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
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
                className="mix-blend-overlay"
                style={{ backgroundImage: `url(${movie.show.image.original})` }}
              >
                <div className="flex items-center justify-around ">
                  <img src={movie.show.image.medium}></img>
                  <p className="text-4xl font-bold">{movie.show.name}</p>
                </div>
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
      <div className="m-10 cards-container">
        <h2 className="mb-10 text-2xl">Recommended movies</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-6">
          {movieList.map((movie) => {
            return (
              <Link to={`bookmovie/${movie.show.id}`}>
                <div key={movie.show.id}>
                  <img
                    src={movie.show.image.medium}
                    alt="movie poster"
                    className="rounded-lg"
                  />
                  <p>{movie.show.name}</p>
                  <div>
                    {movie.show.genres.map((genre) => {
                      return <span>{genre}/</span>;
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
