import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

function User() {
  const [userId, setUserId] = useState(null); // Ajout de l'état pour l'identifiant de l'utilisateur
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    // Exemple : récupération des données de l'utilisateur à partir de l'API
    axios.get('http://localhost:8000/api/users/1') // Remplacez 1 par l'identifiant réel de l'utilisateur à modifier
      .then(response => {
        const userData = response.data;
        setUserId(userData.id); // Définition de l'identifiant de l'utilisateur dans l'état
        setUsername(userData.username);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setGender(userData.gender);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, firstName, lastName, gender };

    // Assurez-vous que l'identifiant de l'utilisateur est inclus dans les données envoyées
    axios.put(`http://localhost:8000/api/users/${userId}`, userData)
      .then(response => {
        console.log('User data updated successfully', response.data);
        // Vous pouvez rediriger ou afficher un message de réussite ici
      })
      .catch(error => {
        console.error('There was an error updating user data!', error);
      });
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">User</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">First Name</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label="FirstName"
            aria-describedby="basic-addon1"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Last Name</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label="LastName"
            aria-describedby="basic-addon1"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option defaultValue>Choose...</option>
            <option value="Masculine">Masculine</option>
            <option value="Female">Female</option>
            <option value="Gender Neutral">Gender Neutral</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Update your profile</button>
      </FormContainer>
    </>
  );
}

export default User;
