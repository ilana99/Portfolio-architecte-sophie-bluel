const gallery = document.getElementById("gallery");
const objetsBouton = document.getElementById("objets");
const appartementsBouton = document.getElementById("appartements");
const hotelsBouton = document.getElementById("hotels");
const tousBouton = document.getElementById("tous");
const form = document.getElementById("form")
const loginBouton = document.getElementById("loginbouton");
const loginLien = document.getElementById("loginlien");
const loginMessage = document.querySelector(".login-message");
let token;
const aside = document.getElementById("modal");


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


function showWorks(jsonData) {
    for (let i = 0; i < jsonData.length; i++) {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = jsonData[i].imageUrl;

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = jsonData[i].title;

        if (gallery !== null) {
            gallery.appendChild(figure);
        }
        figure.appendChild(img);
        figure.appendChild(figcaption);
    }
}


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

if (tousBouton !== null) {
    tousBouton.classList.add("selected");

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

}

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
        aside.style.display = "none";
        aside.innerHTML = "";
    })


    boutonAjout.addEventListener("click", function () {
        aside.innerHTML = "";
        aside.append(generateModal2());
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

    const inputPhoto = document.createElement("input");
    inputPhoto.setAttribute("type", "file");
    inputPhoto.setAttribute("id", "imageUpload");
    inputPhoto.setAttribute("accept", ".png, .jpg, .jpeg");

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
    divAjoutPhoto.appendChild(inputPhoto);
    divAjoutPhoto.appendChild(label);
    divAjoutPhoto.appendChild(p);

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);


    icon2.addEventListener("click", function () {
        aside.innerHTML = "";
        aside.append(generateModal1());
    })

    button.addEventListener("click", function () {
        postWorks();
    })
/*
    inputPhoto.addEventListener("change", function () {
        const image = inputPhoto.files[0];
        const imageUrl = URL.createObjectURL(image);

        iconPhoto.style.display = "none";

        const imagePreview = document.createElement("img");
        imagePreview.setAttribute = ("src", imageUrl);
        imagePreview.setAttribute("alt", "prévisualisation de la photo");
        imagePreview.setAttribute("id", "photopreview");

        divAjoutPhoto.appendChild(imagePreview);

        URL.revokeObjectURL(imageUrl);

    }) */
};

function postWorks() {
    const imageUpload = document.getElementById("imageUpload");
    const titreInput = document.getElementById("inputitre").value;
    const choixCategorie = document.getElementById("categoriesModal").value;

    let binaryString = "";

    imageUpload.addEventListener("change", function (event) {
        const fileName = imageUpload.files[0].name;
        binaryString = stringToBinary(fileName);
    })

    const categorie = parseInt(choixCategorie);

    const formData = new FormData();
    formData.append("image", binaryString);
    formData.append("title", titreInput);
    formData.append("category", categorie);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("");
            }
            return response.json();
        })
        .then(data => {
            console.log("post ok");
        })
        .catch(error => {
            console.error("Erreur:", error);
        });
};


function stringToBinary(str) {
    let binaryString = '';

    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        const binaryValue = charCode.toString(2);
        binaryString += binaryValue.padStart(8, '0');
    }

    return binaryString;
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


    loginLien.innerHTML = "logout";

    loginLien.addEventListener("click", function () {
        localStorage.clear();
    })

    const modeEditionBouton = childSection[0];

    modeEditionBouton.addEventListener("click", function () {
        aside.style.display = "flex";
        sectionHeader.style.position = "sticky";
        generateModal1();
    })
};


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

if (aside !== null) {
    aside.addEventListener("click", function (event) {
        if (event.target === modal) {
            aside.style.display = "none";
            aside.innerHTML = "";
        }
    });
}


