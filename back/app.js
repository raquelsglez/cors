const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/characters', async (req, res) => {
    const url = `https://rickandmortyapi.com/api/character`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data.results);

    } catch (ERROR) {
        res.status(404).json({error: 'No se encuentra la información'});
    };
});


app.get('/characters/:name', async (req, res) => {
    const name = req.params.name;
    
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const character = response.data.results.find(character => character.name.toLocaleLowerCase() === name);
        
        if (character == undefined){
            throw new Error();
        }

        const characterData = {
            "name": character.name, 
            "status": character.status,
            "species": character.species,
            "gender": character.gender,
            "origin": character.origin.name,
            "image": character.image
        }
        
        res.json(characterData);

    } catch (ERROR) {
        res.status(404).json({error: 'personaje no encontrado'});
    };

});

app.listen(3000, () => {
    console.log('express está escuchando en el puerto http://localhost:3000');
});