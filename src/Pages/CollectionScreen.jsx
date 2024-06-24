import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import VinyleForm from './VinyleForm';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importer Link depuis react-router-dom
import '../App.css';

const Container = styled.div`
`;

const Flexbutton = styled.div`
  text-align: right;
  margin-top: 5vh;
  margin-right: 3vw;
  margin-bottom: 0;
  animation: backInUp 1s;
  @media (max-width: 500px) {
    margin-right: 0;
    text-align: center;
  }
`;

const VinyleFormContainer = styled.div`
  width: 70vw;
  background-color: #cedfd9;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;
  margin-left: 13vw;
  margin-top: 2vh;
  margin-bottom: 3vh;
`;

const VinyleTitle = styled.h1`
  font-size: 2.5vw;
  color: black;
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: large;
  }
`;

const Vinyleflex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VinyleInfo = styled.h2`
  font-size: 1.5vw;
  color: black;
  font-weight: 400;
  @media (max-width: 500px) {
    font-size: large;
  }
`;

const Loadercontainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5); /* 0.5 représente l'opacité */
  border-radius: 10vw;
  margin-left: 25vw;
  width: 50vw;
  @media (max-width: 500px) {
    width: 75vw;
    margin-left: 13vw;
  }
`;

const Loader = styled.div`
  position: relative;
  text-align: center;
  margin-top: 35vh;
  @media (max-width: 500px) {
    margin-top: 35vh;
  }
`;

const Loadertext = styled.div`
  font-size: 2.5vw;
  margin-bottom: 2vh;
  padding-top: 3vh;
  color: black;
  font-weight: 600;
  @media (max-width: 500px) {
    font-size: x-large;
  }
`;

const Loaderitem = styled.div`
  text-align: center;
`;

function CollectionScreen() {
  const [vinyleDataList, setVinyleDataList] = useState([]);
  const [showVinyleForm, setShowVinyleForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [sqliteFound, setSqliteFound] = useState(false); // State pour vérifier si SQLite est trouvé
  const [loading, setLoading] = useState(true); // State pour indiquer le chargement des données
  const [hasError, setHasError] = useState(false); // State pour indiquer une erreur de connexion
  const [editing, setEditing] = useState(false); // State pour indiquer si l'édition est activée

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/vinyles')
      .then((response) => {
        console.log('Response data:', response.data);
        setVinyleDataList(response.data || []);
        setSqliteFound(true);
        setLoading(false);
        setHasError(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the vinyl data!', error);
        setLoading(false);
        setHasError(true);
      });
  }, []);

  useEffect(() => {
    if (sqliteFound && vinyleDataList.length > 0) {
      console.log('SQLite trouvé');
      console.log('Vinyles trouvés:', vinyleDataList);
    }
  }, [sqliteFound, vinyleDataList]);

  const handleSaveAndRedirect = (formData) => {
    if (editData) {
      axios
        .put(`http://localhost:8000/api/vinyles/${editData.id}`, formData)
        .then((response) => {
          setVinyleDataList((vinyles) =>
            vinyles.map((vinyle) => (vinyle.id === editData.id ? response.data : vinyle))
          );
          setShowVinyleForm(false);
          setEditData(null);
          setEditing(false); // Désactiver l'édition après sauvegarde
        })
        .catch((error) => {
          console.error('There was an error updating the vinyl data!', error);
        });
    } else {
      axios
        .post('http://localhost:8000/api/vinyles', formData)
        .then((response) => {
          setVinyleDataList([...vinyleDataList, response.data]);
          setShowVinyleForm(false);
        })
        .catch((error) => {
          console.error('There was an error saving the vinyl data!', error);
          console.error('Error Details:', error);
        });
    }
  };

  const handleEdit = (vinyle) => {
    setEditData(vinyle);
    setShowVinyleForm(true);
    setEditing(true); // Activer l'édition
  };

  const handleDelete = (vinyleToDelete) => {
    axios
      .delete(`http://localhost:8000/api/vinyles/${vinyleToDelete.id}`)
      .then(() => {
        setVinyleDataList((vinyles) => vinyles.filter((vinyle) => vinyle.id !== vinyleToDelete.id));
        setShowVinyleForm(false);
        setEditData(null);
        setEditing(false); // Désactiver l'édition après suppression
      })
      .catch((error) => {
        console.error('There was an error deleting the vinyl data!', error);
      });
  };

  const renderVinyleContainers = () => {
    if (!editing) {
      return vinyleDataList.map((vinyle) => (
        <VinyleFormContainer key={vinyle.id}>
          <Vinyleflex>
            <VinyleTitle>
              {vinyle.artistName} - {vinyle.albumTitle} ({new Date(vinyle.releaseDate).toLocaleDateString()})
            </VinyleTitle>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => handleEdit(vinyle)}>
              Edit
            </button>
          </Vinyleflex>
          <VinyleInfo>
            {vinyle.label} - {new Date(vinyle.releaseDate).toLocaleDateString()}
          </VinyleInfo>
          <Vinyleflex>
            <VinyleInfo>
              {vinyle.numberOfVinyls}, {vinyle.vinylCondition}
            </VinyleInfo>
            <VinyleInfo>{vinyle.category}</VinyleInfo>
          </Vinyleflex>
        </VinyleFormContainer>
      ));
    } else {
      return null; // Ne rien rendre si l'édition est active
    }
  };

  if (loading) {
    return (
      <Loadercontainer>
        <Loader>
          <Loadertext>Connecting to the network,</Loadertext>
          <Loadertext> searching for vinyl records...</Loadertext>
          <br />
          <Loaderitem>
            <div className="spinner-grow text-primary" role="status" id="rosy">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status" id="brown">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status" id="azure">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status" id="white">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status" id="yellow">
              <span className="sr-only">Loading...</span>
            </div>
          </Loaderitem>
        </Loader>
      </Loadercontainer>
    );
  }

  if (hasError) {
    return (
      <Loadercontainer>
        <Loader>
          <Loadertext>Network connection failed.</Loadertext>
          <Loaderitem>
            <button type="button" className="btn btn-danger" id="failure-button" onClick={() => window.location.reload()}>
              Restart
            </button>
          </Loaderitem>
          <br />
          <Loaderitem>
            <div className="spinner-grow text-primary" id="red" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" id="red" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" id="red" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" id="red" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" id="red" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </Loaderitem>
        </Loader>
      </Loadercontainer>
    );
  }

  return (
    <>
      <Container>
        <Flexbutton showVinyleForm={showVinyleForm}>
          {!showVinyleForm && (
            <Link to="/add" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">
              Add a New Vinyl Form
            </Link>
          )}
        </Flexbutton>

        {showVinyleForm && <VinyleForm onSaveAndRedirect={handleSaveAndRedirect} editData={editData} onDelete={() => handleDelete(editData)} />}

        {renderVinyleContainers()}
      </Container>
    </>
  );
}

export default CollectionScreen;
