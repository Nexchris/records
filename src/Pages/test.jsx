// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
    const [text, setText] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/hello')
            .then(response => {
                setText(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du texte :', error);
            });
    }, []);

    return (
        <div>
            <h1>Texte depuis Symfony</h1>
            <p>{text}</p>
        </div>
    );
}

export default Test;
