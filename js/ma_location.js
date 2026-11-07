import { voituresInitiales } from "./data.js";

let cars = [...voituresInitiales];

// console.log(cars);

if (localStorage.getItem("cars"))
  cars = JSON.parse(localStorage.getItem("cars"));
else localStorage.setItem("cars", JSON.stringify(cars));

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

  agences: [
    "Casablanca — Centre-ville",
    "Rabat — Agdal",
    "Marrakech — GuÃ©liz",
  ],

  aeroports: ["Casablanca — Mohammed V", "Rabat — Salé", "Marrakech — Ménara"],

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
const temp = {
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

let selectedConfig = { ...temp };

const carsList = document.getElementById("carsList");
const step_1 = document.getElementById("step_1");
const step_2 = document.getElementById("step_2");
const step_3 = document.getElementById("step_3");
const step_4 = document.getElementById("step_4");
const step_5 = document.getElementById("step_5");

const wizard_bar = document.getElementById("wizard_bar");

const Véhicule = document.getElementById("Véhicule");
const Récupération = document.getElementById("Récupération");
const Options = document.getElementById("Options");
const Récapitulatif = document.getElementById("Récapitulatif");

const step_pre = document.getElementById("step_pre");
const step_nex = document.getElementById("step_nex");

const Nouvelle_location = document.getElementById("Nouvelle_location");

const dateDebut = document.getElementById("dateDebut");
const dateFin = document.getElementById("dateFin");

const agence = document.getElementById("agence");
const aeroport = document.getElementById("Aéroport");
const adresse = document.getElementById("adresse");

const time_rec = document.getElementById("time_rec");

const aeroport_select = document.getElementById("aeroport_select");
const number_du_vol = document.getElementById("number_du_vol");
const time_vol = document.getElementById("time_vol");

const ville = document.getElementById("ville");
const full_adresse = document.getElementById("full_adresse");
const time_livra = document.getElementById("time_livra");

const Siege_bebe = document.getElementById("Siege_bebe");
const Conducteur = document.getElementById("Conducteur");

const edit_car_date = document.getElementById("edit_car_date");
const edit_mode_rec = document.getElementById("edit_mode_rec");
const edit_optein = document.getElementById("edit_optein");

const form = document.getElementById("form");

// votre_Location
const car_name = document.getElementById("car_name");
const categorie_prixJour = document.getElementById("categorie_prixJour");
const duration = document.getElementById("duration");
const days = document.getElementById("days");
const car_prix_by_days = document.getElementById("car_prix_by_days");
const option_seat = document.getElementById("option_seat");
const option_driver = document.getElementById("option_driver");
const Récup_cost = document.getElementById("Récup_cost");
const total_prix = document.getElementById("total_prix");

let car_details;
let days_counter;

display_cars(config.voitures);
stepchecker();

const modeRec = document.querySelectorAll('input[name="recuperation"]');
const car_selec = document.querySelectorAll('input[name="voiture"]');
let rec_val = "agence";

// selected car
car_selec.forEach((cars) =>
  cars.addEventListener("change", () => {
    if (cars.checked) {
      selectedConfig.voitureId = cars.value;
      car_details = config.voitures.find(
        (car) => car.id == selectedConfig.voitureId,
      );
      car_name.textContent = car_details.marque + " " + car_details.modele;
      categorie_prixJour.textContent =
        car_details.categorie + " . " + car_details.prixJour + " MAD / jour";
    }
    votre_Location();
  }),
);

step_nex.addEventListener("click", (e) => {
  e.preventDefault();

  if (selectedConfig.etape == 1) {
    const car_selected = document.querySelector(
      'input[name="voiture"]:checked',
    );

    if (car_selected == null)
      return alert("Veuillez sélectionner un véhicule !");
    else if (!dateFin.value || !dateDebut.value)
      return alert("Veuillez sélectionner les dates de début et de fin !");
    else if (new Date(dateFin.value) < new Date(dateDebut.value))
      return alert(
        "La date de fin doit être supérieure ou égale à la date de début !",
      );

    let carId = car_selected.value;

    selectedConfig.voitureId = carId;
    selectedConfig.dateDebut = dateDebut.value;
    selectedConfig.dateFin = dateFin.value;

    // console.log(selectedConfig);
  } else if (selectedConfig.etape == 2) {
    if (rec_val == "agence") {
      if (!time_rec.value) return alert("time not enter");

      selectedConfig.modeRecuperation = rec_val;
      selectedConfig.recuperation.heureRecuperation = time_rec.value;

      selectedConfig.recuperation.aeroport = "";
      selectedConfig.recuperation.numeroVol = "";
      selectedConfig.recuperation.heureArrivee = "";

      selectedConfig.recuperation.ville = "";
      selectedConfig.recuperation.adresse = "";
      selectedConfig.recuperation.heureLivraison = "";
    }
    if (rec_val == "aeroport") {
      if (!aeroport_select.value) return alert("filed the info");
      if (!number_du_vol.value) return alert("filed the info");
      if (!time_vol.value) return alert("filed the info");

      selectedConfig.modeRecuperation = rec_val;

      selectedConfig.recuperation.aeroport = aeroport_select.value;
      selectedConfig.recuperation.numeroVol = number_du_vol.value;
      selectedConfig.recuperation.heureArrivee = time_vol.value;

      selectedConfig.recuperation.heureRecuperation = "";

      selectedConfig.recuperation.ville = "";
      selectedConfig.recuperation.adresse = "";
      selectedConfig.recuperation.heureLivraison = "";
    }
    if (rec_val == "adresse") {
      if (!ville.value) return alert("filed the info");
      if (!full_adresse.value) return alert("filed the info");
      if (!time_livra.value) return alert("filed the info");

      selectedConfig.modeRecuperation = rec_val;

      selectedConfig.recuperation.ville = ville.value;
      selectedConfig.recuperation.adresse = full_adresse.value;
      selectedConfig.recuperation.heureLivraison = time_livra.value;

      selectedConfig.recuperation.heureRecuperation = "";

      selectedConfig.recuperation.aeroport = "";
      selectedConfig.recuperation.numeroVol = "";
      selectedConfig.recuperation.heureArrivee = "";
    }
  } else if (selectedConfig.etape == 3) {
    if (Siege_bebe.checked) selectedConfig.options.siegeBebe = true;
    else selectedConfig.options.siegeBebe = false;

    if (Conducteur.checked)
      selectedConfig.options.conducteurSupplementaire = true;
    else selectedConfig.options.conducteurSupplementaire = false;
  } else if (selectedConfig.etape == 4) {
    if (!confirm("confirm ")) return;
  }

  if (selectedConfig.etape < 5) selectedConfig.etape++;

  stepchecker();
});
step_pre.addEventListener("click", (e) => {
  e.preventDefault();
  if (selectedConfig.etape == 1) {
    form.reset();
    selectedConfig = { ...temp };
  } else if (selectedConfig.etape > 1) selectedConfig.etape--;

  stepchecker();
});

// step 1
dateDebut.addEventListener("change", votre_Location);
dateFin.addEventListener("change", votre_Location);

// step 2

// recupration mode
modeRec.forEach((rec) =>
  rec.addEventListener("change", (e) => {
    e.preventDefault();
    if (rec.value == "agence") {
      agence.hidden = false;
      aeroport.hidden = true;
      adresse.hidden = true;
      Récup_cost.textContent = "Gratuite";
    }
    if (rec.value == "aeroport") {
      agence.hidden = true;
      aeroport.hidden = false;
      adresse.hidden = true;
      Récup_cost.textContent = "150 MAD";
    }
    if (rec.value == "adresse") {
      agence.hidden = true;
      aeroport.hidden = true;
      adresse.hidden = false;
      Récup_cost.textContent = "100 MAD";
    }
    rec_val = rec.value;
    votre_Location();
  }),
);

// step 3
Siege_bebe.addEventListener("click", votre_Location);
Conducteur.addEventListener("click", votre_Location);

// step 4
edit_car_date.addEventListener("click", (e) => {
  e.preventDefault();
  selectedConfig.etape = 1;
  stepchecker();
});
edit_mode_rec.addEventListener("click", (e) => {
  e.preventDefault();
  selectedConfig.etape = 2;
  stepchecker();
});
edit_optein.addEventListener("click", (e) => {
  e.preventDefault();
  selectedConfig.etape = 3;
  stepchecker();
});

// step 5
Nouvelle_location.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  selectedConfig = { ...temp };
  // selectedConfig.etape = 1;
  step_pre.hidden = false;
  step_nex.hidden = false;
  stepchecker();
});

function votre_Location() {
  let total_siege_bebe_prix = days_counter * 30;
  let total_Conducteur_prix = days_counter * 200;
  let total = 0;

  // car prix by days
  if (!dateFin.value) duration.textContent = dateDebut.value + " → ";
  else if (!dateDebut.value) duration.textContent = " → " + dateFin.value;
  else {
    let date1 = new Date(dateDebut.value);
    let date2 = new Date(dateFin.value);
    let total_car_prix;

    let one_day = 1000 * 60 * 60 * 24;
    days_counter = (date2 - date1) / one_day + 1;

    if (days_counter < 3)
      return alert(
        "Durée : 3 jours. Les dates de début et de fin sont incluses.",
      );

    duration.textContent = dateDebut.value + " → " + dateFin.value;
    days.textContent = days_counter + " jours · dates incluses";
    total_car_prix = days_counter * car_details.prixJour;

    car_prix_by_days.innerHTML = `Véhicule · ${days_counter} × ${car_details.prixJour} MAD <span  class="text-black text-lg font-bold">${total_car_prix} MAD</span>`;
  }

  // option
  if (Siege_bebe.checked)
    option_seat.innerHTML = `Siège bébé · ${days_counter} × 30 MAD 
  <span  class="text-black text-lg font-bold">${total_siege_bebe_prix} MAD</span>`;
  else option_seat.innerHTML = "";

  if (Conducteur.checked)
    option_driver.innerHTML = `Conducteur supplémentaire · ${days_counter} × 200 MAD 
  <span  class="text-black text-lg font-bold">${total_Conducteur_prix} MAD</span>`;
  else option_driver.innerHTML = "";

  // total_prix
  total = days_counter * car_details.prixJour;
  if (Siege_bebe.checked) total += days_counter * 30;
  if (Conducteur.checked) total += days_counter * 200;
  if (rec_val == "aeroport") total += 150;
  else if (rec_val == "adresse") total += 100;

  if (isNaN(total)) total = 0;
  total_prix.textContent = total + " MAD";
}

function display_cars(cars) {
  carsList.innerHTML = "";

  cars.forEach((car) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const p1 = document.createElement("p");
    const label = document.createElement("label");
    const div = document.createElement("div");
    const input = document.createElement("input");
    const h4_1 = document.createElement("h4");
    const h4_2 = document.createElement("h4");

    li.setAttribute(
      "class",
      " flex  flex-col border-2 border-gray-200 rounded-xl has-[:checked]:border-3 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50",
    );

    label.setAttribute(
      "class",
      "cursor-pointer flex  flex-col w-full h-full p-4 gap-2",
    );

    div.setAttribute("class", "flex justify-between pr-2 ");

    p.textContent = car.categorie;
    p.setAttribute(
      "class",
      "text-blue-600 text-sm font-semibold pl-2 flex items-center h-8 w-24  bg-blue-100 rounded-lg px-1",
    );

    input.setAttribute("name", "voiture");
    input.setAttribute("type", "radio");
    input.setAttribute("value", car.id);

    h4_1.textContent = car.marque + " " + car.modele;
    h4_1.setAttribute("class", "font-bold text-xl");

    p1.textContent = car.statut;
    p1.setAttribute("class", "text-base text-green-600");

    h4_2.textContent = car.prixJour + " MAD / jour";
    h4_2.setAttribute("class", "font-bold text-lg text-blue-600");

    div.append(p, input);

    label.append(div, h4_1, p1, h4_2);

    li.append(label);

    carsList.append(li);
  });
}

function stepchecker() {
  if (selectedConfig.etape == 1) {
    step_1.hidden = false;
    step_2.hidden = true;
    step_3.hidden = true;
    step_4.hidden = true;
    step_5.hidden = true;
    step_pre.textContent = "Recommencer";
    wizard_bar.hidden = false;
    Véhicule.textContent = "1";
    Récupération.textContent = "2";
    Options.textContent = "3";
    Récapitulatif.textContent = "4";

    Récupération.classList.remove("text-white", "bg-blue-600");
    Récupération.classList.add("text-gray-600", "bg-gray-300");

    Options.classList.remove("text-white", "bg-blue-600");
    Options.classList.add("text-gray-600", "bg-gray-300");

    Récapitulatif.classList.remove("text-white", "bg-blue-600");
    Récapitulatif.classList.add("text-gray-600", "bg-gray-300");
  } else if (selectedConfig.etape == 2) {
    step_1.hidden = true;
    step_2.hidden = false;
    step_3.hidden = true;
    step_4.hidden = true;
    step_5.hidden = true;
    step_pre.textContent = "Précédent";
    Véhicule.textContent = "✓";
    Récupération.textContent = "2";
    Options.textContent = "3";
    Récapitulatif.textContent = "4";

    // Véhicule.classList.add("text-white","bg-blue-600");

    Récupération.classList.remove("text-gray-600", "bg-gray-300");
    Récupération.classList.add("text-white", "bg-blue-600");

    Options.classList.remove("text-white", "bg-blue-600");
    Options.classList.add("text-gray-600", "bg-gray-300");
    Récapitulatif.classList.remove("text-white", "bg-blue-600");
    Récapitulatif.classList.add("text-gray-600", "bg-gray-300");
  } else if (selectedConfig.etape == 3) {
    step_1.hidden = true;
    step_2.hidden = true;
    step_3.hidden = false;
    step_4.hidden = true;
    step_5.hidden = true;
    step_pre.textContent = "Précédent";
    Véhicule.textContent = "✓";
    Récupération.textContent = "✓";
    Options.textContent = "3";
    Récapitulatif.textContent = "4";
    // Véhicule.classList.add("text-white", "bg-blue-600");

    Récupération.classList.remove("text-gray-600", "bg-gray-300");
    Récupération.classList.add("text-white", "bg-blue-600");

    Options.classList.remove("text-gray-600", "bg-gray-300");
    Options.classList.add("text-white", "bg-blue-600");

    Récapitulatif.classList.remove("text-white", "bg-blue-600");
    Récapitulatif.classList.add("text-gray-600", "bg-gray-300");
  } else if (selectedConfig.etape == 4) {
    step_1.hidden = true;
    step_2.hidden = true;
    step_3.hidden = true;
    step_4.hidden = false;
    step_5.hidden = true;
    step_pre.textContent = "Précédent";
    step_nex.textContent = "Confirmer";
    Véhicule.textContent = "✓";
    Récupération.textContent = "✓";
    Options.textContent = "✓";
    Récapitulatif.textContent = "4";

    // Véhicule.classList.add("text-white", "bg-blue-600");

    Récupération.classList.remove("text-gray-600", "bg-gray-300");
    Récupération.classList.add("text-white", "bg-blue-600");

    Options.classList.remove("text-gray-600", "bg-gray-300");
    Options.classList.add("text-white", "bg-blue-600");

    Récapitulatif.classList.remove("text-gray-600", "bg-gray-300");
    Récapitulatif.classList.add("text-white", "bg-blue-600");
  } else if (selectedConfig.etape == 5) {
    step_1.hidden = true;
    step_2.hidden = true;
    step_3.hidden = true;
    step_4.hidden = true;
    step_5.hidden = false;
    step_pre.hidden = true;
    step_nex.hidden = true;
    wizard_bar.hidden = true;
  }
}
