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
  text-align:center;
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
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    // Récupération des données de l'utilisateur à partir de l'API
    axios.get('http://localhost:8000/api/users')
      .then(response => {
        const userData = response.data[0]; // Prendre seulement le premier utilisateur
        setUserId(userData.id);
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

    // Créer l'objet userData avec les données du premier utilisateur seulement
    const userData = {
      id: userId,
      username: username,
      firstName: firstName,
      lastName: lastName,
      gender: gender
    };

    // Envoi des données mises à jour de l'utilisateur
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
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">User</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder={`Username: ${username}`}
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
            placeholder={`First Name: ${firstName}`}
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
            placeholder={`Last Name: ${lastName}`}
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

        <button type="submit" className="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick={() => window.location.reload()}>Update your profile</button>
        
      </FormContainer>
    </>
  );
}

export default User;
