let id = document.getElementById("space");
let planetNumber = 0;
let clickPlanetName = "Planet";
/*Detection du clic souris*/


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
    let x = event.pageX -450;
    

    let y = event.pageY -120;

    listePlanetes.push(createPlanet(clickPlanetName, x, y, 0, 0, 10, randomColor()));//"#D0A000"));

    console.log("x:"+x+" y:"+y);
};


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

listePlanetes.push(createPlanet("Sun", 200, 320, -2, 0, 20, "#D0D000"));
listePlanetes.push(createPlanet("Sun2", 200, 400, 4, 0, 20, "#D0D000"));

function dessinerPlanete(x, y, size, colour) {
    context.strokeStyle = colour;
    context.fillStyle = colour;
    context.lineWidth = 1;
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.stroke();
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
    //alert("hello");

    setInterval(draw, 10);

}


//function drawBall(colour) {
//    context.beginPath();
//    context.arc(x, y, 10, 0, Math.PI * 2);
//    context.fillStyle = colour;
//    context.fill();
//    context.closePath();
//}


function calculAcceleration(planetA, planetB) {
    const G = 9.81;
    let localDirX = 1;
    let localDirY = 1;
    //const G = 1;
    let directions = [0, 0];
    let contact = 0;

    //let directionX = ;
    //let directionY = directions[1];

    //let membreA = Math.pow((planetA.posX + planetA.taille/2 - planetB.posX + planetB.taille/2),2);
    //let membreB = Math.pow((planetA.posY + planetA.taille/2 - planetB.posY + planetB.taille/2),2);
    let membreA = Math.pow((planetA.posX - planetB.posX), 2);
    let membreB = Math.pow((planetA.posY - planetB.posY), 2);
    let distance = Math.sqrt(membreA + membreB);


    //console.log(distance);

    //calcul de l'attraction entre les 2

    let attraction = G * planetA.taille * planetB.taille / Math.pow(distance, 2);


    let accelerationGravitationnelle = G * (planetA.taille * planetB.taille) / Math.pow(distance, 2);

    //repartition de la force de deplacement
    if((planetA.taille + planetB.taille!=0)){
        accelerationGravitationnelle *=  Math.pow(planetB.taille, 2) / Math.pow((planetA.taille + planetB.taille), 2);
    }
    //Acceleration bien calculee
    // console.log(accelerationGravitationnelle)


    let diffX = Math.abs(planetA.posX - planetB.posX);
    let diffY = Math.abs(planetA.posY - planetB.posY);

    //dif X and Y ok
    // console.log("dif x : " +diffX+". dif y : "+ diffY)


    let angle = Math.atan(diffY / diffX);
    directions[0] = Math.cos(angle) * accelerationGravitationnelle;
    directions[1] = Math.sin(angle) * accelerationGravitationnelle;

    //console.log("vitesse x : " + directions[0]+ ". vitesse y : " + directions[1])


    //afficher(planetA,directions[0]);

    if (distance < (planetA.taille + planetB.taille) / 2) {
        //console.log("Collision a une distance de : " + distance)
        contact = 1;
    } else {
        contact = 0;
    }


    //calcul des directions
    if (planetA.posX > planetB.posX) {
        localDirX = -1;
    }
    if (planetA.posY > planetB.posY) {
        localDirY = -1;
    }

    if (planetA.name === "Sun") {
        planetA.dirX = 0;
        planetA.dirY = 0;

        /*
        planetA.posX = 300;
        planetA.posy = 300;
*/

    } else {

        //sauvegarde de la direction
        planetA.dirX += localDirX * Math.abs(directions[0]);
        planetA.dirY += localDirY * Math.abs(directions[1]);
    }

    deplacement(planetA);
    return contact;
}

function deplacement(planetA) {

    //changement de
    planetA.posX += planetA.dirX;
    planetA.posY += planetA.dirY;

    //console.log("changement");
    if (planetA.posX < 0 || planetA.posX > 600) {
        planetA.dirX = -planetA.dirX;
    }

    if (planetA.posY < 0 || planetA.posY > 600) {
        planetA.dirY = -planetA.dirY;
    }
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

function draw() {
    context.clearRect(0, 0, 10000, 10000);
    let breaked = 0;
    let planet, planetToTest;

    for (planet of listePlanetes) {
        if (listePlanetes.length === 1) {
            //console.log("une seule")
            deplacement(planet)
        }

        //calcul de la force de gravitation entre les planetes
        for (planetToTest of listePlanetes) {
            if (planet != planetToTest) {
                //console.log("comparing "+planet.name+" and "+planetToTest.name)
                let contact = 0;

                let directions = [0, 0];
                //console.log(planet.name+" nest pas egale a "+ planetToTest.name);
                contact = calculAcceleration(planetToTest, planet);

                //reset des detecteurs de collision
                

                //si on a pas eu de pb lors de la recuperation de la vitesse
                if (contact != 0) {
                    

                    //Sinon, destruction des deux planetes
                    //console.log("contacts X/Y : "+contactX+"/"+contactY);


                    let composanteVitesseX = 0.1 * (planet.dirX * (planet.taille / planetToTest.taille) + planetToTest.dirX * (planetToTest.taille / planet.taille));
                    
                    //console.log((planet.taille/planetToTest.taille));
                    let composanteVitesseY = 0.1 * (planet.dirY * (planet.taille / planetToTest.taille) + planetToTest.dirY * (planetToTest.taille / planet.taille));
                    /*console.log(planet.name +" sur "+planetToTest.name +" = "+ planet.taille/planetToTest.taille )
                    console.log("Vitesse X : "+composanteVitesseX);
                    console.log("Vitesse Y : "+composanteVitesseY);   */
                    let couleurToAdd =colorMixer(planet.couleur,planetToTest.couleur,0.5);

                    //if (planet.taille > planetToTest.taille) {
                    //    couleurToAdd = planet.couleur;
                    //} else {
                    //    couleurToAdd = planetToTest.couleur;
                    //}

                    listePlanetes.push(createPlanet(planet.name + "_" + planetToTest.name, planet.posX, planet.posY, composanteVitesseX, composanteVitesseY, planet.taille + planetToTest.taille, couleurToAdd));
                    console.log("Nouvelle planete : " + planet.name);
                    //retrait de la planete 1
                    for (let i = 0; i < listePlanetes.length; i++) {
                        if (listePlanetes[i].name === planet.name || listePlanetes[i].name === planetToTest.name) {
                            listePlanetes.splice(i, 1);
                            breaked = 1;
                            break;
                        }
                    }
                    //retrait de la planete 2
                    for (let i = 0; i < listePlanetes.length; i++) {
                        if (listePlanetes[i].name === planet.name || listePlanetes[i].name === planetToTest.name) {
                            listePlanetes.splice(i, 1);
                            breaked = 1;
                            break;
                        }
                    }


                }


            }
            if (breaked) {
                break;
            }
        }
        if (breaked) {
            break;
        }


        /*if (planet.name === "Terre"){
          console.log("La planete "+planet.name+" fonce en X + "+planet.dirX);
        }*/
        dessinerPlanete(planet.posX, planet.posY, planet.taille, planet.couleur);

        //console.log(planet.name+" has moved");
    }
    //console.log("coucou");

    //deplacementLigneDroite();


}