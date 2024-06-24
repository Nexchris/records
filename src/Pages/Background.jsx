// FINI

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const colors = ['#B09398', '#503B31', '#CEDFD9', '#EBFCFB', '#F2BB05'];
const transitionDuration = 2000; // Durée de la transition en ms

// Mon Background animé
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: ${props => props.color};
  transition: background-color ${transitionDuration / 1000}s ease;
  z-index: -1; /* Place le fond en arrière-plan */
   @media (max-width: 1500px) {
    height:150vh;
  }
`;

// Ma grid d'icones musicales
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  position: relative;
  overflow: hidden; /* Cache les icônes qui dépassent */
  height: auto; /* Ajustez cette hauteur selon vos besoins */
   @media (max-width: 1500px) {
    height:100vh;
  }
`;

// Keyframe pour le mouvement des icones musicales
const move = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
`;

// Div pour les icones musicales
const NoteIcon = styled.div`
  font-size: xxx-large;
  text-align: center;
  animation: ${move} 2s infinite;

  @media (max-width: 1000px) {
    font-size: xxx-large;
  }
`;

// 150 Icones musicales
const icons = Array(150).fill('🎵');

const BackgroundChanger = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex(current => (current + 1) % colors.length);
    }, transitionDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <Background color={colors[currentColorIndex]}>
      <Grid>
        {icons.map((icon, index) => (
          <NoteIcon key={index}>{icon}</NoteIcon>
        ))}
      </Grid>
    </Background>
  );
};

export default BackgroundChanger;
