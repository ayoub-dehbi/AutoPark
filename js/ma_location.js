import { voituresInitiales } from './data.js';

let cars = [...voituresInitiales];

// console.log(cars);

if (localStorage.getItem("cars"))
    cars = JSON.parse(localStorage.getItem("cars"))
else
    localStorage.setItem("cars", JSON.stringify(cars))

/*
 * AutoPark â€” Partie 2 : Composez votre location
 * Starter JavaScript â€” Ã  complÃ©ter par les apprenants.
 * Charger ce fichier dans votre HTML avec l'attribut defer.
 *
 * Parcours : vÃ©hicule et dates â†’ rÃ©cupÃ©ration â†’ options â†’ rÃ©capitulatif.
 * Les tarifs sont exprimÃ©s en MAD.
 */

// 1. CONFIGURATION : les donnÃ©es proposÃ©es par l'agence.
const config = {
  voitures: [
    {
      id: 1,
      marque: "Dacia",
      modele: "Sandero",
      immatriculation: "AUTO-001",
      categorie: "Citadine",
      prixJour: 250,
      statut: "Disponible",
    },
    {
      id: 2,
      marque: "Renault",
      modele: "Clio",
      immatriculation: "AUTO-002",
      categorie: "Citadine",
      prixJour: 300,
      statut: "Disponible",
    },
    {
      id: 3,
      marque: "Dacia",
      modele: "Duster",
      immatriculation: "AUTO-003",
      categorie: "SUV",
      prixJour: 450,
      statut: "Disponible",
    },
  ],

  modesRecuperation: [
    { id: "agence", nom: "Ã€ lâ€™agence", fraisFixes: 0 },
    { id: "aeroport", nom: "Ã€ lâ€™aÃ©roport", fraisFixes: 150 },
    { id: "adresse", nom: "Ã€ une adresse", fraisFixes: 100 },
  ],

  agences: ["Casablanca â€” Centre-ville", "Rabat â€” Agdal", "Marrakech â€” GuÃ©liz"],

  aeroports: ["Casablanca â€” Mohammed V", "Rabat â€” SalÃ©", "Marrakech â€” MÃ©nara"],

  options: [
    { id: "siegeBebe", nom: "SiÃ¨ge bÃ©bÃ©", prixParJour: 30 },
    {
      id: "conducteurSupplementaire",
      nom: "Conducteur supplÃ©mentaire",
      prixParJour: 200,
    },
  ],
};

// 2. SÃ‰LECTION : les choix de l'utilisateur, Ã  actualiser avec les formulaires.
// Les identifiants correspondent aux id dÃ©finis dans config.
// Les dates seront des chaÃ®nes au format AAAA-MM-JJ (valeur d'un input date).
const selectedConfig = {
  etape: 1,
  voitureId: null,
  dateDebut: "",
  dateFin: "",
  modeRecuperation: "agence",

  recuperation: {
    // Mode agence uniquement.
    heureRecuperation: "",

    // Mode aeroport uniquement.
    aeroport: "",
    numeroVol: "",
    heureArrivee: "",

    // Mode adresse uniquement.
    ville: "",
    adresse: "",
    heureLivraison: "",
  },

  options: {
    siegeBebe: false,
    conducteurSupplementaire: false,
  },
};

const carsList = document.getElementById("carsList")




// let car = config.voitures

// console.log(car);
// console.log(config.voitures);




function display_cars(cars)
{
  carsList.innerHTML = ""

  cars.forEach(car => {
    const  li = document.createElement("li")
    const  p = document.createElement("p")
    const  p1 = document.createElement("p")
    const  label = document.createElement("label")
    const  div = document.createElement("div")
    const  input = document.createElement("input")
    const  h4_1 = document.createElement("h4")
    const  h4_2 = document.createElement("h4")
    
    
    
    
    li.setAttribute("class"," flex  flex-col border-2 border-gray-200 rounded-xl ")
  
    label.setAttribute("class","flex  flex-col w-full h-full p-4 gap-2")
    
    div.setAttribute("class","flex justify-between pr-2 ")
    
    p.textContent = car.categorie
    p.setAttribute("class","text-blue-600 text-sm font-semibold pl-2 flex items-center h-8 w-24  bg-blue-100 rounded-lg px-1")

    input.setAttribute("name","voiture") 
    input.setAttribute("type","radio") 

    h4_1.textContent = car.marque +" "+ car.modele 
    h4_1.setAttribute("class","font-bold text-xl")
    
    p1.textContent = car.statut
    p1.setAttribute("class","text-base text-green-600" )
    
    
    h4_2.textContent = car.prixJour +" MAD / jour"
    h4_2.setAttribute("class","font-bold text-lg text-blue-600")

    div.append(p , input)

    label.append(div , h4_1 , p1 , h4_2)

    li.append(label)

    carsList.append(li)

    // console.log(carsList);

  });
}

display_cars(config.voitures)
