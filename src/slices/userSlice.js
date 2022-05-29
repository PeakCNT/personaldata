import { createSlice } from "@reduxjs/toolkit";

const localData = localStorage.getItem("person");

const initialState = {
  users: localData ? JSON.parse(localData) : [],
  user: {},
  edit: false,
};

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    adduser: (state, action) => {
      const newuser = [...state.users, action.payload];
      return { ...state, users: newuser };
    },
    deleteuser: (state, action) => {
      const tempuser = state.users.filter((item) => item.id !== action.payload);
      return { ...state, users: tempuser };
    },
    finduser: (state, action) => {
      const oneuser = state.users.find((item) => item.id === action.payload);

      return { ...state, user: oneuser, edit: true };
    },
    saveuser: (state, action) => {
      const tempuser = state.users.map((el) =>
        el.id === state.user.id ? action.payload : el
      );

      return { ...state, users: tempuser, user: {}, edit: false };
    },
    sortuser: (state, action) => {
      const tempuser = state.users.sort((a, b) => a - b);

      return { ...state, users: tempuser };
    },
  },
});

export const { adduser, deleteuser, finduser, saveuser, sortuser } =
  userslice.actions;

export default userslice.reducer;
