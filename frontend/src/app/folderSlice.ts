import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "folder",
  initialState: {
    loading: false,
    expanded: Array<number>(),
    value: [],
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    expand: (state, action) => {
      state.expanded.push(action.payload);
    },
    collapse: (state, action) => {
      const index = state.expanded.indexOf(action.payload);
      if (index > -1) {
        state.expanded.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFolder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFolder.fulfilled, (state, action) => {
        state.loading = false;
        // Add any fetched posts to the array
        state.value = action.payload;
      });
  },
});

export const fetchFolder = createAsyncThunk("fetchFolder", async () => {
  const response = await fetch("http://localhost:7000/api/v1/folder/");
  const json = await response.json();
  return json;
});

// Action creators are generated for each case reducer function
export const { set, expand, collapse } = folderSlice.actions;

export default folderSlice.reducer;
