import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  // 로그인 <-> 회원가입 토글 state
  const [isLogin, setIsLogin] = useState(true);

  const auth = useSelector((state) => state.auth.accessToken);
  console.log(auth);
  // id, pw, nickname input state 변경
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();

  const onButtonClickHandler = (e) => {
    e.preventDefault();
    // 로그인에 임시로 true 값 payload로 보내기
    e.target.textContent == "Log in"
      ? dispatch(setLogin(true))
      : setIsLogin(true);
  };

  // 로그인 <-> 회원가입 토글 함수
  const onClickHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <Container>
      <LoginBox>
        <p>{isLogin ? "Log in" : "Create Account"}</p>
        <LoginInput
          placeholder="ID (4~6 characters)"
          minLength="4"
          maxlength="6"
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></LoginInput>
        <LoginInput
          placeholder="PW (4~15 characters)"
          minLength="4"
          maxlength="15"
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
        <LoginButton onClick={onButtonClickHandler}>
          {isLogin ? "Log in" : "Create Account"}
        </LoginButton>
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
