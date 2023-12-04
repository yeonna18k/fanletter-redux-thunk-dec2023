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

  const [uploadImg, setUploadImg] = useState();

  // useEffect(() => {
  //   dispatch(setAvatar(localStorage.getItem("avatar")));
  // }, []);
  const imgChangeHandler = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (data) => {
      setUploadImg(file);
    };
  };

  const newImgHandler = async () => {
    const formData = new FormData();
    formData.append("avatar", uploadImg);
    const { data } = await api.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    // console.log(data);
    dispatch(setAvatar(data));
    localStorage.setItem("avatar", data.avatar);
  };

  return (
    <div>
      <Container>
        <ProfileBox>
          <ProfileTitle>Edit Profile</ProfileTitle>
          <label>
            <ProfileFigure>
              <img src={localStorage.getItem("avatar")} alt="아바타이미지" />
            </ProfileFigure>
            <input type="file" accept="image/*" onChange={imgChangeHandler} />
          </label>
          <ProfileNickname>{auth.nickname}</ProfileNickname>
          <ProfileUserId>{auth.userId}</ProfileUserId>
          <ProfileButton>
            <button onClick={newImgHandler}>Edit</button>
            {/* <button>Cancel</button>
            <button>Done</button> */}
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
const ProfileUserId = styled.span``;
const ProfileButton = styled.div`
  & button {
    border: 1px solid white;
    padding: 5px 15px;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default Profile;
