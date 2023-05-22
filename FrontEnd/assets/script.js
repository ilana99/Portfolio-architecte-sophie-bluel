
async function getWorks() {
    let response = await fetch("http://localhost:5678/api/works");
    jsonData = await response.json();
    console.log(jsonData);
    if (jsonData !== null) {
        showWorks(jsonData);
        showWorksModal(jsonData);
    };
}

getWorks();

const gallery = document.getElementById("gallery");

function showWorks(jsonData) {
    for (let i = 0; i < jsonData.length; i++) {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = jsonData[i].imageUrl;

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = jsonData[i].title;

        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
    }
}

const objetsBouton = document.getElementById("objets");
const appartementsBouton = document.getElementById("appartements");
const hotelsBouton = document.getElementById("hotels");
const tousBouton = document.getElementById("tous");
tousBouton.classList.add("selected");


function displayImagesParCategory(categoryName) {
    const imagesParCategory = jsonData.filter(item => item.category.name === categoryName);
    gallery.innerHTML = "";

    for (let j = 0; j < imagesParCategory.length; j++) {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = imagesParCategory[j].imageUrl;

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = imagesParCategory[j].title;

        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
    }
}

function selectCategory(categoryName, selectedButton) {
    displayImagesParCategory(categoryName);
    tousBouton.classList.remove("selected");
    objetsBouton.classList.remove("selected");
    appartementsBouton.classList.remove("selected");
    hotelsBouton.classList.remove("selected");
    selectedButton.classList.add("selected");
};



objetsBouton.addEventListener("click", function () {
    selectCategory("Objets", objetsBouton);
});

appartementsBouton.addEventListener("click", function () {
    selectCategory("Appartements", appartementsBouton);
});

hotelsBouton.addEventListener("click", function () {
    selectCategory("Hotels & restaurants", hotelsBouton);
});

tousBouton.addEventListener("click", function () {
    gallery.innerHTML = "";
    showWorks(jsonData);
    tousBouton.classList.remove("selected");
    objetsBouton.classList.remove("selected");
    appartementsBouton.classList.remove("selected");
    hotelsBouton.classList.remove("selected");
    tousBouton.classList.add("selected");
});


const form = document.getElementById("form")
const loginBouton = document.getElementById("loginbouton");
const loginMessage = document.querySelector(".login-message");



let loggedIn = localStorage.getItem("loggedIn");

let token;

if (loginBouton !== null) {
    loginBouton.addEventListener("click", function () {
        const email = form.email.value;
        const password = form.password.value;

        function postUser(email, password) {
            fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    localStorage.setItem("email", email);
                    localStorage.setItem("password", password);
                    localStorage.setItem("token", data.token);
                    token = data.token;
                })
                .catch(error => {
                    console.error("Erreur:", error);
                });
        }

        postUser(email, password);
    }
    );
};

const aside = document.getElementById("modal");
const galleryModal = document.getElementById("galleryModal");


function generateModal1() {
    const divParent = document.createElement("div");
    divParent.setAttribute("id", "modal1");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-xmark", "closeButton");

    const titre = document.createElement("h3");
    titre.innerHTML = "Galerie photo";

    const divGallery = document.createElement("div");
    divGallery.setAttribute("id", "galleryModal");

    showWorksModal(jsonData, divGallery);

    const hr = document.createElement("hr");

    const boutonAjout = document.createElement("button");
    boutonAjout.setAttribute("id", "ajout");
    boutonAjout.innerHTML = "Ajouter une photo";
    const suppBouton = document.createElement("button");
    suppBouton.setAttribute("id", "supprimer");
    suppBouton.innerHTML = "Supprimer la galerie";

    divParent.appendChild(icon);
    divParent.appendChild(titre);
    divParent.appendChild(divGallery);
    divParent.appendChild(hr);
    divParent.appendChild(boutonAjout);
    divParent.appendChild(suppBouton);

    aside.appendChild(divParent);

    icon.addEventListener("click", function () {
        modalFenetre.style.display = "none";
        aside.innerHTML = "";
    })

    boutonAjout.addEventListener("click", function () {
        aside.innerHTML = "";
        const modal2 = generateModal2();
        aside.appendChild(modal2);
    })
}


function generateModal2() {
    const divParent = document.createElement("div");
    divParent.setAttribute("id", "modal2");

    divParent.style.display = "flex";

    const divNav = document.createElement("div");
    divNav.setAttribute("id", "navigation-modal");

    const icon2 = document.createElement("i");
    icon2.classList.add("fa-solid", "fa-arrow-left");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-xmark", "closeButton");

    const titre = document.createElement("h3");
    titre.innerHTML = "Ajout photo";

    const divAjoutPhoto = document.createElement("div");
    divAjoutPhoto.setAttribute("id", "ajoutPhoto");

    const iconPhoto = document.createElement("i");
    iconPhoto.classList.add("fa-solid", "fa-image");

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("id", "imageUpload");
    input.setAttribute("accept", ".png, .jpg, .jpeg");

    const label = document.createElement("label");
    label.setAttribute("id", "ajoutPhoto2");
    label.setAttribute("for", "imageUpload");
    label.innerHTML = "+Ajouter photo";

    const p = document.createElement("p");
    p.innerHTML = ".jpg, .png : 4mo max.";

    const labelTitre = document.createElement("label");
    labelTitre.setAttribute("for", "titre");
    labelTitre.innerHTML = "Titre";

    const inputTitre = document.createElement("input");
    inputTitre.setAttribute("type", "text");
    inputTitre.setAttribute("name", "titre");
    inputTitre.setAttribute("id", "inputitre");


    const labelCat = document.createElement("label");
    labelCat.setAttribute("for", "categoriesModal");
    labelCat.innerHTML = "Catégorie";

    const select = document.createElement("select");
    select.setAttribute("name", "categoriesModal");
    select.setAttribute("id", "categoriesModal");

    const option1 = document.createElement("option");
    option1.setAttribute("value", "1");
    option1.innerHTML = "Objets";

    const option2 = document.createElement("option");
    option2.setAttribute("value", "2");
    option2.innerHTML = "Appartements";

    const option3 = document.createElement("option");
    option3.setAttribute("value", "3");
    option3.innerHTML = "Hôtels & restaurants";

    const hr = document.createElement("hr");

    const button = document.createElement("button");
    button.setAttribute("id", "valider");
    button.innerHTML = "Valider";

    aside.appendChild(divParent);

    divParent.appendChild(divNav);
    divParent.appendChild(divAjoutPhoto);
    divParent.appendChild(labelTitre);
    divParent.appendChild(inputTitre);
    divParent.appendChild(labelCat);
    divParent.appendChild(select);
    divParent.appendChild(hr);
    divParent.appendChild(button);

    divNav.appendChild(icon2);
    divNav.appendChild(icon);

    divAjoutPhoto.appendChild(iconPhoto);
    divAjoutPhoto.appendChild(input);
    divAjoutPhoto.appendChild(label);
    divAjoutPhoto.appendChild(p);

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);

    icon2.addEventListener("click", function () {
        aside.innerHTML = "";
        const modal1 = generateModal1();
        aside.appendChild(modal1);
    })

    button.addEventListener("click", function() {
        postWorks();
    })


};

function postWorks() {
    const titreInput = document.getElementById("inputitre").value;

    const choixCategorie = document.getElementById("categoriesModal").value;

    const image = document.getElementById("imageUpload").files[0];

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", titreInput);
    formData.append("category", choixCategorie);


    fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("post ok");
        })
        .catch(error => {
            console.error("Erreur:", error);
        });

}

if (localStorage.getItem("token")) {
    const docHeader = document.querySelector("header");
    var headerParent = docHeader.parentNode;

    const sectionHeader = document.createElement("section");
    sectionHeader.classList.add("loggedinHeader");


    var childSection = [
        document.createElement("div"),
        document.createElement("button")
    ];

    childSection.forEach(function (childElement) {
        sectionHeader.appendChild(childElement);
    })

    childSection[1].innerHTML = '<a href="#">publier les changements</a>';

    var childDiv = [
        document.createElement("i"),
        document.createElement("p")
    ];

    childDiv.forEach(function (childElement) {
        childSection[0].appendChild(childElement);
    });

    childDiv[0].classList.add("fa-regular", "fa-pen-to-square");
    childDiv[1].innerHTML = '<a href="#">Mode édition</a>';

    headerParent.insertBefore(sectionHeader, docHeader);

    loginBouton.innerHTML = "logout";

    loginBouton.addEventListener("click", function () {
        logOut();
    })

    const modeEditionBouton = childSection[0];

    modeEditionBouton.addEventListener("click", function () {
        modalFenetre.style.display = "flex";
        sectionHeader.style.position = "sticky";
        generateModal1();
    })
};


function logOut() {
    button.innerHTML = "logout";
    localStorage.clear();
};


const modalFenetre = document.getElementById("modal");

const closeButton = document.querySelector(".closeButton");
const ajoutButton = document.getElementById("ajout");
const modal1 = document.getElementById("modal1");


function showWorksModal(jsonData, galleryModal) {
    for (let i = 0; i < jsonData.length; i++) {
        const div = document.createElement("div");

        const img = document.createElement("img");
        img.src = jsonData[i].imageUrl;

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can");

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = "éditer";

        if (galleryModal) {
            galleryModal.appendChild(div);
        }
        div.appendChild(img);
        div.appendChild(icon);
        div.appendChild(figcaption);

        if (galleryModal) {
            galleryModal.appendChild(div);
        }
    }
}




modalFenetre.addEventListener("click", function (event) {
    if (event.target === modal) {
        modalFenetre.style.display = "none";
        aside.innerHTML = "";
    }
});



