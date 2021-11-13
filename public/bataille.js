//Reste à faire
/*
- Affichage des msg comme il faut
-setscreen on grille validé
 */



class Boat_Team{
    lanceTorpilles =[];
    contreTorpilleur =[];
    sousMarin =[];
    cuiRasse =[];
    porteAvion =[];
}
//Global variables for boat size
const lanceTorpillesSize = 2;
const contreTorpilleurSize = 3;
const sousMarinSize = 3;
const cuirasseSize = 4;
const porteAvionsSize = 5;

var partyStarted;
//local storage
function save () {
    localStorage.setItem('GRID', JSON.stringify(boat_P1));
}
//socket
var socket = io.connect();

document.addEventListener("DOMContentLoaded", function() {
    initGame();
});
var boat_P1 = new Boat_Team();


//return true if there is already cell with this type of boat on map
function numberOfOne(){
    if(!getBoatClass().localeCompare('lancetorpilles')){
        return boat_P1.lanceTorpilles.length;
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        return boat_P1.contreTorpilleur.length;
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        return boat_P1.sousMarin.length;
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        return boat_P1.cuiRasse.length;
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        return boat_P1.porteAvion.length;
    }
}

function availableBoatSize(){
    if(!getBoatClass().localeCompare('lancetorpilles')){
        return (boat_P1.lanceTorpilles.length<lanceTorpillesSize);
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        return (boat_P1.contreTorpilleur.length<contreTorpilleurSize);
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        return (boat_P1.sousMarin.length<sousMarinSize);
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        return (boat_P1.cuiRasse.length<cuirasseSize);
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        return (boat_P1.porteAvion.length<porteAvionsSize);
    }
}

//get value of radio buttons
function getBoatClass(){
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].type === 'radio'){
            if(inputs[i].checked){
                return inputs[i].value;
            }
        }
    }
}

//Check if boat can be set
function availableBoatPosition(element){
    if(numberOfOne() === 0)return true;

    if(!getBoatClass().localeCompare('lancetorpilles')){
        return canPosBoat(element, boat_P1.lanceTorpilles);
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        return canPosBoat(element, boat_P1.contreTorpilleur);
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        return canPosBoat(element, boat_P1.sousMarin);
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        return canPosBoat(element, boat_P1.cuiRasse);
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        return canPosBoat(element, boat_P1.porteAvion);
    }


}

function canPosBoat(e, boat){
    for(let i=0; i<boat.length;++i){
        if(boat[i][0]-1== e.dataset.x_coord && boat[i][1]== e.dataset.y_coord){
            if(boat.length>1){
                return checkOnSameLine(boat, [e.dataset.x_coord, e.dataset.y_coord]);
            }
            return true;
        }
        else if(boat[i][0]== e.dataset.x_coord-1 && boat[i][1]== e.dataset.y_coord){
            if(boat.length>1){
                return checkOnSameLine(boat, [e.dataset.x_coord, e.dataset.y_coord]);
            }
            return true;
        }
        else if(boat[i][0]== e.dataset.x_coord && boat[i][1]== e.dataset.y_coord-1){
            if(boat.length>1){
                return checkOnSameLine(boat, [e.dataset.x_coord, e.dataset.y_coord]);
            }
            return true;
        }
        else if(boat[i][0]== e.dataset.x_coord && boat[i][1]-1== e.dataset.y_coord){
            if(boat.length>1){
                return checkOnSameLine(boat, [e.dataset.x_coord, e.dataset.y_coord]);
            }
            return true;
        }
    }
    alert("La nouvelle partie du bateau doit être adjacente et dans la même direction que les parties déjà  posées.");
    return false;
}

function checkOnSameLine(boat,newPos){
    if(boat[0][0] === boat[1][0]){
        if(newPos[0] !== boat[0][0]){
            alert("La nouvelle partie du bateau doit être adjacente et dans la même direction que les parties déjà  posées.");
            return false;
        }
    }
    else if(boat[0][1] === boat[1][1]){
        if(newPos[1] !== boat[0][1]){
            alert("La nouvelle partie du bateau doit être adjacente et dans la même direction que les parties déjà  posées.");
            return false;
        }
    }
    return true;
}

function canRemoveCell(element){
    if(numberOfOne() <3)return true;

    if(!getBoatClass().localeCompare('lancetorpilles')){
        return canRemoveBoat(element, boat_P1.lanceTorpilles);
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        return canRemoveBoat(element, boat_P1.contreTorpilleur);
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        return canRemoveBoat(element, boat_P1.sousMarin);
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        return canRemoveBoat(element, boat_P1.cuiRasse);
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        return canRemoveBoat(element, boat_P1.porteAvion);
    }
}

function canRemoveBoat(e, boat){
    let nbBoatAround =0;
    for(let i=0; i<boat.length;++i){
        if(boat[i][0]-1=== e.dataset.x_coord && boat[i][1]=== e.dataset.y_coord){
            ++nbBoatAround;
        }
        else if(boat[i][0]=== e.dataset.x_coord-1 && boat[i][1]=== e.dataset.y_coord){
            ++nbBoatAround;
        }
        else if(boat[i][0]=== e.dataset.x_coord && boat[i][1]=== e.dataset.y_coord-1){
            ++nbBoatAround;
        }
        else if(boat[i][0]=== e.dataset.x_coord && boat[i][1]-1=== e.dataset.y_coord){
            ++nbBoatAround;
        }
    }
    return (nbBoatAround<2);
}

function removeCell(element){
    if(!getBoatClass().localeCompare('lancetorpilles')){
        for(let i=0; i< boat_P1.lanceTorpilles.length; ++i){
            if(boat_P1.lanceTorpilles[i][0]=== element.dataset.x_coord && boat_P1.lanceTorpilles[i][1]=== element.dataset.y_coord){
                boat_P1.lanceTorpilles.splice(i,1);
            }
        }
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        for(let i=0; i< boat_P1.contreTorpilleur.length; ++i){
            if(boat_P1.contreTorpilleur[i][0]=== element.dataset.x_coord && boat_P1.contreTorpilleur[i][1]=== element.dataset.y_coord){
                boat_P1.contreTorpilleur.splice(i,1);
            }
        }
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        for(let i=0; i< boat_P1.sousMarin.length; ++i){
            if(boat_P1.sousMarin[i][0]=== element.dataset.x_coord && boat_P1.sousMarin[i][1]=== element.dataset.y_coord){
                boat_P1.sousMarin.splice(i,1);
            }
        }
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        for(let i=0; i< boat_P1.cuiRasse.length; ++i){
            if(boat_P1.cuiRasse[i][0]=== element.dataset.x_coord && boat_P1.cuiRasse[i][1]=== element.dataset.y_coord){
                boat_P1.cuiRasse.splice(i,1);
            }
        }
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        for(let i=0; i< boat_P1.porteAvion.length; ++i){
            if(boat_P1.porteAvion[i][0]=== element.dataset.x_coord && boat_P1.porteAvion[i][1]=== element.dataset.y_coord){
                boat_P1.porteAvion.splice(i,1);
            }
        }
    }
    element.removeAttribute('class');
}

function addBoat(element){
    let pos = [element.dataset.x_coord,element.dataset.y_coord];

    if(!getBoatClass().localeCompare('lancetorpilles')){
        boat_P1.lanceTorpilles.push(pos);
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        boat_P1.contreTorpilleur.push(pos);
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        boat_P1.sousMarin.push(pos);
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        boat_P1.cuiRasse.push(pos);
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        boat_P1.porteAvion.push(pos);
    }
    element.classList.add(getBoatClass());
}


//set color on cell
function colorizeGridCells(element){
    if(!partyStarted){
        if(element.classList.length>0 && !getBoatClass().localeCompare(element.classList[0])){
            if(canRemoveCell(element)){
                removeCell(element);
                save();
                return true
            }
            alert("Impossible de retirer cette patie du bateau.")
        }
        else if(element.classList.length>0){
            alert("Attention cette case est déjà occupée.");
            return false
        }
        else{
            if(!availableBoatSize()){
                alert("Attention vous avez déjà  disposé toutes les parties de ce bateau.");
                return false;
            }
            if(availableBoatPosition(element)){
                addBoat(element);
                save();
                return true;
            }
            else{
                return false;
            }
        }
    }
}


//check if game can start
function can_start(){
    socket.emit("demarrer", formatBoatObject());
    socket.on("a_toi", function (msg){
        printMsg(msg,"serveur");
        partyStarted =true;
    })

    socket.on("a_l_autre", function (msg){
        printMsg(msg,"serveur");
        partyStarted =true;
    })
    socket.on("en_attente", function (msg){
        printMsg(msg, "serveur");
        partyStarted =true;

    });

    socket.on("error", function (msg){
        if(!msg.localeCompare("La grille envoyée n'est pas dans le bon format.")){
            partyStarted = false;
        }
        alert(msg);

    });



    if(partyStarted == 1){
        initSocketAction();
        setScreenToPlay();
    }
}

function setScreenToPlay(){
    let e =document.getElementsByTagName('label');
    for(let i =0; i<e.length; ++i){
        e[i].style.display ="none";
    }
    document.getElementById("btnDemarrer").style.display = "none";
    let footer = document.getElementsByTagName("footer");
    for(let i =0; i<footer.length; ++i){
        footer[i].style.display ="block";
    }
    document.getElementById("btnEnvoyer").addEventListener("click", ()=>sendMsg());
}

function sendMsg(){
    let txtArea = document.getElementById("txtMsg");
    socket.emit("message", txtArea.value);
    printMsg(txtArea.value, "moi");
    txtArea.value ='';
}

function printMsg(msg,classe){
    if(isHTML(msg))return;
    let date = new Date();
    let who;
    if(!classe.localeCompare("moi")) who ="Message envoyé à votre adversaire";
    else if(!classe.localeCompare("adversaire")) who ="Message de votre adversaire";
    else who ="";
    msg = ""+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" - "+who+" : "+msg+"";
    let p_element = document.createElement('p');
    p_element.classList.add(classe);
    p_element.append(msg);
    let chat = document.getElementsByTagName("aside");
    chat = chat[0];
    chat.append(p_element);
}

function formatBoatObject(){
    let boatFormatted = {
        lancetorpilles :[],
        contretorpilleur :[],
        sousmarin :[],
        cuirasse :[],
        porteavions :[],
    }
    for(let i =0; i<boat_P1.lanceTorpilles.length; ++i){
        let pos = ""+String.fromCharCode('A'.charCodeAt()+Number(boat_P1.lanceTorpilles[i][1]-1))+""+boat_P1.lanceTorpilles[i][0];
        boatFormatted.lancetorpilles.push(pos);
    }
    for(let i =0; i<boat_P1.contreTorpilleur.length; ++i){
        let pos = ""+String.fromCharCode('A'.charCodeAt()+Number(boat_P1.contreTorpilleur[i][1]-1))+""+boat_P1.contreTorpilleur[i][0];
        boatFormatted.contretorpilleur.push(pos);
    }
    for(let i =0; i<boat_P1.sousMarin.length; ++i){
        let pos = ""+String.fromCharCode('A'.charCodeAt()+Number(boat_P1.sousMarin[i][1]-1))+""+boat_P1.sousMarin[i][0];
        boatFormatted.sousmarin.push(pos);
    }
    for(let i =0; i<boat_P1.cuiRasse.length; ++i){
        let pos = ""+String.fromCharCode('A'.charCodeAt()+Number(boat_P1.cuiRasse[i][1]-1))+""+boat_P1.cuiRasse[i][0];
        boatFormatted.cuirasse.push(pos);
    }
    for(let i =0; i<boat_P1.porteAvion.length; ++i){
        let pos = ""+String.fromCharCode('A'.charCodeAt()+Number(boat_P1.porteAvion[i][1]-1))+""+boat_P1.porteAvion[i][0];
        boatFormatted.porteavions.push(pos);
    }
    return boatFormatted;
}

//Create play grid with click event to add boats
function creatHtmlGrid(player){
    let table = document.createElement('table');
    table.id = player;
    let body = document.createElement('tbody');
    for(let i =0; i<= 10; ++i){
        let tr = document.createElement('tr');
        for(let j =0; j <= 10; ++j){
            let td = document.createElement('td');
            if(i === 0 && j !== 0){
                td.append(j);
            }
            if(i !== 0 && j === 0){
                td.append(String.fromCharCode('A'.charCodeAt() + (i-1)));
            }
            //grid for P1
            if(i!==0 && j!==0 && player.localeCompare("P2")){
                //Each game cell has for id by its position on the grid
                td.dataset.x_coord = j;
                td.dataset.y_coord = i;
                if(p1BoatNotEmpty()){
                    setSavedBoat(td);
                }
                td.addEventListener('click',()=>colorizeGridCells(td));
                td.id = String.fromCharCode('A'.charCodeAt() + (i-1))+j;
            }
            //grid for P2
            if(i!==0 && j!==0 && !player.localeCompare("P2")){
                //Each game cell has for id by its position on the grid
                td.dataset.x_coord = j;
                td.dataset.y_coord = i;
                td.addEventListener('click',()=>tir(td));
                td.id = "P2"+String.fromCharCode('A'.charCodeAt() + (i-1))+j;
            }
            tr.append(td);
        }
        body.append(tr);
    }
    table.append(body);
    return table;
}

//Init la partie
function initGame(){
    partyStarted =false; //passera a true quand les bateaux bien placés seront et le bouton start pressé
    let tmp = localStorage.getItem('GRID');
    if(tmp){
        boat_P1 = JSON.parse(tmp);
    }
    let gridPlace= document.querySelectorAll("p");
    //Grille du haut pour le joueur 2
    gridPlace[0].after(creatHtmlGrid( "P2"));

    //Grille du bas pour le joueur 1
    gridPlace[1].after(creatHtmlGrid("P1"));

    let st_button = document.getElementById("btnDemarrer");
    st_button.addEventListener("click", ()=>can_start());
}

//Init les différentes action liée au messages envoyé par le socket
function initSocketAction(){
    socket.on("message", function(msg){
        printMsg(msg, "adversaire");
    });

    //Message
    socket.on("resultat", function (res){
        console.log(res);
        //si émetteur
        if(res.emetteur){
            //Ajoute croix sur case visé
            document.getElementById("P2"+res.coords).classList.add("tir")
            if(res.statut ===0){
                //Plouf
                let msg = "[Vous] Tir en "+res.coords+" : dans l'eau";
                printMsg(msg, "serveur");
            }
            else if(res.statut ===1){
                //touché
                let msg = "[Vous] Tir en "+res.coords+" : touché";
                printMsg(msg, "serveur");
                //colorie cell de la grille adverse
                document.getElementById("P2"+res.coords).classList.add("touche");
            }
            else if(res.statut ===2){
                //coulé
                let msg = "[Vous] Tir en "+res.coords+" : coulé";
                printMsg(msg, "serveur");
                //colorie cell de la grille adverse
                document.getElementById("P2"+res.coords).classList.add("touche");
            }
            else if(res.statut ===3){
                //win
                let msg = "[Vous] Tir en "+res.coords+" : coulé";
                printMsg(msg, "serveur");
                //colorie cell de la grille adverse
                document.getElementById("P2"+res.coords).classList.add("touche");
                alert("Bravo tu as gagné !!");
            }
        }
        //sinon
        else{
            //Ajoute croix sur case visé
            document.getElementById(res.coords).classList.add("tir");

            if(res.statut ===0){
                //Plouf
                let msg = "[Adversaire] Tir en "+res.coords+" : dans l'eau";
                printMsg(msg, "serveur");
            }
            else if(res.statut ===1){
                //touché
                let msg = "[Adversaire] Tir en "+res.coords+" : touché";
                printMsg(msg, "serveur");
                //colorie cell de la grille adverse
            }
            else if(res.statut ===2){
                //coulé
                let msg = "[Adversaire] Tir en "+res.coords+" : coulé";
                printMsg(msg, "serveur");
                //colorie cell de la grille adverse
            }
            else if(res.statut ===3){
                //win
                let msg = "[Adversaire] Tir en "+res.coords+" : coulé";
                printMsg(msg, "serveur");
                //colorie cell de la grille adverse
                alert("Dommage tu as perdu...");
            }
        }
    })
}

//Vérifie si l'objet boat_P1 est vide
function p1BoatNotEmpty(){
    if(boat_P1.lanceTorpilles.length >0)return true;
    if(boat_P1.contreTorpilleur >0)return true;
    if(boat_P1.sousMarin >0)return true;
    if(boat_P1.cuiRasse >0)return true;
    return boat_P1.porteAvion > 0;

}


//Place les bateaux sauvegardé sur la case e
function setSavedBoat(e){
    for(let i =0; i<boat_P1.lanceTorpilles.length; ++i){
        if(boat_P1.lanceTorpilles[i][0] === e.dataset.x_coord && boat_P1.lanceTorpilles[i][1] === e.dataset.y_coord){
            e.classList.add('lancetorpilles');
        }
    }
    for(let i =0; i<boat_P1.contreTorpilleur.length; ++i){
        if(boat_P1.contreTorpilleur[i][0] === e.dataset.x_coord && boat_P1.contreTorpilleur[i][1] === e.dataset.y_coord){
            e.classList.add('contretorpilleur');
        }
    }
    for(let i =0; i<boat_P1.sousMarin.length; ++i){
        if(boat_P1.sousMarin[i][0] === e.dataset.x_coord && boat_P1.sousMarin[i][1] === e.dataset.y_coord){
            e.classList.add('sousmarin');
        }
    }
    for(let i =0; i<boat_P1.cuiRasse.length; ++i){
        if(boat_P1.cuiRasse[i][0] === e.dataset.x_coord && boat_P1.cuiRasse[i][1] === e.dataset.y_coord){
            e.classList.add('cuirasse');
        }
    }
    for(let i =0; i<boat_P1.porteAvion.length; ++i){
        if(boat_P1.porteAvion[i][0] === e.dataset.x_coord && boat_P1.porteAvion[i][1] === e.dataset.y_coord){
            e.classList.add('porteavions');
        }
    }
}

//Envoie un tir au socket avec les coords de la case e
function tir(e){
    //refait les coords en version [lettre,Nombre] à partir de coordonnées [Nombre, Nombre]
    let pos = ""+String.fromCharCode('A'.charCodeAt()+Number(e.dataset.y_coord-1))+""+e.dataset.x_coord;
    socket.emit("tir", pos);
}

//Vérifie si il n'y a pas de balise html dans une string str
function isHTML(str) {
    let a = document.createElement('div');
    a.innerHTML = str;

    for (let c = a.childNodes, i = c.length; i--; ) {
        if (c[i].nodeType === 1) return true;
    }

    return false;
}