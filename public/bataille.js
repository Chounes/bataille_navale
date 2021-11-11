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

document.addEventListener("DOMContentLoaded", function() {
    // socket ouverte vers le serveur
    let sock = io.connect();
    initGame(sock);

    sock.emit("demarrer", "test");
    sock.on("erreur", function(msg) {
        alert("socket reussie !");
        alert(msg);
    });


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
        if(inputs[i].type == 'radio'){
            if(inputs[i].checked){
                return inputs[i].value;
            }
        }
    }
}

//Check if boat can be set
function availableBoatPosition(element){
    if(numberOfOne() == 0)return true;
    //check element x y-1
    let pos;
    let element_test;

    //check element x y-1
    //if number is between 1 and 9
    if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
        pos = String.fromCharCode(element.id[0].charCodeAt()-1)+element.id[1];
    }
    else{
        pos = String.fromCharCode(element.id[0].charCodeAt()-1)+10;
    }
    if(pos[0].charCodeAt()>= 'A'.charCodeAt()){
        element_test = document.getElementById(pos);
        if(element_test !== null && !getBoatClass().localeCompare(element_test.classList[0])){
            //check if there is more than 1 other part of boat
            if(numberOfOne()>1){
                //if number is between 1 and 9
                if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
                    pos = String.fromCharCode(element.id[0].charCodeAt()-2)+element.id[1];
                }
                else{
                    pos = String.fromCharCode(element.id[0].charCodeAt()-2)+element.id[1]+element.id[2];
                }
                element_test = document.getElementById(pos);
                if(element_test != null && element_test.classList != undefined){
                    if(!getBoatClass().localeCompare(element_test.classList[0]))return true;
                }
            }
            else{
                return true;
            }
        }
    }

    //check element x y+1
    //if number is between 1 and 9
    if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
        pos = String.fromCharCode(element.id[0].charCodeAt()+1)+element.id[1];
    }
    else{
        pos = String.fromCharCode(element.id[0].charCodeAt()+1)+10;
    }
    if(pos[0].charCodeAt()<= 'J'.charCodeAt()){
        element_test = document.getElementById(pos);
        if(element_test !== null && !getBoatClass().localeCompare(element_test.classList[0])){
            //check if there is more than 1 other part of boat
            if(numberOfOne()>1){
                //if number is between 1 and 9
                if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
                    pos = String.fromCharCode(element.id[0].charCodeAt()+2)+element.id[1];
                }
                else{
                    pos = String.fromCharCode(element.id[0].charCodeAt()+2)+element.id[1]+element.id[2];
                }
                element_test = document.getElementById(pos);
                if(element_test != null && element_test.classList != undefined){
                    if(!getBoatClass().localeCompare(element_test.classList[0]))return true;
                }
            }
            else{
                return true;
            }
        }
    }

    //check element x-1 y
    //if number is between 1 and 9
    if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
        pos = element.id[0]+String(element.id[1]-1);
    }
    else{
        pos = element.id[0]+9;
    }
    if(pos[1]>=1){
        element_test = document.getElementById(pos);
        if(element_test !== null && !getBoatClass().localeCompare(element_test.classList[0])){
            //check if there is more than 1 other part of boat
            if(numberOfOne()>1){
                //if number is between 1 and 9
                if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
                    pos = element.id[0]+String(element.id[1]-2);
                }
                else{
                    pos = element.id[0]+8;
                }
                element_test = document.getElementById(pos);
                if(element_test != null && element_test.classList != undefined){
                    if(!getBoatClass().localeCompare(element_test.classList[0]))return true;
                }
            }
            else{
                return true;
            }
        }
    }

    //check element x+1 y
    //if number is between 1 and 9
    if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
        pos = element.id[0]+String(Number(element.id[1])+1);
    }
    else{
        pos = element.id[0]+11;
    }
    if(pos[1]<=10){
        element_test = document.getElementById(pos);
        if(element_test !== null && !getBoatClass().localeCompare(element_test.classList[0])){
            //check if there is more than 1 other part of boat
            if(numberOfOne()>1){
                //if number is between 1 and 8
                if(String(Number(element.id[1])+element.id[2]).localeCompare("10") && Number(element.id[1])<8){
                    pos = element.id[0]+String(Number(element.id[1])+2);
                }
                else{
                    pos = element.id[0]+Number(10+(-8+Number(element.id[1])));
                }
                element_test = document.getElementById(pos);
                if(element_test != null && element_test.classList != undefined){
                    if(!getBoatClass().localeCompare(element_test.classList[0]))return true;
                }

            }
            else{
                return true;
            }
        }
    }
    alert("La nouvelle partie du bateau doit Ãªtre adjacente et dans la mÃªme direction que les parties dÃ©jÃ  posÃ©es.");
    return false;
}

function canRemoveCell(element){
    //Don't create a void if less than 3 cells
    if(numberOfOne() < 0)return true;
    //check element x y-1
    let pos;
    let element_test;
    let cells_around = 0;

    //Check horizontal cells

    //check element x-1 y
    //if number is between 1 and 9
    if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
        pos = element.id[0]+String(element.id[1]-1);
    }
    else{
        pos = element.id[0]+9;
    }
    if(pos[1]>=1){
        element_test = document.getElementById(pos);
        if(element_test !== null && !getBoatClass().localeCompare(element_test.classList[0])){
            ++cells_around;
        }
    }

    //check element x+1 y
    //if number is between 1 and 9
    if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
        pos = element.id[0]+String(Number(element.id[1])+1);
    }
    else{
        pos = element.id[0]+11;
    }
    if(pos[1]<=10){
        element_test = document.getElementById(pos);
        if(element_test !== null && !getBoatClass().localeCompare(element_test.classList[0])){
            ++cells_around;
        }
    }

    //check if there is 2 cells around
    if(cells_around == 2)return false;
    cells_around =0;

    //check vertical cells
    //check element x y-1
    //if number is between 1 and 9
    if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
        pos = String.fromCharCode(element.id[0].charCodeAt()-1)+element.id[1];
    }
    else{
        pos = String.fromCharCode(element.id[0].charCodeAt()-1)+10;
    }
    if(pos[0].charCodeAt()>= 'A'.charCodeAt()){
        element_test = document.getElementById(pos);
        if(element_test !== null && !getBoatClass().localeCompare(element_test.classList[0])){
            ++cells_around;
        }
    }

    //check element x y+1
    //if number is between 1 and 9
    if(String(Number(element.id[1])+element.id[2]).localeCompare("10")){
        pos = String.fromCharCode(element.id[0].charCodeAt()+1)+element.id[1];
    }
    else{
        pos = String.fromCharCode(element.id[0].charCodeAt()+1)+10;
    }
    if(pos[0].charCodeAt()<= 'J'.charCodeAt()){
        element_test = document.getElementById(pos);
        if(element_test !== null && !getBoatClass().localeCompare(element_test.classList[0])){
            ++cells_around;
        }
    }
    //check if there is 2 cells around
    if(cells_around == 2)return false;
    return true;
}

function removeCell(element){
    if(!getBoatClass().localeCompare('lancetorpilles')){
        for(let i=0; i< boat_P1.lanceTorpilles.length; ++i){
            if(boat_P1.lanceTorpilles[i][0]== element.dataset.x_coord && boat_P1.lanceTorpilles[i][1]== element.dataset.y_coord){
                boat_P1.lanceTorpilles.splice(boat_P1.lanceTorpilles.indexOf(i)-1,1);
            }
        }
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        for(let i=0; i< boat_P1.contreTorpilleur.length; ++i){
            if(boat_P1.contreTorpilleur[i][0]== element.dataset.x_coord && boat_P1.contreTorpilleur[i][1]== element.dataset.y_coord){
                boat_P1.contreTorpilleur.splice(boat_P1.contreTorpilleur.indexOf(i)-1,1);
            }
        }
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        for(let i=0; i< boat_P1.sousMarin.length; ++i){
            if(boat_P1.sousMarin[i][0]== element.dataset.x_coord && boat_P1.sousMarin[i][1]== element.dataset.y_coord){
                boat_P1.sousMarin.splice(boat_P1.sousMarin.indexOf(i)-1,1);
            }
        }
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        for(let i=0; i< boat_P1.cuiRasse.length; ++i){
            if(boat_P1.cuiRasse[i][0]== element.dataset.x_coord && boat_P1.cuiRasse[i][1]== element.dataset.y_coord){
                boat_P1.cuiRasse.splice(boat_P1.cuiRasse.indexOf(i)-1,1);
            }
        }
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        for(let i=0; i< boat_P1.porteAvion.length; ++i){
            if(boat_P1.porteAvion[i][0]== element.dataset.x_coord && boat_P1.porteAvion[i][1]== element.dataset.y_coord){
                boat_P1.porteAvion.splice(boat_P1.porteAvion.indexOf(i)-1,1);
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
    if(element.classList.length>0 && !getBoatClass().localeCompare(element.classList[0])){
        if(/*canRemoveCell(element)*/true){
            removeCell(element);
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
        if(/*availableBoatPosition(element)*/true){
            addBoat(element);
        }
        else{
            return false;
        }
    }
}


//check if game can start
function can_start(sock){
    //chek if all boats have maximal size
    /*if(lanceTorpilles == 2 && contreTorpilleur == 3 && sousMarin == 3 && cuiRasse == 4 && porteAvions == 5){
            return true;
    }
    else{
        alert("Le remplissage de la grille n'est pas fini.");
        return false;
    }*/

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
            if(i == 0 && j != 0){
                td.append(j);
            }
            if(i != 0 && j == 0){
                td.append(String.fromCharCode('A'.charCodeAt() + (i-1)));
            }
            if(i!=0 && j!=0 && player.localeCompare("P2")){
                //Each game cell has for id by its position on the grid
                td.dataset.x_coord = j;
                td.dataset.y_coord = i;
                td.addEventListener('click',()=>colorizeGridCells(td));
            }
            tr.append(td);
        }
        body.append(tr);
    }
    table.append(body);
    return table;
}

function initGame(socket){
    let gridPlace= document.querySelectorAll("p");
    //Top grid for other player
    gridPlace[0].after(creatHtmlGrid( "P2"));
    //bot grid for you
    gridPlace[1].after(creatHtmlGrid("P1"));
    let st_button = document.getElementById("btnDemarrer");
    console.log(st_button);
    st_button.addEventListener("click", ()=>can_start(socket));
}
