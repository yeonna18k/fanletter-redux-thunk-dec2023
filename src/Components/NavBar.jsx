import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "redux/modules/authSlice";

function NavBar() {
  const auth = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 버튼 클릭 시 텍스트와 똑같은 곳으로 이동
  const onClickHandler = (e) => {
    navigate("/" + e.target.textContent);
  };
  // 로그아웃 시 로그인 토큰 날리고 로그인 화면으로
  const onClickLogoutHandler = () => {
    dispatch(setLogin(null));
    navigate("/login");
  };

  return (
    <Container>
      <Bar>
        <button onClick={onClickHandler}>Home</button>
        <section>
          <button onClick={onClickHandler}>Profile</button>
          <button onClick={onClickLogoutHandler}>Logout</button>
        </section>
      </Bar>
    </Container>
  );
}
const Container = styled.section`
  width: 100%;
  height: 300px;
  background-color: lightpink;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;
const Bar = styled.nav`
  max-width: 800px;
  min-width: 500px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  & button {
    padding: 10px;
    background-color: transparent;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default NavBar;
