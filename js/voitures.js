import { voituresInitiales } from './data.js';

let voitur = voituresInitiales;
// console.log(voitur);


const marque = document.getElementById("marque")
const modele = document.getElementById("modele")
const immatriculation = document.getElementById("immatriculation")
const categorie = document.getElementById("categorie")
const prix_jour = document.getElementById("prix-jour")
const statut = document.getElementById("statut")
const bouton_enregistrer = document.getElementById("bouton-enregistrer")
const liste_voitures = document.getElementById("liste-voitures")


function display(){
    liste_voitures.innerHTML = ""

    voituresInitiales.forEach(element => {
        const tr =  document.createElement(tr)
        const td1 =  document.createElement(td)
        const strong =  document.createElement(strong)
        const td2 =  document.createElement(td)
        const span1 =  document.createElement(span)
        const span2 =  document.createElement(span)

        const td3 =  document.createElement(td)
        const td4 =  document.createElement(td)
        const td5 =  document.createElement(td)
        const td6 =  document.createElement(td)
        const td7 =  document.createElement(td)

        
        
    });
}

