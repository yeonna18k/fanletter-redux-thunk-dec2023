import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import defaultUser from "assets/icon.svg";
import { setAvatar } from "redux/modules/authSlice";
import api from "../axios/api";

function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [img, setImg] = useState(auth.avatar);
  const [uploadImg, setUploadImg] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const [editNickname, setEditNickname] = useState(auth.nickname);

  const imgChangeHandler = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      setImg(data.target.result);
    };
    setUploadImg(file);
  };

  const newImgHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", uploadImg);
      const { data } = await api.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(data);
      dispatch(setAvatar(data));
      localStorage.setItem("avatar", data.avatar);
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };
  const onClickEdit = () => {
    setIsEditing(true);
  };
  const onClickCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <Container>
        <ProfileBox>
          <ProfileTitle>Edit Profile</ProfileTitle>
          <label>
            <ProfileFigure>
              <img
                src={img ?? localStorage.getItem("avatar")}
                alt="아바타이미지"
              />
            </ProfileFigure>
            <input type="file" accept="image/*" onChange={imgChangeHandler} />
          </label>
          {isEditing === false ? (
            <ProfileNickname>{auth.nickname}</ProfileNickname>
          ) : (
            <ProfileEditInput>
              <input
                type="text"
                placeholder="auth.nickname"
                value={editNickname}
                onChange={(e) => setEditNickname(e.target.value)}
              />{" "}
            </ProfileEditInput>
          )}

          <ProfileUserId>{auth.userId}</ProfileUserId>
          <ProfileButton>
            {isEditing === false ? (
              <button onClick={onClickEdit}>Edit</button>
            ) : (
              <>
                <button onClick={onClickCancel}>Cancel</button>
                <button onClick={newImgHandler}>Done</button>
              </>
            )}
          </ProfileButton>
        </ProfileBox>
      </Container>
    </div>
  );
}
const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileBox = styled.main`
  width: 600px;
  height: 400px;
  background-color: #fdb69f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 35px;
  & input {
    display: none;
  }
`;
const ProfileTitle = styled.h1`
  font-size: 36px;
  font-weight: bolder;
`;
const ProfileFigure = styled.div`
  & img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: white;
  }
`;
const ProfileNickname = styled.span`
  font-size: 24px;
  font-weight: bolder;
`;
const ProfileEditInput = styled.div`
  border: 1px solid white;

  height: 36px;
  width: 200px;
  margin: 0 auto;
`;
const ProfileUserId = styled.span``;
const ProfileButton = styled.div`
  & button {
    border: 1px solid white;
    padding: 5px 15px;
    margin: 10px;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default Profile;
