import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "GlobalStyle";
import { Provider } from "react-redux";
import store from "redux/config/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
    <GlobalStyle />
  </Provider>
);

// LetterContext의 children에 App컴포넌트가 들어가 있음
// 모든 컴포넌트는 App컴포넌트에서 작성됨
// Router안에 있는 모든 컴포넌트들이 letters와 setLetters를 공유할 수 있게 됨 -> 여기가 이해가 안되네
