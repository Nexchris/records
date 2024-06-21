import React from 'react';
import styled, { keyframes } from 'styled-components';
import SVG0 from '../asset/svg0.png'; // Remplacez par le chemin de votre SVG
import SVG1 from '../asset/svg1.png'; // Remplacez par le chemin de votre SVG
import SVG2 from '../asset/svg2.png'; // Remplacez par le chemin de votre SVG
import SVG3 from '../asset/svg3.png'; // Remplacez par le chemin de votre SVG
import SVG4 from '../asset/svg4.png'; // Remplacez par le chemin de votre SVG

// Création de l'animation de chute
const fallAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh); /* Chute jusqu'au bas de la fenêtre */
  }
`;

// Création de l'animation de remontée
const upAnimation = keyframes`
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(0); /* Remonter à la position initiale */
  }
`;

// Style du conteneur des SVG
const Container = styled.div`
  position: absolute;
  width: 100%; /* Ajustez selon vos besoins */
  height: 100vh; /* Ajustez selon vos besoins */
`;

// Style des SVG individuels
const FallingSVG = styled.img`
  position: absolute;
  width: 50px; /* Ajustez la taille selon vos besoins */
  height: 50px; /* Ajustez la taille selon vos besoins */
  animation: ${fallAnimation} 5s linear infinite; /* Animation de chute */
`;

function Animation() {
  return (
    <Container>
      <FallingSVG src={SVG0} alt="SVG0" style={{ left: '5%', animationDelay: '0s', animationIterationCount: 'infinite' }} />
      <FallingSVG src={SVG1} alt="SVG1" style={{ left: '20%', animationDelay: '0.1s', animationIterationCount: 'infinite' }} />
      <FallingSVG src={SVG2} alt="SVG2" style={{ left: '40%', animationDelay: '0.2s', animationIterationCount: 'infinite' }} />
      <FallingSVG src={SVG3} alt="SVG3" style={{ left: '60%', animationDelay: '0.3s', animationIterationCount: 'infinite' }} />
      <FallingSVG src={SVG4} alt="SVG4" style={{ left: '80%', animationDelay: '0.4s', animationIterationCount: 'infinite' }} />
    </Container>
  );
}

export default Animation;
