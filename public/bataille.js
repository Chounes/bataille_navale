document.addEventListener("DOMContentLoaded", function() {
    // socket ouverte vers le serveur
    let sock = io.connect();
    initGame(sock);
});

//Global variables for boat size
var lanceTorpilles = 0;
var contreTorpilleur = 0;
var sousMarin = 0;
var cuiRasse = 0;
var porteAvions = 0;
//Global variable for grid size
var grid_size = 10;

//maj number of boat
function majBoatNb(step, _class){
    if(!_class.localeCompare('lancetorpilles')){
        lanceTorpilles += step;
    }
    else if(!_class.localeCompare('contretorpilleur')){
        contreTorpilleur += step;
    }
    else if(!_class.localeCompare('sousmarin')){
        sousMarin += step;
    }
    else if(!_class.localeCompare('cuirasse')){
        cuiRasse += step;
    }
    else if(!_class.localeCompare('porteavions')){
        porteAvions += step;
    }
    console.log("Lance torpilles :"+lanceTorpilles);
    console.log("Contre torpilleur :"+contreTorpilleur);
    console.log("Sous-marin :"+sousMarin);
    console.log("Cuirassé :"+cuiRasse);
    console.log("Porte avions :"+porteAvions+"\n\n\n\n\n\n");

}

//return true if there is already cell with this type of boat on map
function numberOfOne(){
    if(!getBoatClass().localeCompare('lancetorpilles')){
        return lanceTorpilles;
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        return contreTorpilleur;
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        return sousMarin;
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        return cuiRasse;
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        return porteAvions;
    }
}

function availableBoatSize(){
    if(!getBoatClass().localeCompare('lancetorpilles')){
        return (lanceTorpilles<2);
    }
    else if(!getBoatClass().localeCompare('contretorpilleur')){
        return (contreTorpilleur<3);
    }
    else if(!getBoatClass().localeCompare('sousmarin')){
        return (sousMarin<3);
    }
    else if(!getBoatClass().localeCompare('cuirasse')){
        return (cuiRasse<4);
    }
    else if(!getBoatClass().localeCompare('porteavions')){
        return (porteAvions<5);
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
    alert("La nouvelle partie du bateau doit être adjacente et dans la même direction que les parties déjà posées.");
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



//set color on cell
function colorizeGridCells(element){
    if(element.classList.length>0 && !getBoatClass().localeCompare(element.classList[0])){
        if(canRemoveCell(element)){
            majBoatNb(-1, getBoatClass());
            element.removeAttribute('class');
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
            alert("Attention vous avez déjà déposé toutes les parties de ce bateau.");
            return false;
        }
        if(availableBoatPosition(element)){
            element.classList.add(getBoatClass());
            majBoatNb(1,getBoatClass());
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
    for(let i =0; i<= grid_size; ++i){
        let tr = document.createElement('tr');
        for(let j =0; j <= grid_size; ++j){
            let td = document.createElement('td');
            if(i == 0 && j != 0){
                td.append(j);
            }
            if(i != 0 && j == 0){
                td.append(String.fromCharCode('A'.charCodeAt() + (i-1)));
            }
            if(i!=0 && j!=0 && player.localeCompare("P2")){
                //Each game cell has for id by its position on the grid
                td.id = String.fromCharCode('A'.charCodeAt() + (i-1))+j;
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