let id = document.getElementById("space");
let planetNumber = 0;
let particleIndex = 0;
let clickPlanetName = "Planet";
/*Detection du clic souris*/


let listOfRandomPlanetNames = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto", "Ceres", "Haumea", "Makemake", "Eris", "Titan", "Enceladus", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", "Iapetus", "Phoebe", "Rhea", "Tethys", "Dione", "Titan", "Hyperion", ];



function  randomColor() {
    var r = Math.floor(Math.random() * 200+56);
    var g = Math.floor(Math.random() * 200+56);
    var b = Math.floor(Math.random() * 200+56);
    return "rgb(" + r + "," + g + "," + b + ")";
}

let context = id.getContext("2d");
document.getElementById("body").onmousedown = function (event) {
    event = event || window.event;
    //console.log(event.buttons);
    event.preventDefault();
    let x = event.pageX;// -125;
    let y = event.pageY;// -120;

    let randomPlanetName = listOfRandomPlanetNames[Math.floor(Math.random() * listOfRandomPlanetNames.length)]+ Math.floor(Math.random() * 10000).toString();
    //if (yy++ < 2){
        listePlanetes.push(createPlanet(randomPlanetName, x, y, 0, 0, 10, randomColor()));//"#D0A000"));        
    //} 
    console.log(listePlanetes);
    console.log("x:"+x+" y:"+y);
};

let yy = 0;

/**
 *Permet de créer une planete avec des parametres par defaut
 * @param named
 * @param posX
 * @param posY
 * @param dirX
 * @param dirY
 * @param taille
 * @param couleur
 * @returns {{posX: *, posY: *, dirY: *, taille: *, dirX: *, name: *, couleur: *, showDetails(): void}}
 */
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

        /*showDetails() {
            const accepting = this.isAvailable ? 'is accepting applications' : "is not currently accepting applications";
            //console.log(`The ${this.position} position is ${this.type} and ${accepting}.`);
        }*/
    };

    return planet;
}


//let terre = createPlanet("Terre", 150, 100, 1, 0, 1, "#0000D0");
//let terre = createPlanet("Terre",150,100,1,0,1,2);

//let mars = createPlanet("Mars", 500, 300, 0, 0, 12, "#D0A000");
let listePlanetes = [];

listePlanetes.push(createPlanet("Sun", 700, 320, -0.3, 0, 20, "#D0D000"));
listePlanetes.push(createPlanet("Sun2", 700, 400, 0.3, 0, 20, "#D0D000"));

function dessinerPlanete(x, y, size, colour,name,speed ) {
    context.strokeStyle = colour;
    context.fillStyle = colour;
    context.lineWidth = 1;
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.stroke();
    context.font = '20px Arial';
    context.fillText(name, x-size, y-size-10);
    context.fillText(Math.round(speed*10000,2), x-size, y-size-30);
}


function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


function touche(e) {
    let touche = event.keyCode;
    //alert(touche);

    if (touche == 82) {
        document.location.reload(true);
    }


}

function init() {

    setInterval(draw, 1);


}



//colorChannelA and colorChannelB are ints ranging from 0 to 255
function colorChannelMixer(colorChannelA, colorChannelB, amountToMix){
    var channelA = colorChannelA*amountToMix;
    var channelB = colorChannelB*(1-amountToMix);
    return parseInt(channelA+channelB);
}
//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
function colorMixer(rgbA, rgbB, amountToMix){
    var r = colorChannelMixer(rgbA[0],rgbB[0],amountToMix);
    var g = colorChannelMixer(rgbA[1],rgbB[1],amountToMix);
    var b = colorChannelMixer(rgbA[2],rgbB[2],amountToMix);
    return "rgb("+r+","+g+","+b+")";
}



function calculPlanetAttraction(planet, otherPlanet) {

    
    let distance = Math.sqrt(Math.pow(planet.posX - otherPlanet.posX, 2) + Math.pow(planet.posY - otherPlanet.posY, 2));
    let force = 0.002;
    if (distance>planet.taille+otherPlanet.taille) {
        //calculate the inercial force
        let forceX = (otherPlanet.posX - planet.posX) / distance;
        let forceY = (otherPlanet.posY - planet.posY) / distance;
        //calculate the acceleration
        let accelerationX = forceX * force * calculateProportionalForce(planet, otherPlanet);
        let accelerationY = forceY * force *calculateProportionalForce(planet, otherPlanet);
        //calculate the new velocity
        planet.dirX += accelerationX;
        planet.dirY += accelerationY;
         
    }
}


let olddirX = 0;
let olddirY = 0;

function calculatePlanetsAttractonBasedOnNewtonLaw(planetA, planetB){
    let G = 0.81;
    let distance = Math.sqrt(Math.pow(planetA.posX-planetB.posX,2)+Math.pow(planetA.posY-planetB.posY,2));
    let force = (G*planetA.taille*planetB.taille)/Math.pow(distance,2);
    let angle = Math.atan2(planetB.posY-planetA.posY,planetB.posX-planetA.posX);
    let forceX = force*Math.cos(angle);
    let forceY = force*Math.sin(angle);
    
    olddirX = planetA.dirX;
    olddirY = planetA.dirY;

    planetA.dirX += forceX/planetA.taille;
    planetA.dirY += forceY/planetA.taille;

    return [olddirX,olddirY];
}

function contactBetweenPlanets(planetA, planetB){
    let distance = Math.sqrt(Math.pow(planetA.posX - planetB.posX, 2) + Math.pow(planetA.posY - planetB.posY, 2));
    if(distance < planetA.taille + planetB.taille){
        return true;
    }
    return false;
}

function calculateProportionalForce(planetA, planetB){
    let volumeA = volumeFromRadius(planetA.taille);
    let volumeB = volumeFromRadius(planetB.taille);
    return volumeB/(volumeA+volumeB);
}


function volumeFromRadius(radius){
    return (4/3)*Math.PI*Math.pow(radius,3);
}

function sayHelloIfMonday(){
    let today = new Date();
    let day = today.getDay();
    if(day === 1){
        alert("Hello");
    }
}



//calculate raduis of 2 fusioned spheres where v = v1+v2, then v = 4/3 pi r3, so r = cube root(3/4 v/pi).
function radiusOfFusion(planetA, planetB){
    let volumeAFromRadius = volumeFromRadius(planetA.taille);
    let volumeBFromRadius = volumeFromRadius(planetB.taille);
    let v = volumeAFromRadius + volumeBFromRadius;
    let r = Math.cbrt(v/Math.PI);
    console.log("volumeAFromRadius:"+volumeAFromRadius+" volumeBFromRadius:"+volumeBFromRadius+" v:"+v+" r:"+r);
    return r;
}

function resetOldDir(planet){
    planet.dirX = olddirX;
    planet.dirY = olddirY;
}

//destroy the 2 planets and create a new one that is the sum of the 2 with a direction of the average of the 2 and a color of the average of the 2
function fusionPlanetes(planetA, planetB){
    
    let newPlanet = createPlanet((planetA.taille>planetB.taille)?planetA.name:planetB.name,
    (planetA.taille>planetB.taille)?planetA.posX:planetB.posX, 
    (planetA.taille>planetB.taille)?planetA.posY:planetB.posY, 
    (planetA.dirX *calculateProportionalForce(planetA,planetB)+ planetB.dirX*calculateProportionalForce(planetB,planetA))/2,
     (planetA.dirY + planetB.dirY)/2,
      radiusOfFusion(planetA, planetB),
       colorMixer([planetA.couleur, planetB.couleur], [255,255,255], 0.5));

    //if planetA or planetB dont have particle in the name, drawExplosionParticles
    if(planetA.name.indexOf("particle")==-1&&planetB.name.indexOf("particle")==-1){
        //drawExplosionParticles(newPlanet.posX, newPlanet.posY, newPlanet.taille, newPlanet.couleur, 1);
    }
    
    //remove the 2 planets
    console.log("fusionPlanetes before");
    console.log(listePlanetes);

    listePlanetes.splice(listePlanetes.indexOf(planetA), 1);
    listePlanetes.splice(listePlanetes.indexOf(planetB), 1);
    console.log("fusionPlanetes after");    
    console.log(listePlanetes);


    console.log("fusionPlanetes push");
    console.log(listePlanetes);
    listePlanetes.push(newPlanet);
        
}

function drawExplosionParticles(x, y, taille, color, nbParticles){
    for (let i = 0; i < nbParticles; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 10;
        let xSpeed = Math.cos(angle) * speed;
        let ySpeed = Math.sin(angle) * speed;
        
        //random position on a circle 2 times larger than the planet
        let xPos = x + Math.random() * taille * 2 + taille;
        let yPos = y + Math.random() * taille * 2 + taille;
        let particle = createPlanet("particle_"+particleIndex++ +"_"+i, xPos, yPos, xSpeed, ySpeed, 1, color);
        console.log("particle:"+particle);
        listePlanetes.push(particle);
    }
}

function inverseDirXAndYIfPlanetsExitsScreen(planet){
    if(planet.posX <0+planet.taille){
        planet.dirX = -planet.dirX;
        planet.posX = 0+planet.taille;
        //console.log ("1");
    }

    if(planet.posX>id.width-planet.taille){
        planet.dirX = -planet.dirX;
        planet.posX = id.width-planet.taille;
        //console.log ("2");
    }
    if(planet.posY<0 + planet.taille){
        planet.dirY = -planet.dirY;
        planet.posY = 0+planet.taille;
        //console.log ("3");
    }
    if(planet.posY>id.height - planet.taille){
        planet.dirY = -planet.dirY;
        planet.posY = id.height-planet.taille;
        //console.log ("4");
    }
}

function calculateSpeed(planet){
    return Math.sqrt(Math.pow(planet.dirX,2) + Math.pow(planet.dirY,2));
}

function calculPlanetsMovements(){
    let breaked = false;
    for (planet of listePlanetes) {
        planet.posX += planet.dirX;
        planet.posY += planet.dirY;
        inverseDirXAndYIfPlanetsExitsScreen(planet);
        dessinerPlanete(planet.posX, planet.posY, planet.taille, planet.couleur,planet.name,calculateSpeed(planet));

        for(otherPlanet of listePlanetes){
            if(planet.name !== otherPlanet.name){
                calculatePlanetsAttractonBasedOnNewtonLaw(planet, otherPlanet);
                if (contactBetweenPlanets(planet, otherPlanet)) {
                    console.log("contact between "+planet.name+" and "+otherPlanet.name);
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
    context.clearRect(0, 0, 10000, 10000);
    calculPlanetsMovements();
}