import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Avatar from "./common/Avatar";
import { getFormattedDate } from "util/date";

function LetterCard({ letter }) {
  const navigate = useNavigate();

  return (
    <LetterWrapper onClick={() => navigate(`/detail/${letter.id}`)}>
      <UserInfo>
        <Avatar src={letter.avatar} />
        {/* <AvatarFugure>
          <img src={letter.avatar ?? defaultUser} alt="아바타이미지" />
        </AvatarFugure> */}
        <NicknameAndDate>
          <p>{letter.nickname}</p>
          <time>{getFormattedDate(letter.createdAt)}</time>
        </NicknameAndDate>
      </UserInfo>
      <Content>{letter.content}</Content>
    </LetterWrapper>
  );
}

const LetterWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: white;
  padding: 12px;
  border: 1px solid white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
    border: 1px solid #fdb69f;
    transition: 0.2s ease-in-out;
  }
`;
const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const NicknameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  & time {
    font-size: 12px;
  }
`;
const Content = styled.p`
  background-color: gray;
  border-radius: 12px;
  padding: 12px;
  margin-left: 62px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; // 생략부호 (...)
`;
export default LetterCard;
