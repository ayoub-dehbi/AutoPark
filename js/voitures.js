import { voituresInitiales } from './data.js';

let cars = voituresInitiales;
// console.log(cars);


const marque = document.getElementById("marque")
const modele = document.getElementById("modele")
const immatriculation = document.getElementById("immatriculation")
const categorie = document.getElementById("categorie")
const prix_jour = document.getElementById("prix-jour")
const statut = document.getElementById("statut")
const bouton_enregistrer = document.getElementById("bouton-enregistrer")
const liste_voitures = document.getElementById("liste-voitures")

let id_car = 6

display()

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
}

function display() {
    liste_voitures.innerHTML = ""

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
        div.appendChild(Modifier)


        const Supprimer = document.createElement("button")
        Supprimer.textContent = "Supprimer"
        Supprimer.className = "button button-delete"
        Supprimer.setAttribute("type", "button")
        div.appendChild(Supprimer)

        td7.append(div)

        tr.append(td1, td2, td3, td4, td5, td6, td7)


        liste_voitures.appendChild(tr)

    });
}

bouton_enregistrer.addEventListener("click" , (e)=>{
    e.preventDefault()
    add()
    display()
})

