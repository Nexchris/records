import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import VinyleForm from './VinyleForm';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importer Link depuis react-router-dom
import '../App.css';

const Container = styled.div`
height:10vh;
`

const Flexbutton = styled.div`
    text-align: right;
    margin-top: 5vh;
    margin-right: 3vw;
    margin-bottom: 0;
    animation: backInUp 1s;
    display:flex;
    justify-content: space-around;
     @media (max-width: 500px) {
  margin-right:0;
  text-align:center;
  }
`;

const VinyleFormContainer = styled.div`
 width: 70vw;
    background-color: #CEDFD9;
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

const Loader = styled.div`
        position: relative;
    text-align: center;
    margin-top: 35vh;
`

const Loadertext = styled.div`
font-size:2.5vw;
margin-bottom: 2vh;
font-weight: 600;
 @media (max-width: 500px) {
    font-size: x-large;
  }
`

const Loaderitem = styled.div`
text-align:center;
`

function CategoryScreen() {
  const [vinyleDataList, setVinyleDataList] = useState([]);
  const [showVinyleForm, setShowVinyleForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [sqliteFound, setSqliteFound] = useState(false); // State pour vérifier si SQLite est trouvé
  const [loading, setLoading] = useState(true); // State pour indiquer le chargement des données
  const [hasError, setHasError] = useState(false); // State pour indiquer une erreur de connexion
  const [selectedCategory, setSelectedCategory] = useState(''); // State pour la catégorie sélectionnée
  const [editing, setEditing] = useState(false); // State pour indiquer si l'édition est activée

  useEffect(() => {
    axios.get('http://localhost:8000/api/vinyles')
      .then(response => {
        console.log('Response data:', response.data); // Log pour vérifier les données de réponse
        setVinyleDataList(response.data || []); // Assurez-vous de recevoir un tableau de données
        setSqliteFound(true); // Mettre à jour l'état si la requête réussit
        setLoading(false); // Indiquer que le chargement est terminé
        setHasError(false); // Réinitialiser l'état d'erreur en cas de succès
      })
      .catch(error => {
        console.error('There was an error fetching the vinyl data!', error);
        setLoading(false); // Indiquer que le chargement est terminé, même s'il y a eu une erreur
        setHasError(true); // Mettre à jour l'état pour indiquer une erreur de connexion
      });
  }, []);

  useEffect(() => {
    if (sqliteFound && vinyleDataList.length > 0) {
      console.log('SQLite trouvé');
      console.log('Vinyles trouvés:', vinyleDataList); // Log pour vérifier les vinyles trouvés
    }
  }, [sqliteFound, vinyleDataList]);

  const handleSaveAndRedirect = (formData) => {
    if (editData) {
      axios.put(`http://localhost:8000/api/vinyles/${editData.id}`, formData)
        .then(response => {
          setVinyleDataList(vinyleDataList.map(vinyle => vinyle.id === editData.id ? response.data : vinyle));
          setShowVinyleForm(false);
          setEditData(null);
          setEditing(false); // Désactiver l'édition après sauvegarde
        })
        .catch(error => {
          console.error('There was an error updating the vinyl data!', error);
        });
    } else {
      axios.post('http://localhost:8000/api/vinyles', formData)
        .then(response => {
          setVinyleDataList([...vinyleDataList, response.data]);
          setShowVinyleForm(false);
        })
        .catch(error => {
          console.error('There was an error saving the vinyl data!', error);
        });
    }
  };

  const handleEdit = (vinyle) => {
    setEditData(vinyle);
    setShowVinyleForm(true);
        setEditing(true); // Activer l'édition
  };

  const handleDelete = (vinyleToDelete) => {
    axios.delete(`http://localhost:8000/api/vinyles/${vinyleToDelete.id}`)
      .then(() => {
        setVinyleDataList(vinyleDataList.filter(vinyle => vinyle.id !== vinyleToDelete.id));
        setShowVinyleForm(false);
        setEditData(null);
        setEditing(false); // Désactiver l'édition après suppression
      })
      .catch(error => {
        console.error('There was an error deleting the vinyl data!', error);
      });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Fonction pour créer les VinyleFormContainer à partir des données
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

  // Afficher un message si aucune donnée de vinyle n'est disponible
  if (loading) {
    return <Loader>
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
  }

  if (hasError) {
    return <Loader>
      <Loadertext>Network connection failed.</Loadertext>
      <Loaderitem>
        <button
          type="button"
          className="btn btn-danger"
          id="failure-button"
          onClick={() => window.location.reload()}
        >
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
  }

  // JSX pour afficher les VinyleFormContainer ou le formulaire d'ajout
  return (
    <>
      <Container>
        <Flexbutton showVinyleForm={showVinyleForm}>
          {!showVinyleForm && (
            <select className="form-control form-control-lg" id="category" onChange={handleCategoryChange}>
              <option value="" disabled selected>Category</option>
              <option value="">All</option>
              <option value="Jazz">Jazz</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
            </select>
          )}
          {!showVinyleForm && (
               <Link to="/add" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">
               Add a New Vinyl Form
             </Link>
          )}
        </Flexbutton>

        {showVinyleForm && (
          <VinyleForm onSaveAndRedirect={handleSaveAndRedirect} editData={editData} onDelete={() => handleDelete(editData)} />
        )}

        {renderVinyleContainers()}
      </Container>
    </>
  );
}

export default CategoryScreen;
