import { createSlice } from "@reduxjs/toolkit";
// import { current } from "@reduxjs/toolkit";
const initialState = {
  movie: [],
};
export const movieSlice = createSlice({
  name: "selectMovie",
  initialState,
  reducers: {
    selectMovie: (state, action) => {
      state.movie = action.payload;
      console.log(state.movie);
    },
  },
});
export const { selectMovie } = movieSlice.actions;
export default movieSlice.reducer;
