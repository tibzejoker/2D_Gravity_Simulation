let id = document.getElementById("space");
let planetNumber = 0;
let particleIndex = 0;
let clickPlanetName = "Planet";

let listOfRandomPlanetNames = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto", "Ceres", "Haumea", "Makemake", "Eris", "Titan", "Enceladus", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", ];


function randomColor() {
    var r = Math.floor(Math.random() * 200 + 56);
    var g = Math.floor(Math.random() * 200 + 56);
    var b = Math.floor(Math.random() * 200 + 56);
    return "rgb(" + r + "," + g + "," + b + ")";
}

let context = id.getContext("2d");
document.getElementById("body").onmousedown = function (event) {
    event = event || window.event;
    event.preventDefault();
    let x = event.pageX;
    let y = event.pageY;

    let randomPlanetName = listOfRandomPlanetNames[Math.floor(Math.random() * listOfRandomPlanetNames.length)] + Math.floor(Math.random() * 10000).toString();
    listePlanetes.push(createPlanet(randomPlanetName, x, y, 0, 0, 10, randomColor()));
    console.log(listePlanetes);
    console.log("x:" + x + " y:" + y);
};

let yy = 0;

function createPlanet(named, posX, posY, dirX, dirY, taille, couleur) {
    let nameToWite = "";
    if (clickPlanetName === named) {
        nameToWite = named + "_" + (planetNumber++).toString();
    } else {
        nameToWite = named
    }
    let planet = {
        posX: posX,
        posY: posY,
        dirX: dirX,
        dirY: dirY,
        taille: taille,
        couleur: couleur,
        name: nameToWite,
    };
    return planet;
}

let listePlanetes = [];

listePlanetes.push(createPlanet("Sun", 700, 320, -0.3, 0, 20, "#D0D000"));
listePlanetes.push(createPlanet("Sun2", 700, 400, 0.3, 0, 20, "#D0D000"));

function dessinerPlanete(x, y, size, colour, name, speed) {
    context.strokeStyle = colour;
    context.fillStyle = colour;
    context.lineWidth = 1;
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.stroke();
    context.font = '20px Arial';
    context.fillText(name, x - size, y - size - 10);
    context.fillText(Math.round(speed * 10000, 2), x - size, y - size - 30);
}

function touche(e) {
    let touche = event.keyCode;
    if (touche == 82) {
        document.location.reload(true);
    }
}

function init() {
    setInterval(draw, 5);
}

function colorChannelMixer(colorChannelA, colorChannelB, amountToMix) {
    var channelA = colorChannelA * amountToMix;
    var channelB = colorChannelB * (1 - amountToMix);
    return parseInt(channelA + channelB);
}

function colorMixer(rgbA, rgbB, amountToMix) {
    var r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
    var g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
    var b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
    return "rgb(" + r + "," + g + "," + b + ")";
}

let olddirX = 0;
let olddirY = 0;

function calculatePlanetsAttractonBasedOnNewtonLaw(planetA, planetB) {
    let G = 0.81;
    let distance = Math.sqrt(Math.pow(planetA.posX - planetB.posX, 2) + Math.pow(planetA.posY - planetB.posY, 2));
    let force = (G * planetA.taille * planetB.taille) / Math.pow(distance, 2);
    let angle = Math.atan2(planetB.posY - planetA.posY, planetB.posX - planetA.posX);
    let forceX = force * Math.cos(angle);
    let forceY = force * Math.sin(angle);

    olddirX = planetA.dirX;
    olddirY = planetA.dirY;

    planetA.dirX += forceX / planetA.taille;
    planetA.dirY += forceY / planetA.taille;

    return [olddirX, olddirY];
}

function contactBetweenPlanets(planetA, planetB) {
    let distance = Math.sqrt(Math.pow(planetA.posX - planetB.posX, 2) + Math.pow(planetA.posY - planetB.posY, 2));
    if (distance < planetA.taille + planetB.taille) {
        return true;
    }
    return false;
}

function calculateProportionalForce(planetA, planetB) {
    let volumeA = volumeFromRadius(planetA.taille);
    let volumeB = volumeFromRadius(planetB.taille);
    return volumeB / (volumeA + volumeB);
}

function volumeFromRadius(radius) {
    return (4 / 3) * Math.PI * Math.pow(radius, 3);
}

function radiusOfFusion(planetA, planetB) {
    let volumeAFromRadius = volumeFromRadius(planetA.taille);
    let volumeBFromRadius = volumeFromRadius(planetB.taille);
    let v = volumeAFromRadius + volumeBFromRadius;
    let r = Math.cbrt(v / Math.PI);
    console.log("volumeAFromRadius:" + volumeAFromRadius + " volumeBFromRadius:" + volumeBFromRadius + " v:" + v + " r:" + r);
    return r;
}

function resetOldDir(planet) {
    planet.dirX = olddirX;
    planet.dirY = olddirY;
}

function fusionPlanetes(planetA, planetB) {
    let newPlanet = createPlanet((planetA.taille > planetB.taille) ? planetA.name : planetB.name,
        (planetA.taille > planetB.taille) ? planetA.posX : planetB.posX,
        (planetA.taille > planetB.taille) ? planetA.posY : planetB.posY,
        (planetA.dirX * calculateProportionalForce(planetA, planetB) + planetB.dirX * calculateProportionalForce(planetB, planetA)) / 2,
        (planetA.dirY + planetB.dirY) / 2,
        radiusOfFusion(planetA, planetB),
        colorMixer([planetA.couleur, planetB.couleur], [255, 255, 255], 0.5));

    if (planetA.name.indexOf("particle") == -1 && planetB.name.indexOf("particle") == -1) {
    }

    let indexA = listePlanetes.indexOf(planetA);
    let indexB = listePlanetes.indexOf(planetB);
    if (indexA !== -1) {
        listePlanetes.splice(indexA, 1);
    }
    if (indexB !== -1) {
        listePlanetes.splice(indexB, 1);
    }

    listePlanetes.push(newPlanet);
}

function inverseDirXAndYIfPlanetsExitsScreen(planet) {
    if (planet.posX < 0 + planet.taille) {
        planet.dirX = -planet.dirX;
        planet.posX = 0 + planet.taille;
    }

    if (planet.posX > id.width - planet.taille) {
        planet.dirX = -planet.dirX;
        planet.posX = id.width - planet.taille;
    }
    if (planet.posY < 0 + planet.taille) {
        planet.dirY = -planet.dirY;
        planet.posY = 0 + planet.taille;
    }
    if (planet.posY > id.height - planet.taille) {
        planet.dirY = -planet.dirY;
        planet.posY = id.height - planet.taille;
    }
}

function calculateSpeed(planet) {
    return Math.sqrt(Math.pow(planet.dirX, 2) + Math.pow(planet.dirY, 2));
}

function calculPlanetsMovements() {
    let breaked = false;
    for (planet of listePlanetes) {
        planet.posX += planet.dirX;
        planet.posY += planet.dirY;
        inverseDirXAndYIfPlanetsExitsScreen(planet);
        dessinerPlanete(planet.posX, planet.posY, planet.taille, planet.couleur, planet.name, calculateSpeed(planet));

        for (otherPlanet of listePlanetes) {
            if (planet.name !== otherPlanet.name) {
                calculatePlanetsAttractonBasedOnNewtonLaw(planet, otherPlanet);
                if (contactBetweenPlanets(planet, otherPlanet)) {
                    console.log("contact between " + planet.name + " and " + otherPlanet.name);
                    fusionPlanetes(planet, otherPlanet);
                    breaked = true;
                    break;
                }
            }
            if (breaked) {
                break;
            }
        }
    }
}

function draw() {
    context.clearRect(0, 0, id.width, id.height);
    calculPlanetsMovements();
}
