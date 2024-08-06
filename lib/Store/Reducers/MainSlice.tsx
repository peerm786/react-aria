import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookiemgmt";


interface ReactUIState {
  useDarkMode: boolean;
}



const initialState: ReactUIState = {
  useDarkMode: false,
};


const MainStates = createSlice({
  name: "mainslice",
  initialState,
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        setCookie("isDarkMode", "true");
        document.body.classList.add("dark");
      } else {
        deleteCookie("isDarkMode");
        document.body.classList.remove("dark");
      }
      state.useDarkMode = action.payload;
    },
  },
});


export const { toggleDarkMode } = MainStates.actions;


export default MainStates.reducer;
