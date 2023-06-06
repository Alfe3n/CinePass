import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Bookmovie from "./pages/Bookmovie";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="bookmovie" element={<Bookmovie />} />
        <Route exact path="bookmovie/:id" element={<Bookmovie />}></Route>
      </Routes>
    </div>
  );
}

export default App;
