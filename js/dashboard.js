import { voituresInitiales } from './data.js';

let cars = [...voituresInitiales];

// console.log(cars);

if (localStorage.getItem("cars"))
    cars = JSON.parse(localStorage.getItem("cars"))
else
    localStorage.setItem("cars", JSON.stringify(cars))

// dashboard

let tot = cars.length
let disp = cars.filter(itmes => itmes.statut == "Disponible").length
let lou = cars.filter(itmes => itmes.statut == "Louée").length
let en_main = cars.filter(itmes => itmes.statut == "En maintenance").length


const Total = document.getElementById("Total")
Total.textContent = tot

const disponibles = document.getElementById("disponibles")

disponibles.textContent = disp

const louees = document.getElementById("louees")
louees.textContent = lou

const en_maintenance = document.getElementById("en_maintenance")
en_maintenance.textContent = en_main


const disponibles_percentage = document.getElementById("disponibles-percentage")
const louees_percentage = document.getElementById("louees-percentage")
const maintenance_percentage = document.getElementById("maintenance-percentage")

let percentage = (100 * disp)/tot   
console.log(percentage);

disponibles_percentage.classList.add(`w-[${percentage}%]`)

percentage = (100 * lou)/tot  
console.log(percentage);
 
louees_percentage.classList.add(`w-[${percentage}%]`)
percentage = (100 * en_main)/tot  
console.log(percentage);
 
maintenance_percentage.classList.add(`w-[${percentage}%]`)
