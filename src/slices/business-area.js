import { createSlice } from 'redux-starter-kit';
const initialState = [];

const businessAreaSlice = createSlice({
  initialState,
  reducers: {
    setBusinessArea(state, action) {
      return action.payload;
    }
  }
});

export const {reducer: businessAreaReducer} = businessAreaSlice;

export const {setBusinessArea} = businessAreaSlice.actions;
