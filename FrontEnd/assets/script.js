async function getWorks() {
    let response = await fetch("http://localhost:5678/api/works");
    let jsonData = await response.json();
    console.log(jsonData);

    const gallery = document.getElementById("gallery");
    function showWorks() {
       
        for (let i = 0; i < jsonData.length; i++) {
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

    showWorks();
    
    const objetsBouton = document.getElementById("objets");
    const appartementsBouton = document.getElementById("appartements");
    const hotelsBouton = document.getElementById("hotels");
    const tousBouton = document.getElementById("tous");

    function displayImagesParCategory(categoryName) {
        const imagesParCategory = jsonData.filter(item => item.category.name === categoryName);
        gallery.innerHTML = "";

        for (let j = 0; j < imagesParCategory.length; j++) {
            const figure = document.createElement("figure");
            gallery.appendChild(figure);
            const img = document.createElement("img");
            img.src = imagesParCategory[j].imageUrl;
            const figcaption = document.createElement("figcaption");
            figcaption.innerHTML = imagesParCategory[j].title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
        }
    }

    objetsBouton.addEventListener("click", function () {
        displayImagesParCategory("Objets");
    });

    appartementsBouton.addEventListener("click", function () {
        displayImagesParCategory("Appartements");
    });

    hotelsBouton.addEventListener("click", function () {
        displayImagesParCategory("Hotels & restaurants");
    });

    tousBouton.addEventListener("click", function () {
        gallery.innerHTML = "";
        showWorks();
    });

}

getWorks();

