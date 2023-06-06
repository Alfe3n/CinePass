import { React, useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    axios
      .get(" https://api.tvmaze.com/search/shows?q=all")
      .then((response) => {
        setMovieList(response.data);
        console.log(movieList);
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
              <div key={movie.show.id}>
                <img src={movie.show.image.medium} alt="movie poster" />
                <p>{movie.show.name}</p>
                <div>
                  {movie.show.genres.map((genre) => {
                    return <span>{genre}/</span>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
