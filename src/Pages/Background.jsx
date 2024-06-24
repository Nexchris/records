import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animation du dégradé
const animateGradient = keyframes`
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 50%; }
  75% { background-position: 0% 50%; }
`;

// Styles du fond avec les couleurs spécifiées
const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 200vh;
  background: linear-gradient(-45deg,  #F2BB05, #EBFCFB, #CEDFD9);
  background-size: 400% 400%;
  animation: ${animateGradient} 5s ease infinite;
  z-index: -1; /* Mettre le z-index le plus faible pour être derrière les autres éléments */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Icône de musique animée (exemple)
const MusicIcon = styled.div`
  font-size: 48px;
  animation: ${keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  `} 2s linear infinite;
`;

const Background = () => {
  return (
    <BackgroundContainer>
      {/* Ajoutez d'autres icônes de musique ou éléments ici */}
    </BackgroundContainer>
  );
};

export default Background;
