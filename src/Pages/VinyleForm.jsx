import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CD from '../asset/cd.png';

const Container = styled.div`
position:relative;
height:1vh;
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 3vh;
`;

const FormContainer = styled.form`
  background-color: #cedfd9;
  border-radius: 1vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 80vw;
  height: 55vh;
  margin-left: 10vw;
  margin-top: 2vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2vh;
  overflow-y: auto; /* Permet le défilement vertical si nécessaire */

  @media (max-width: 500px) {
    display: block;
    width: fit-content;
    height: auto;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 5%;
  animation: ${rotate} 5s linear infinite;
     @media (max-width: 500px) {
    width: 15%;

  }
`;

const Column = styled.div`
  width: 48%;
`;

const StyledContainer = styled.div`
  margin-bottom: 2vh;
   @media (max-width: 500px) {
    display:grid;
  }
`;

const StyledInput = styled.input`
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  font-size: 1.5vw;
  text-align: center;
  border-radius: 1vw;
  margin-left: 10vw;
  margin-top: 2vh;

  @media (max-width: 500px) {
    margin: 0;
    font-size:6vw;
  }
`;

const StyledTitle = styled.h1`
  margin: 0;
  color: black;
  font-size: 1.5vw;
  text-align: center;
   @media (max-width: 500px) {
     font-size: 5vw;
             margin-bottom: 1vh;

  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2vh;
  justify-content: space-around;
`;

const SaveButton = styled.button`
  border-radius: 1vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  background-color: green;
  border: none;
  color: white;
  font-size: xx-large;

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled.button`
  border-radius: 1vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  background-color: red;
  border: none;
  font-size: xx-large;
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

function VinyleForm({ onSaveAndRedirect, onDelete, editData }) {
  const [artistName, setArtistName] = useState('');
  const [label, setLabel] = useState('');
  const [numberOfVinyls, setNumberOfVinyls] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [category, setCategory] = useState('');
  const [vinylCondition, setVinylCondition] = useState('');

  useEffect(() => {
    if (editData) {
      setArtistName(editData.artistName);
      setLabel(editData.label);
      setNumberOfVinyls(editData.numberOfVinyls);
      setAlbumTitle(editData.albumTitle);
      setReleaseDate(editData.releaseDate);
      setCategory(editData.category);
      setVinylCondition(editData.vinylCondition);
    }
  }, [editData]);

  const handleSave = (e) => {
    e.preventDefault();

    const formData = {
      artistName,
      label,
      numberOfVinyls,
      albumTitle,
      releaseDate,
      category,
      vinylCondition,
    };
    console.log('Form Data:', formData);

    onSaveAndRedirect(formData);
  };

  return (
    <>
    <Container>
      <ImageContainer>
        <Title>Création d'un Vinyle</Title>
        <Image src={CD} />
      </ImageContainer>
      <FormContainer onSubmit={handleSave}>
        <Column>
          <StyledContainer>
            <StyledTitle>Artist Name</StyledTitle>
            <StyledInput
              type="text"
              name="artistName"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder={editData?.artistName || 'Enter artist name'}
            />
          </StyledContainer>
          <StyledContainer>
            <StyledTitle>Label</StyledTitle>
            <StyledInput
              type="text"
              name="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={editData?.label || 'Enter label'}
            />
          </StyledContainer>
          <StyledContainer>
            <StyledTitle>Number of Vinyls</StyledTitle>
            <StyledInput
              type="text"
              name="numberOfVinyls"
              value={numberOfVinyls}
              onChange={(e) => setNumberOfVinyls(e.target.value)}
              placeholder={editData?.numberOfVinyls || 'Enter number of vinyls'}
            />
          </StyledContainer>
        </Column>
        <Column>
          <StyledContainer>
            <StyledTitle>Album Title</StyledTitle>
            <StyledInput
              type="text"
              name="albumTitle"
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              placeholder={editData?.albumTitle || 'Enter album title'}
            />
          </StyledContainer>
          <StyledContainer>
            <StyledTitle>Release Date</StyledTitle>
            <StyledInput
              type="text"
              name="releaseDate"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              placeholder={editData?.releaseDate || 'Enter release date'}
            />
          </StyledContainer>
          <StyledContainer>
            <StyledTitle>Category</StyledTitle>
            <StyledInput
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder={editData?.category || 'Enter category'}
            />
          </StyledContainer>
          <StyledContainer>
            <StyledTitle>Vinyl Condition</StyledTitle>
            <StyledInput
              type="text"
              name="vinylCondition"
              value={vinylCondition}
              onChange={(e) => setVinylCondition(e.target.value)}
              placeholder={editData?.vinylCondition || 'Enter vinyl condition'}
            />
          </StyledContainer>
        </Column>
      </FormContainer>
      <ButtonContainer>
        <SaveButton type="submit" onClick={handleSave}>Save your Vinyl</SaveButton>
        {editData && (
          <DeleteButton type="button" onClick={onDelete}>Delete your Vinyl</DeleteButton>
        )}
      </ButtonContainer>
      </Container>
    </>
  );
}

export default VinyleForm;
