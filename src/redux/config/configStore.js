import { configureStore } from "@reduxjs/toolkit";
import auth from "redux/modules/authSlice";
import letters from "redux/modules/lettersSlice";
import member from "redux/modules/memberSlice";

// const rootReducer = combineReducers({ letters, member });
// const store = createStore(rootReducer);

const store = configureStore({
  reducer: {
    letters: letters,
    member: member,
    auth: auth,
  },
});
export default store;
