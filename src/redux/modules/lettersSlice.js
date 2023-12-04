import fakeData from "fakeData.json";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __addLetter = createAsyncThunk(
  "addLetter",
  async (payload, thunkAPI) => {}
);

// // Action Value
// // 팬레터 추가
// const ADD_LETTER = "letters/ADD_LETTER";
// // 팬레터 삭제
// const DELETE_LETTER = "letters/DELETE_LETTER";
// // 팬레터 수정
// const EDIT_LETTER = "letters/EDIT_LETTER";

// // Action Creator
// export const addLetter = (payload) => {
//   return { type: ADD_LETTER, payload };
// };
// export const deleteLetter = (payload) => {
//   return { type: DELETE_LETTER, payload };
// };
// export const editLetter = (payload) => {
//   return { type: EDIT_LETTER, payload };
// };
const initialState = {
  letters: [
    {
      id: "",
      nickname: "",
      content: "",
      avatar: "",
      writedTo: "",
      createdAt: "",
      userId: "",
    },
  ],
  isLoading: false,
  isError: false,
  error: null,
};
// // Reducer
// const letters = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_LETTER:
//       const newLetter = action.payload;
//       return [newLetter, ...state];
//     case DELETE_LETTER:
//       const letterId = action.payload;
//       return state.filter((letter) => letter.id !== letterId);
//     case EDIT_LETTER:
//       const { id, editingText } = action.payload;
//       return state.map((letter) => {
//         if (letter.id === id) {
//           return { ...letter, content: editingText };
//         }
//         return state;
//       });
//     default:
//       return state;
//   }
// };

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/letters?_sort=createdAt&_order=DESC"
      );
      // console.log("response 여기야", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error 여기", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postLetters = createAsyncThunk(
  "postLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/letters",
        payload
      );
      // console.log("response 여기야", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error 여기", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteLetters = createAsyncThunk(
  "deleteLetters",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/letters/${payload}`
      );
      console.log("payload 여기야", payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log("error 여기", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __patchLetters = createAsyncThunk(
  "patchLetters",
  async ({ id, content: editingText }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/letters/${id}`,
        { content: editingText }
      );
      // console.log("response 여기야", response);
      return thunkAPI.fulfillWithValue({ id, content: editingText });
    } catch (error) {
      console.log("patch error 여기", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const lettersSlice = createSlice({
  name: "letters",
  initialState: initialState,
  reducers: {
    // addLetter: (state, action) => {
    //   const newLetter = action.payload;
    //   return [newLetter, ...state];
    // },
    // deleteLetter: (state, action) => {
    //   const letterId = action.payload;
    //   return state.filter((letter) => letter.id !== letterId);
    // },
    // editLetter: (state, action) => {
    //   const { id, editingText } = action.payload;
    //   return state.map((letter) => {
    //     if (letter.id === id) {
    //       return { ...letter, content: editingText };
    //     }
    //     return letter;
    //   });
    // },
  },
  extraReducers: {
    [__getLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
    },
    [__getLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__postLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__postLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters.unshift(action.payload);
    },
    [__postLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__deleteLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__deleteLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters.filter((letter) => letter.id !== action.payload);
    },
    [__deleteLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__patchLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__patchLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      const { id, content } = action.payload;
      state.letters.map((letter) => {
        if (letter.id === id) {
          return (letter.content = content);
        }
        return letter;
      });
    },
    [__patchLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});
// return state.map((letter) => {
//   if (letter.id === id) {
//     return { ...letter, content: editingText };
//   }
export default lettersSlice.reducer;
export const { editLetter } = lettersSlice.actions;
