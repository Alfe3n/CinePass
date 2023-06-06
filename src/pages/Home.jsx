import { React, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectMovie } from "../Slice";
import { Link } from "react-router-dom";
function Home() {
  // const dispatch = useDispatch();
  // function handleMovieClick(movie) {
  //   dispatch(selectMovie(movie));
  // }
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
      <div className="image-banner">
        <img src="https://static.tvmaze.com/uploads/images/medium_portrait/413/1034988.jpg"></img>
      </div>
      <div className="filter-container"></div>
      <div className=" cards-container">
        <h2>Recommended movies</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-6">
          {movieList.map((movie) => {
            // console.log(movie.show.averageRuntime);
            return (
              <Link to={`bookmovie/${movie.show.id}`}>
                <div
                  key={movie.show.id}
                  // onClick={() => handleMovieClick(movie)}
                >
                  <img src={movie.show.image.medium} alt="movie poster" />
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
