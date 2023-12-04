import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "Components/common/Avatar";
import { getFormattedDate } from "util/date";
import Button from "Components/common/Button";
import { useSelector, useDispatch } from "react-redux";
import { __deleteLetters, __patchLetters } from "redux/modules/lettersSlice";

function Detail() {
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.letters.letters);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, SetEditingText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { avatar, nickname, createdAt, writedTo, content, userId } =
    letters.find((letter) => letter.id === id);

  const onEditDone = () => {
    if (!editingText) return alert("There are no modifications");
    dispatch(__patchLetters({ id, content: editingText }));
    setIsEditing(false);
    SetEditingText("");
  };
  const onDeleteBtn = () => {
    const answer = window.confirm("Are you sure want to delete?");
    if (!answer) return;
    dispatch(__deleteLetters(id));
    // const newLetters = letters.filter((letter) => letter.id !== id);
    //     setLetters(newLetters);
    navigate("/");
  };
  return (
    <Container>
      <Link to="/">
        <HomeBtn>
          <Button text="Home" color="black" />
        </HomeBtn>
      </Link>
      <DetailWrapper>
        <UserInfo>
          <AvatarAndNickname>
            <Avatar src={avatar} size="large" />
            <Nickname>{nickname}</Nickname>
          </AvatarAndNickname>
          <time>{getFormattedDate(createdAt)}</time>
        </UserInfo>
        <ToMember>To. {writedTo}</ToMember>
        {isEditing ? (
          <>
            <Textarea
              autoFocus
              defaultValue={content}
              onChange={(e) => SetEditingText(e.target.value)}
            />
            <BtnWrapper>
              <Button text="Undo" onClick={() => setIsEditing(false)} />
              <Button text="Done" onClick={onEditDone} />
            </BtnWrapper>
          </>
        ) : (
          <>
            <Content>{content}</Content>
            {userId == window.localStorage.getItem("userId") ? (
              <BtnWrapper>
                <Button text="Modify" onClick={() => setIsEditing(true)} />
                <Button text="Delete" onClick={onDeleteBtn} />
              </BtnWrapper>
            ) : null}
          </>
        )}
      </DetailWrapper>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Exo 2", sans-serif;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const HomeBtn = styled.div`
  background-color: black;
  position: absolute;
  top: 20px;
  left: 20px;
  border: none;
  & button {
    border: 1px solid white;
    padding: 10px 15px;
    background-color: black;
    cursor: pointer;
    font-family: "Exo 2", sans-serif;
    font-weight: 600;
    &:hover {
      border: 1px solid #fdb69f;
      transition: 0.2s ease-in-out;
    }
  }
`;

const DetailWrapper = styled.section`
  background-color: #fdb69f;
  color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 700px;
  min-height: 400px;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AvatarAndNickname = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Nickname = styled.span`
  font-size: 32px;
`;
const ToMember = styled.span`
  font-size: 24px;
`;
const Content = styled.p`
  font-size: 24px;
  line-height: 30px;
  padding: 24px;
  background-color: #8d8c8c;
  border-radius: 12px;
  height: 220px;
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  & button {
    background-color: #fdb69f;
    border: 1px solid white;
    padding: 10px;
    font-weight: 600;
    &:hover {
      border: 1px solid #8d8c8c;
      transition: 0.2s ease-in-out;
    }
  }
`;

const Textarea = styled.textarea`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background-color: #8d8c8c;
  border-radius: 12px;
  height: 220px;
  resize: none;
  color: white;
`;
export default Detail;
