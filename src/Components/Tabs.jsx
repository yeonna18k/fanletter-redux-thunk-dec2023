import React from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setMember } from "redux/modules/memberSlice";

function Tabs() {
  // const { activeMember, setActiveMember } = useContext(MemberContext);
  const activeMember = useSelector((state) => state.member);
  const dispatch = useDispatch();

  const onActiveMember = (event) => {
    if (event.target === event.currentTarget) return;
    // setActiveMember(event.target.textContent);
    dispatch(setMember(event.target.textContent));
  };
  return (
    <TabsWrapper onClick={onActiveMember}>
      <Tab $activeMember={activeMember}>Irene</Tab>
      <Tab $activeMember={activeMember}>Seulgi</Tab>
      <Tab $activeMember={activeMember}>Wendy</Tab>
      <Tab $activeMember={activeMember}>Joy</Tab>
      <Tab $activeMember={activeMember}>Yeri</Tab>
    </TabsWrapper>
  );
}

const TabsWrapper = styled.ul`
  background-color: black;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  gap: 12px;
`;

const Tab = styled.li`
  ${(props) => {
    if (props.$activeMember === props.children) {
      return css`
        color: #fdb69f;
        text-shadow: 0px 0px 10px #fdb69f;
      `;
    }
    return css`
      color: white;
    `;
  }}
  font-family: 'Qwigley', cursive;
  font-size: 40px;
  width: 80px;
  text-align: center;
  padding: 12px 6px;
  cursor: pointer;
  &:hover {
    text-shadow: 0px 0px 10px white;
    transition: 0.2s ease-in-out;
  }
`;

export default Tabs;
