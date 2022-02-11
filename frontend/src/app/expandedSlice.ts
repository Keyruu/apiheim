import { createSlice } from "@reduxjs/toolkit";

export const expandedSlice = createSlice({
  name: "expanded",
  initialState: {
    expanded: Array<number>(),
  },
  reducers: {
    expand: (state, action) => {
      if (state.expanded.indexOf(action.payload) === -1) {
        state.expanded.push(action.payload);
      }
    },
    collapse: (state, action) => {
      const index = state.expanded.indexOf(action.payload);
      if (index > -1) {
        state.expanded.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    collapseAll: (state) => {
      state.expanded = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { expand, collapse, collapseAll } = expandedSlice.actions;

export default expandedSlice.reducer;
