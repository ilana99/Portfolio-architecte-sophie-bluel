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
    tousBouton.classList.add("selected")



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

    function selectCategory(categoryName, selectedButton) {
        displayImagesParCategory(categoryName);
        tousBouton.classList.remove("selected");
        objetsBouton.classList.remove("selected");
        appartementsBouton.classList.remove("selected");
        hotelsBouton.classList.remove("selected");
        selectedButton.classList.add("selected");
    }

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
        showWorks();
        tousBouton.classList.remove("selected");
        objetsBouton.classList.remove("selected");
        appartementsBouton.classList.remove("selected");
        hotelsBouton.classList.remove("selected");
        tousBouton.classList.add("selected");
    });

}

getWorks();

const form = document.getElementById("form")
const loginBouton = document.getElementById("loginbouton");
const loginMessage = document.querySelector(".login-message");

const loggedinHeader = document.querySelector(".loggedinHeader");
let loggedIn = localStorage.getItem("loggedIn");

let token;

loginBouton.addEventListener("click", function () {
    const email = form.email.value;
    const password = form.password.value;

    function postUser(email, password) {
        fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

function changementsBouton() {
    const button = document.querySelector(".loggedinHeader button");

    button.addEventListener("click", function() {
        console.log("Button clicked!");
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

}

changementsBouton();

const modalFenetre = document.getElementById("modal");
const modalClose = document.querySelector(".fa-solid.fa-xmark");

modalClose.addEventListener("click", function() {
    modalFenetre.style.display = "none"; 
    console.log("ok");
});
   
