import React, { useEffect } from "react";
import styled from "styled-components";
import LetterCard from "./LetterCard";
import { useSelector, useDispatch } from "react-redux";
import { __getLetters } from "redux/modules/lettersSlice";

function LetterList() {
  const dispatch = useDispatch();

  const activeMember = useSelector((state) => state.member);
  const { isLoading, error, letters } = useSelector((state) => state.letters);
  const filteredLetters = letters.filter(
    (letter) => letter.writedTo === activeMember
  );

  useEffect(() => {
    dispatch(__getLetters());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  // console.log(filteredLetters);
  return (
    <ListWrapper>
      {filteredLetters.length === 0 ? (
        <p>Please leave your first letter.</p>
      ) : (
        filteredLetters.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  font-family: "Exo 2", sans-serif;
  background-color: black;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  padding: 12px;
`;

export default LetterList;
