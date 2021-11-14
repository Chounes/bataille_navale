//Reste à faire
/*
- btn relancer game
 */


//Objet pour stocker les types et positions des bateaux
class Boat_Team{
    lanceTorpilles =[];
    contreTorpilleur =[];
    sousMarin =[];
    cuiRasse =[];
    porteAvion =[];
}
//Constantes pour la taille des bateaux
const lanceTorpillesSize = 2;
const contreTorpilleurSize = 3;
const sousMarinSize = 3;
const cuirasseSize = 4;
const porteAvionsSize = 5;
//Variable à false si le joueur est dans la phase de placement des bateaux true sinon
var partyStarted;
//socket
var socket = io.connect();
//Objet contenant les bateaux du j1
var boat_P1 = new Boat_Team();

//Sauvegarde la grille local storage
function save () {
    localStorage.setItem('GRID', JSON.stringify(boat_P1));
}


document.addEventListener("DOMContentLoaded", function() {
    initGame();
});

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

//Vérifie que les bateaux ne dépasseent pas le nombre de cases maximal
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

//Retourne la valeur du bouton coché
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

//Vérifie que l'on puisse ajouter ou non une partie de bateau
function availableBoatPosition(element){
    if(numberOfOne() === 0)return true;

    if(!getBoatClass().localeCompare('lancetorpilles')){
        return checkAroundBoat(element, boat_P1.lanceTorpilles);
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        return checkAroundBoat(element, boat_P1.contreTorpilleur);
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        return checkAroundBoat(element, boat_P1.sousMarin);
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        return checkAroundBoat(element, boat_P1.cuiRasse);
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        return checkAroundBoat(element, boat_P1.porteAvion);
    }


}

//Regarde si il y a déjà d'autre partie du bateaux sur les cases adjacentes
function checkAroundBoat(e, boat){
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

//Vérifie que les parties d'un bateau sont bine aligné
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

//Vérifie que l'on puisse supprimmer ou non une partie de bateau
function canRemoveCell(element){
    if(numberOfOne() <3)return true;

    if(!getBoatClass().localeCompare('lancetorpilles')){
        return isBetweentwoPart(element, boat_P1.lanceTorpilles);
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        return isBetweentwoPart(element, boat_P1.contreTorpilleur);
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        return isBetweentwoPart(element, boat_P1.sousMarin);
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        return isBetweentwoPart(element, boat_P1.cuiRasse);
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        return isBetweentwoPart(element, boat_P1.porteAvion);
    }
}

//Regarde si la partie du bateau est entre 2 parties du même bateau
function isBetweentwoPart(e, boat){
    let nbBoatAround =0;
    for(let i=0; i<boat.length;++i){
        if(boat[i][0]-1== e.dataset.x_coord && boat[i][1]== e.dataset.y_coord){
            ++nbBoatAround;
        }
        else if(boat[i][0]== e.dataset.x_coord-1 && boat[i][1]== e.dataset.y_coord){
            ++nbBoatAround;
        }
        else if(boat[i][0]== e.dataset.x_coord && boat[i][1]== e.dataset.y_coord-1){
            ++nbBoatAround;
        }
        else if(boat[i][0]== e.dataset.x_coord && boat[i][1]-1== e.dataset.y_coord){
            ++nbBoatAround;
        }
    }
    return (nbBoatAround<2);
}

//Supprime un élément
function removeBoat(element){
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

//Ajoute un bateau
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

//Ajoute et enlève les couleur sur les cases en fonctions des bateaux posés
function colorizeGridCells(element){
    if(!partyStarted){
        if(element.classList.length>0 && !getBoatClass().localeCompare(element.classList[0])){
            if(canRemoveCell(element)){
                removeBoat(element);
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

//Créer les grilles de chaque joueurs avec les listener nécéssaires
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

//Modifie le format du stockage des bateaux pour correspondre à celui demandé par le serveur
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

//lance la partie si il n'y a pas d'erreur à l'envoie de la grille au serveur
function can_start(){
    partyStarted=true;

    socket.emit("demarrer", formatBoatObject());
    socket.on("erreur", function (msg){
        partyStarted = false;
        alert(msg);

    });
    socket.on("a_toi", function (msg){
        printCheckedMsgWithDate(msg,"serveur");
    })
    socket.on("a_l_autre", function (msg){
        printCheckedMsgWithDate(msg,"serveur");
    })
    socket.on("en_attente", function (msg){
        printCheckedMsgWithDate(msg, "serveur");
    });

    //attend 250 ms la réponse du serveur
    setTimeout( function (){
        if(partyStarted){
            initSocketAction();
            setScreenToPlay();
        }
    }, 250);



}

//Efface les boutons pour selectionner les bateaux de et affiche la barre pour envoyer les messages
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

//Init les différentes action liée au messages envoyé par le socket
function initSocketAction(){
    socket.on("message", function(msg){
        printCheckedMsgWithDate(msg, "adversaire");
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
                printCheckedMsgWithDate(msg, "serveur");
            }
            else if(res.statut ===1){
                //touché
                let msg = "[Vous] Tir en "+res.coords+" : touché";
                printCheckedMsgWithDate(msg, "serveur");
                //colorie cell de la grille adverse
                document.getElementById("P2"+res.coords).classList.add("touche");
            }
            else if(res.statut ===2){
                //coulé
                let msg = "[Vous] Tir en "+res.coords+" : coulé";
                printCheckedMsgWithDate(msg, "serveur");
                //colorie cell de la grille adverse
                document.getElementById("P2"+res.coords).classList.add("touche");
            }
            else if(res.statut ===3){
                //win
                let msg = "[Vous] Tir en "+res.coords+" : coulé";
                printCheckedMsgWithDate(msg, "serveur");
                //colorie cell de la grille adverse
                document.getElementById("P2"+res.coords).classList.add("touche");
                let btn_recommencer = document.createElement("button");
                btn_recommencer.append('Nouvelle partie');
                alert("Bravo tu as gagné !!");
                btn_recommencer.addEventListener('click', ()=>{
                    location.reload();
                    return false;
                });
                printInChat(btn_recommencer);
                return;
            }
            let msg = document.createElement("p");
            msg.classList.add("serveur");
            msg.append("En attente du tir de l'adversaire.");
            printInChat(msg);
        }
        //sinon
        else{
            //Ajoute croix sur case visé
            document.getElementById(res.coords).classList.add("tir");

            if(res.statut ===0){
                //Plouf
                let msg = "[Adversaire] Tir en "+res.coords+" : dans l'eau";
                printCheckedMsgWithDate(msg, "serveur");
            }
            else if(res.statut ===1){
                //touché
                let msg = "[Adversaire] Tir en "+res.coords+" : touché";
                printCheckedMsgWithDate(msg, "serveur");
                //colorie cell de la grille adverse
            }
            else if(res.statut ===2){
                //coulé
                let msg = "[Adversaire] Tir en "+res.coords+" : coulé";
                printCheckedMsgWithDate(msg, "serveur");
                //colorie cell de la grille adverse
            }
            else if(res.statut ===3){
                //lose
                let msg = "[Adversaire] Tir en "+res.coords+" : coulé";
                printCheckedMsgWithDate(msg, "serveur");
                //colorie cell de la grille adverse
                alert("Dommage tu as perdu...");
                let btn_recommencer = document.createElement("button");
                btn_recommencer.append('Nouvelle partie');
                btn_recommencer.addEventListener('click', ()=>{
                    location.reload();
                    return false;
                });
                printInChat(btn_recommencer);
                return;
            }
            let msg = document.createElement("p");
            msg.classList.add("serveur");
            msg.append("A vous de jouer.");
            printInChat(msg);
        }
    })
}

//Envoie un tir au socket avec les coords de la case e
function tir(e){
    //refait les coords en version [lettre,Nombre] à partir de coordonnées [Nombre, Nombre]
    let pos = ""+String.fromCharCode('A'.charCodeAt()+Number(e.dataset.y_coord-1))+""+e.dataset.x_coord;
    socket.emit("tir", pos);
}

//Envoie un message dans le chat
function sendMsg(){
    let txtArea = document.getElementById("txtMsg");
    socket.emit("message", txtArea.value);
    printCheckedMsgWithDate(txtArea.value, "moi");
    txtArea.value ='';
}

//Vérifie format et affiche les messages dans le chat
function printCheckedMsgWithDate(msg,classe){
    if(isHTML(msg))return;
    let date = new Date();
    let who;
    let p_element = document.createElement('p');
    if(!classe.localeCompare("moi") || !classe.localeCompare("adversaire")){
        let strong_element = document.createElement('strong');
        strong_element.innerHTML="<em><br>"+msg+"</em>";

        if(!classe.localeCompare("moi")){
            who ="Message envoyé à votre adversaire";
        }
        else{
            who ="Message de votre adversaire";
        }
        msg =date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" - "+who+" : ";
        p_element.append(msg);
        p_element.append(strong_element);

    }
    else {
        who ="";
        msg = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" - "+who+" : "+msg;
        p_element.append(msg);
    }
    p_element.classList.add(classe);

    let chat = document.getElementsByTagName("aside");
    chat = chat[0];
    chat.append(p_element);
}

//Affiche tout dans le chat
function printInChat(msg){
    let chat = document.getElementsByTagName("aside");
    chat = chat[0];
    chat.append(msg);
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