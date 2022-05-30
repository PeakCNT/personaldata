import { createSlice } from "@reduxjs/toolkit";

const localData = localStorage.getItem("person");

const initialState = {
  users: localData ? JSON.parse(localData) : [],
  user: {},
  edit: false,
  sortup: true,
  start: 0,
  end: 5,
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
      const tempuser = [...state.users];
      const tempsort = state.sortup;

      if (action.payload === "salary") {
        if (tempsort) {
          tempuser.sort((a, b) => a.salary - b.salary);
        } else {
          tempuser.sort((a, b) => b.salary - a.salary);
        }
      } else if (action.payload === "phone") {
        if (tempsort) {
          tempuser.sort((a, b) => a.phone - b.phone);
        } else {
          tempuser.sort((a, b) => b.phone - a.phone);
        }
      } else if (action.payload === "gender") {
        if (tempsort) {
          tempuser.sort((a, b) => a.gender.localeCompare(b.gender));
        } else {
          tempuser.sort((a, b) => b.gender.localeCompare(a.gender));
        }
      } else if (action.payload === "firstName") {
        if (tempsort) {
          tempuser.sort((a, b) => a.firstName.localeCompare(b.firstName));
        } else {
          tempuser.sort((a, b) => b.firstName.localeCompare(a.firstName));
        }
      } else if (action.payload === "nationality") {
        if (tempsort) {
          tempuser.sort((a, b) => a.nationality.localeCompare(b.nationality));
        } else {
          tempuser.sort((a, b) => b.nationality.localeCompare(a.nationality));
        }
      }

      return { ...state, users: tempuser, sortup: !tempsort };
    },
    pageuser: (state, action) => {
      let tempstart = state.start;
      let tempend = state.end;

      switch (action.payload) {
        case 1:
          tempstart = 0;
          tempend = 5;
          break;
        case 2:
          tempstart = 5;
          tempend = 10;
          break;
        case 3:
          tempstart = 10;
          tempend = 15;
          break;
        case 4:
          tempstart = 15;
          tempend = 20;
          break;
        case "prev":
          if (tempstart === 0) {
            tempstart = 0;
            tempend = 5;
          } else {
            tempstart -= 5;
            tempend -= 5;
          }
          break;
        case "next":
          if (tempend === 20) {
            tempstart = 15;
            tempend = 20;
          } else {
            tempstart += 5;
            tempend += 5;
          }
          break;
        default:
          break;
      }

      return { ...state, start: tempstart, end: tempend };
    },
  },
});

export const { adduser, deleteuser, finduser, saveuser, sortuser, pageuser } =
  userslice.actions;

export default userslice.reducer;
