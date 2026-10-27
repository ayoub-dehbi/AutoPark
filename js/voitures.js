import { voituresInitiales } from './data.js';

let cars = voituresInitiales;
// console.log(cars);


const formulaire_voiture = document.getElementById("formulaire-voiture")
const marque = document.getElementById("marque")
const modele = document.getElementById("modele")
const immatriculation = document.getElementById("immatriculation")
const categorie = document.getElementById("categorie")
const prix_jour = document.getElementById("prix-jour")
const statut = document.getElementById("statut")
const bouton_enregistrer = document.getElementById("bouton-enregistrer")
const annuler_modification = document.getElementById("annuler-modification")
const liste_voitures = document.getElementById("liste-voitures")

const recherche = document.getElementById("recherche")


if (localStorage.getItem("cars")) 
    cars = JSON.parse(localStorage.getItem("cars"))
else
    localStorage.setItem("cars",JSON.stringify(cars))



let edit_car
let id_car = 6

let edit_checker = 0

display(cars)

function add() {
    let add_car = {}
    add_car.id = id_car++
    add_car.marque = marque.value
    add_car.modele = modele.value
    add_car.immatriculation = immatriculation.value
    add_car.categorie = categorie.value
    add_car.prixJour = prix_jour.value
    add_car.statut = statut.value
    cars.push(add_car)

    localStorage.setItem("cars", JSON.stringify(cars))

}


function display(cars) {
    liste_voitures.innerHTML = ""
    if (cars.length === 0)
        return


    cars.forEach(element => {
        const tr = document.createElement("tr")

        const td1 = document.createElement("td")
        const strong = document.createElement("strong")
        strong.textContent = element.marque
        td1.appendChild(strong)

        const td2 = document.createElement("td")
        td2.textContent = element.modele

        const td3 = document.createElement("td")
        const span1 = document.createElement("span")
        span1.textContent = element.immatriculation
        span1.className = "registration"
        td3.appendChild(span1)

        const td4 = document.createElement("td")
        td4.textContent = element.categorie

        const td5 = document.createElement("td")
        td5.textContent = element.prixJour
        td5.className = "price"
        const span2 = document.createElement("span")
        span2.textContent = "DH / jour"
        td5.appendChild(span2)

        const td6 = document.createElement("td")
        const span3 = document.createElement("span")
        span3.textContent = element.statut
        span3.className = "badge badge-disponible"
        td6.appendChild(span3)

        const td7 = document.createElement("td")
        const div = document.createElement("div")
        div.className = "row-actions"

        const Modifier = document.createElement("button")
        Modifier.textContent = "Modifier"
        Modifier.className = "button button-edit"
        Modifier.setAttribute("type", "button")
        Modifier.addEventListener("click", () => (edite(element.id)))
        div.appendChild(Modifier)


        const Supprimer = document.createElement("button")
        Supprimer.textContent = "Supprimer"
        Supprimer.className = "button button-delete"
        Supprimer.setAttribute("type", "button")
        Supprimer.addEventListener("click", () => (delet(element.id)))
        div.appendChild(Supprimer)

        td7.append(div)

        tr.append(td1, td2, td3, td4, td5, td6, td7)


        liste_voitures.appendChild(tr)

    });
}
function delet(id) {
    cars = cars.filter(item => item.id !== id)
    console.log(cars)
    display(cars)
    localStorage.setItem("cars", JSON.stringify(cars))
}

function edite(id) {
    edit_checker = id
    edit_car = cars.find(item => item.id == id)
    console.log(edit_car);

    marque.value = edit_car.marque
    modele.value = edit_car.modele
    immatriculation.value = edit_car.immatriculation
    categorie.value = edit_car.categorie
    prix_jour.value = edit_car.prixJour
    statut.value = edit_car.statut
    annuler_modification.hidden = false


}


bouton_enregistrer.addEventListener("click", (e) => {
    e.preventDefault()
    if (marque.value === "" || modele.value === "" ||
        immatriculation.value === "" || categorie.value === "" ||
        prix_jour.value === "" || statut.value === "")
        return alert("fille the input")

    if (edit_checker === 0)
        add()
    else {
        edit_car.marque = marque.value
        edit_car.modele = modele.value
        edit_car.immatriculation = immatriculation.value
        edit_car.categorie = categorie.value
        edit_car.prixJour = prix_jour.value
        edit_car.statut = statut.value
        edit_checker = 0
        annuler_modification.hidden = true
        localStorage.setItem("cars", JSON.stringify(cars))

    }
    formulaire_voiture.reset()
    display(cars)
})

annuler_modification.addEventListener("click", (e) => {
    e.preventDefault()
    annuler_modification.hidden = true
    edit_checker = 0
    formulaire_voiture.reset()
})

recherche.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase()

    const search_resolt = cars.filter(item => {
        return item.marque.toLowerCase().includes(searchValue) ||
            item.modele.toLowerCase().includes(searchValue) ||
            item.immatriculation.toLowerCase().includes(searchValue)
    })
    console.log(search_resolt);

    display(search_resolt)
})