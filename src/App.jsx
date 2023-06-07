import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Bookmovie from "./pages/Bookmovie";
import Notfound from "./pages/Notfound";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="bookmovie" element={<Bookmovie />} />
        <Route exact path="bookmovie/:id" element={<Bookmovie />}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
