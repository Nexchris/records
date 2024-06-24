import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CD from '../asset/cd.png';

const Container = styled.div`
  position: relative;
`;

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
  margin-left: 25vw;
  margin-top: 2vh;
width:50vw;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2vh;
  overflow-y: auto;

  @media (max-width: 500px) {
    display: block;
        width: 90vw;
        margin-left: 5vw;
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
    font-size: 6vw;
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
    <Container>
      <ImageContainer>
        <Title>Vinyl Creation</Title>
        <Image src={CD} />
      </ImageContainer>
      <FormContainer onSubmit={handleSave}>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Artist Name</span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Album Title</span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
            />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Label</span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Release Date</span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </div>


      

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" htmlFor="inputGroupSelect01">Number of Vinyls</label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              value={category}
              onChange={(e) => setNumberOfVinyls(e.target.value)}
            >
              <option selected>Choose...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" htmlFor="inputGroupSelect01">Category</label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option selected>Choose...</option>
              <option value="Jazz">Jazz</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
            </select>
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" htmlFor="inputGroupSelect02">Vinyl Condition</label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect02"
              value={vinylCondition}
              onChange={(e) => setVinylCondition(e.target.value)}
            >
              <option selected>Choose...</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="worn">Worn</option>
            </select>
          </div>
      </FormContainer>

      <ButtonContainer>

        <button type="sumbit" class="btn btn-primary btn-lg"  onClick={handleSave} >Save your Vinyl</button>
        {editData && (
        <button type="submit" className="btn btn-primary btn-lg" style={{ backgroundColor: 'red' }} onClick={onDelete}>Delete your Vinyl</button>

        )}
      </ButtonContainer>
    </Container>
  );
}

export default VinyleForm;
