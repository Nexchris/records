import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CD from '../asset/cd.png';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importer Link depuis react-router-dom

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
  width: 50vw;
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





const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2vh;
  justify-content: space-around;
    @media (max-width: 500px) {
  flex-direction: column-reverse;
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

    if (editData) {
      axios
        .put(`http://localhost:8000/api/vinyles/${editData.id}`, formData)
        .then((response) => {
          onSaveAndRedirect(response.data);
          window.location.href = '/'; // Redirection vers la page d'accueil après sauvegarde
        })
        .catch((error) => {
          console.error('There was an error updating the vinyl data!', error);
        });
    } else {
      axios
        .post('http://localhost:8000/api/vinyles', formData)
        .then((response) => {
          onSaveAndRedirect(response.data);
          window.location.href = '/'; // Redirection vers la page d'accueil après sauvegarde
        })
        .catch((error) => {
          // console.error('There was an error saving the vinyl data!', error);
          // console.error('Error Details:', error);
          window.location.href = '/'; // Redirection vers la page d'accueil après sauvegarde
        });
    }
  };

  return (
    <Container>
      <ImageContainer>
        <Title>Vinyl Creation</Title>
        <Image src={CD} />
      </ImageContainer>
      <FormContainer onSubmit={handleSave}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Artist Name
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Album Title
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Label
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Release Date
            </span>
          </div>
          <input
            type="date"
            className="form-control"
            placeholder=""
            aria-label="Release Date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Number of Vinyls
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            value={numberOfVinyls}
            onChange={(e) => setNumberOfVinyls(e.target.value)}
          >
            <option defaultValue>Choose...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Category
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option defaultValue>Choose...</option>
            <option value="Jazz">Jazz</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
          </select>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect02">
              Vinyl Condition
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect02"
            value={vinylCondition}
            onChange={(e) => setVinylCondition(e.target.value)}
          >
            <option defaultValue>Choose...</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Worn">Worn</option>
          </select>
        </div>
      </FormContainer>

      <ButtonContainer>
        <button type="submit" className="btn btn-primary btn-lg" onClick={handleSave}>
          Save your Vinyl
        </button>
        {editData && (
          <button type="submit" className="btn btn-primary btn-lg" style={{ backgroundColor: 'red' }} onClick={onDelete}>
            Delete your Vinyl
          </button>
        )}
        <Link to="/" className="btn btn-secondary btn-lg" onClick={() => window.location.reload()}>
          Back to Collection
        </Link>
      </ButtonContainer>
    </Container>
  );
}

export default VinyleForm;
