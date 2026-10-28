import { voituresInitiales } from './data.js';

let cars = [...voituresInitiales];
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


const erreur_modele = document.getElementById("erreur-modele")
const erreur_marque = document.getElementById("erreur-marque")
const aide_immatriculation = document.getElementById("aide-immatriculation")
const erreur_prix_jour = document.getElementById("erreur-prix-jour")
const erreur_categorie = document.getElementById("erreur-categorie")
const erreur_statut = document.getElementById("erreur-statut")
console.log(erreur_statut);


const recherche = document.getElementById("recherche")
const filtre_statut = document.getElementById("filtre-statut")
const filtre_categorie = document.getElementById("filtre-categorie")
const tri_prix = document.getElementById("tri-prix")
const reinitialiser_filtres = document.getElementById("reinitialiser-filtres")



if (localStorage.getItem("cars"))
    cars = JSON.parse(localStorage.getItem("cars"))
else
    localStorage.setItem("cars", JSON.stringify(cars))



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

    let badge;

    cars.forEach(element => {

        switch (element.statut) {
            case "Disponible":
                badge = "badge-disponible";
                break;
            case "Louée":
                badge = "badge-louee";
                break;
            case "En maintenance":
                badge = "badge-maintenance";
                break;

            default:
                break;
        }
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
        span3.classList.add(`${badge}`)
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
    if (!confirm("remove"))
        return
    cars = cars.filter(item => item.id !== id)
    formulaire_voiture.reset()
    annuler_modification.hidden = true
    bouton_enregistrer.textContent = "Ajouter la voiture"
    display(cars)
    localStorage.setItem("cars", JSON.stringify(cars))
}

function edite(id) {

    if (!confirm("befora edite"))
        return
    edit_checker = id
    bouton_enregistrer.textContent = "modifi la voiture"
    edit_car = cars.find(item => item.id == id)
    // console.log(edit_car);

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
    if(marque.value === "" || modele.value === "" 
        ||immatriculation.value === ""||prix_jour.value == ""
        ||categorie.value === ""||statut.value === ""||prix_jour.value <= 0){
        if (marque.value === "")
             erreur_marque.textContent = "marque not enter"
        
        if (modele.value === "")
             erreur_modele.textContent = "modele not enter"
    
        if (immatriculation.value === "")
             aide_immatriculation.textContent = "immatriculation not enter"
    
        if (prix_jour.value == "")
             erreur_prix_jour.textContent = "prix not enter"
    
        else if (prix_jour.value <= 0)
             erreur_prix_jour.textContent = "prix <= 0"
    
        if (categorie.value === "")
            erreur_categorie.textContent = "categorie not enter"
        return
    }

    else if (edit_checker === 0) {

        if (!confirm("add"))
            return
        add()
    }
    else {
        if (!confirm("confirm the edite"))
            return
        edit_car.marque = marque.value
        edit_car.modele = modele.value
        edit_car.immatriculation = immatriculation.value
        edit_car.categorie = categorie.value
        edit_car.prixJour = prix_jour.value
        edit_car.statut = statut.value
        edit_checker = 0
        annuler_modification.hidden = true
        bouton_enregistrer.textContent = "Ajouter la voiture"

        localStorage.setItem("cars", JSON.stringify(cars))


    }
    formulaire_voiture.reset()
    display(cars)
})

annuler_modification.addEventListener("click", (e) => {
    e.preventDefault()
    if (!confirm("cancal"))
        return
    annuler_modification.hidden = true
    bouton_enregistrer.textContent = "Ajouter la voiture"

    edit_checker = 0
    formulaire_voiture.reset()
})

recherche.addEventListener("input", applay_the_filter)
filtre_statut.addEventListener("change", applay_the_filter)
filtre_categorie.addEventListener("change", applay_the_filter)
tri_prix.addEventListener("change", applay_the_filter)

reinitialiser_filtres.addEventListener("click", (e) => {
    e.preventDefault()
    recherche.value = "";
    filtre_statut.selectedIndex = 0;
    filtre_categorie.selectedIndex = 0;
    tri_prix.selectedIndex = 0;
    display(cars);
})

function applay_the_filter() {

    const searchValue = recherche.value.toLowerCase().trim();

    let search_resolt = cars.filter(item => {
        return item.marque.toLowerCase().includes(searchValue) ||
            item.modele.toLowerCase().includes(searchValue) ||
            item.immatriculation.toLowerCase().includes(searchValue)
    })

    if (filtre_statut.value != "")
        search_resolt = search_resolt.filter(item => item.statut == filtre_statut.value)
    if (filtre_categorie.value != "")
        search_resolt = search_resolt.filter(item => item.categorie == filtre_categorie.value)

    if (tri_prix.value == "croissant")
        sort_croissant(search_resolt)
    else if (tri_prix.value == "decroissant")
        sort_decroissant(search_resolt)

    display(search_resolt)
}
function sort_croissant(teamp_cars) {
    for (let j = 0; j < teamp_cars.length; j++) {
        for (let i = 0; i < teamp_cars.length - 1; i++)
            if (teamp_cars[i].prixJour > teamp_cars[i + 1].prixJour)
                swap(teamp_cars, i, i + 1)
    }
    return;
}
function sort_decroissant(teamp_cars) {
    for (let j = 0; j < teamp_cars.length; j++) {
        for (let i = 0; i < teamp_cars.length - 1; i++)
            if (teamp_cars[i].prixJour < teamp_cars[i + 1].prixJour)
                swap(teamp_cars, i, i + 1)
    }
    return;
}
function swap(arr, i, j) {
    let a = arr[i];
    arr[i] = arr[j];
    arr[j] = a;
}