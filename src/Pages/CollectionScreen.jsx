import React, { useState } from 'react';
import styled from 'styled-components';
import VinyleForm from './VinyleForm';
import Animation from './Animation'

const Flexbutton = styled.div`
  text-align: center;
  margin-top: ${props => props.showVinyleForm ? '5vh' : '40vh'};
  margin-right: ${props => props.showVinyleForm ? '5vw' : '0'};
  margin-bottom: ${props => props.showVinyleForm ? '5vh' : '0'};
  animation: backInUp 1s;
`;

const VinyleFormContainer = styled.div`
  width: 80vw;
  background-color: #CEDFD9;
  border: 2px solid black;
  border-radius: 10px;
  padding: 10px;
  margin: 10px auto;
`;

const VinyleTitle = styled.h1`
  font-size: 2.5vw;
  color: black;
  font-weight: bold;
`;

const Vinyleflex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VinyleInfo = styled.h2`
  font-size: 1.5vw;
  color: black;
  font-weight: 400;
`;

function CollectionScreen() {
  const [vinyleDataList, setVinyleDataList] = useState([]);
  const [showVinyleForm, setShowVinyleForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSaveAndRedirect = (formData) => {
    if (editData) {
      setVinyleDataList(vinyleDataList.map(vinyle => vinyle === editData ? formData : vinyle));
    } else {
      setVinyleDataList([...vinyleDataList, formData]);
    }
    setShowVinyleForm(false);
    setEditData(null);
  };

  const handleEdit = (vinyle) => {
    setEditData(vinyle);
    setShowVinyleForm(true);
  };

  const handleDelete = (vinyleToDelete) => {
    setVinyleDataList(vinyleDataList.filter(vinyle => vinyle !== vinyleToDelete));
    setShowVinyleForm(false);
    setEditData(null);
  };

  return (
    <>

      <Flexbutton showVinyleForm={showVinyleForm}>
        {!showVinyleForm && (
          <a href="#" className="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick={() => setShowVinyleForm(true)}>Add a New Vinyl Form</a>
        )}
      </Flexbutton>

      {showVinyleForm && (
        <VinyleForm onSaveAndRedirect={handleSaveAndRedirect} editData={editData} onDelete={() => handleDelete(editData)} />
      )}

      {vinyleDataList.map((vinyle, index) => (
        <VinyleFormContainer key={index}>
          <Vinyleflex>
            <VinyleTitle>{vinyle.artistName} - {vinyle.albumTitle} ({vinyle.releaseDate})</VinyleTitle>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => handleEdit(vinyle)}>Edit</button>
          </Vinyleflex>
          <VinyleInfo>{vinyle.label} - {vinyle.releaseDate}</VinyleInfo>
          <Vinyleflex>
            <VinyleInfo>{vinyle.numberOfVinyls}, {vinyle.vinylCondition}</VinyleInfo>
            <VinyleInfo>{vinyle.category}</VinyleInfo>
          </Vinyleflex>
        </VinyleFormContainer>
      ))}
    </>
  );
}

export default CollectionScreen;
