function getCharacterInfo() {
    const characterNameInput = document.getElementById('characterName');
    const characterInfo = document.getElementById('characterInfo');

    const characterName = characterNameInput.value.toLocaleLowerCase();

    if (characterName == '') {
        characterInfo.innerHTML = `<p>Debes rellenar el campo</p>`;
        return
    }

    fetch(`http://localhost:3000/characters/${characterName}`)
    .then(response => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    })
    .then(data => {
        const {name, status, species, gender, origin, image} = data;
        characterInfo.innerHTML = `
        <div class='info'>
            <h2>${name}</h2>
            <p>${status}</p>
            <p>${species}</p>
            <p>${gender}</p>
            <p>${origin}</p>
        <img src='${image}' alt='${name}'/>
        `
    })
    .catch (error => characterInfo.innerHTML = `<p>No se encontró el personaje</p>`);
};
