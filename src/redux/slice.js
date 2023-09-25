import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userdata: [
    // {
    //   Id: "",
    //   Email: "",
    //   FirstName: "",
    //   LastName: "",
    //   ContactNo: "",
    //   Gender: "",
    //   PassWord: "",
    // },
  ],
};

export const Userslice = createSlice({
  name: "Userdata",
  initialState,
  reducers: {
    SetGeneralInfo: (state, actions) => {
      const { Email, Id, FirstName, LastName, ContactNo, Gender, Password } =
        actions.payload;
      //   const {  } = actions.payload;
      console.log(state, "state");
      console.log(actions.payload, "payload");
      state.userdata.push({
        Id,
        Email,
        FirstName,
        LastName,
        ContactNo,
        Gender,
        Password,
      });
      return state;
    },
  },
});
export const { SetGeneralInfo } = Userslice.actions;
export default Userslice.reducer;
