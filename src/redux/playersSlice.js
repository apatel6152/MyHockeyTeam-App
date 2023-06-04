import { createSlice } from '@reduxjs/toolkit';

const playersSlice = createSlice({
  name: 'players',
  initialState: [],
  reducers: {
    addPlayer: (state, action) => {
      console.log(action.payload)
      state.push(action.payload);
    },
    updatePlayer: (state, action) => {
      const { id } = action.payload;
      console.log(action.payload);
      const playerIndex = state.findIndex((player) => player.id === id);
    //   console.log(playerIndex)
      if (playerIndex !== -1) {
        state[playerIndex] = { ...state[playerIndex], ...action.payload };
      }
    },
    deletePlayer: (state, action) => {
      const id = action.payload;
      return state.filter((player) => player.id !== id);
    },
  },
});

export const { addPlayer, updatePlayer, deletePlayer } = playersSlice.actions;

export default playersSlice.reducer;
