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
const loginTest = document.getElementById("loginTest");


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
                // login ok
                console.log(data);
                localStorage.setItem("emailLogin", email);
                localStorage.setItem("passwordLogin", password);
            })
            .catch(error => {
                console.error("Erreur:", error);
            });
    }

    postUser(email, password);

}
);

if (localStorage.getItem("emailLogin") && localStorage.getItem("passwordLogin")) { 
    const email = localStorage.getItem("emailLogin");
    const password = localStorage.getItem("passwordLogin");
    loginTest.innerHTML = "ok";
}