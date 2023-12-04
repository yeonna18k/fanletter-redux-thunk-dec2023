import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAvatar,
  setLogin,
  setNick,
  setUserId,
} from "redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../axios/api";

function Login() {
  const navigate = useNavigate();
  // 로그인 <-> 회원가입 토글 state
  const [isLogin, setIsLogin] = useState(true);

  // const auth = useSelector((state) => state.auth.accessToken);
  // // console.log(auth);

  // id, pw, nickname input state 변경
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState("");

  const dispatch = useDispatch();

  const getLocalToken = window.localStorage.getItem("accessToken");
  const getLocalAvatar = window.localStorage.getItem("avatar");
  const getLocalNickname = window.localStorage.getItem("nickname");
  const getLocalUserId = window.localStorage.getItem("userId");

  useEffect(() => {
    dispatch(setLogin(getLocalToken));
    dispatch(setAvatar(getLocalAvatar));
    dispatch(setNick(getLocalNickname));
    dispatch(setUserId(getLocalUserId));
  }, []);

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/login", {
        id: id,
        password: pw,
      });

      // authSlice에 accessToken, nickname, avatar, userId 보내기
      dispatch(setLogin(data.accessToken));
      dispatch(setAvatar(data.avatar));
      dispatch(setNick(data.nickname));
      dispatch(setUserId(data.userId));
      // 로컬스토리지에 accessToken, nickname, avatar, userId 저장하기
      window.localStorage.setItem("accessToken", data.accessToken);
      window.localStorage.setItem("avatar", data.avatar);
      window.localStorage.setItem("nickname", data.nickname);
      window.localStorage.setItem("userId", data.userId);
    } catch (error) {
      // console.log(e.response.data);
      alert(error.response.data.message);
      setId("");
      setPw("");
    }
  };

  const handleCreateAccount = async () => {
    try {
      const { data } = await api.post("/register", {
        id: id,
        password: pw,
        nickname: nickname,
      });
      setId("");
      setPw("");
      setNickname("");
      setIsLogin(true);
    } catch (e) {
      console.log(e.response.data);
      alert(e.response.data.message);
      setId("");
      setPw("");
      setNickname("");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // 로그인에 임시로 true 값 payload로 보내기
    isLogin
      ? // dispatch(setLogin(true))
        handleLogin()
      : handleCreateAccount();
  };

  // 로그인 <-> 회원가입 토글 함수
  const onClickHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <Container>
      <LoginBox onSubmit={onSubmitHandler}>
        <p>{isLogin ? "Log in" : "Create Account"}</p>
        <LoginInput
          placeholder="ID (4~6 characters)"
          minLength="4"
          maxLength="6"
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></LoginInput>
        <LoginInput
          placeholder="PW (4~15 characters)"
          minLength="4"
          maxLength="15"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        ></LoginInput>
        {isLogin ? null : (
          <LoginInput
            placeholder="NICKNAME (1~10 characters)"
            minLength="1"
            maxlength="10"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></LoginInput>
        )}
        <LoginButton>{isLogin ? "Log in" : "Create Account"}</LoginButton>
        <CreateAccount>
          <span onClick={onClickHandler}>
            {isLogin ? "Create Account" : "Log in"}
          </span>
        </CreateAccount>
      </LoginBox>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginBox = styled.form`
  width: 500px;
  height: 400px;
  padding: 10px;
  background-color: #fdb69f;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & p {
    padding: 10px;
    font-size: 36px;
    font-weight: bolder;
  }
`;
const LoginInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  padding: 10px;
`;
const LoginButton = styled.button`
  border: none;
  background-color: #8d8c8c;
  height: 60px;
  font-size: 24px;
  &:hover {
    background-color: black;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
`;
const CreateAccount = styled.div`
  text-align: center;
  & span {
    &:hover {
      cursor: pointer;
      color: black;
      transition: 0.2s ease-in-out;
    }
  }
`;
export default Login;
