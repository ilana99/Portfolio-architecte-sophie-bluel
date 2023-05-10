var jsonData;

async function getWorks() {
    let response = await fetch("http://localhost:5678/api/works");
    var jsonData = await response.json();
    console.log(jsonData);
}

getWorks();

function afficherWorks() {
    const gallery = document.getElementById("gallery");
    for (let i = 0; i < 11; i++) {
        const figure = document.createElement("figure");
        gallery.appendChild(figure);
        const img = document.createElement("img");
        img.src = jsonData[i].imageUrl;
        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = jsonData[i].title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
    }
}

afficherWorks();


const buttons = document.querySelector("button");

const tousBouton = document.getElementById("tous");
const objetsBouton = document.getElementById("objets");
const appartementsBouton = document.getElementById("appartements");
const hotelsBouton = document.getElementById("hotels");

tousBouton.addEventListener("click", function () {

});
objetsBouton.addEventListener("click", function () {

});
appartementsBouton.addEventListener("click", function () {

});
hotelsBouton.addEventListener("click", function () {

});
